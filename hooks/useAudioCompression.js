
import { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL, fetchFile } from '@ffmpeg/util';


export const useAudioCompression = () => {
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const ffmpegRef = useRef(new FFmpeg());

  const loadFFmpeg = async () => {
    const ffmpeg = ffmpegRef.current;
    
    if (!ffmpeg.loaded) {
      try {
        // Load FFmpeg with CDN URLs
        await ffmpeg.load({
          coreURL: await toBlobURL('https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js', 'text/javascript'),
          wasmURL: await toBlobURL('https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.wasm', 'application/wasm'),
        });
        
        // Set up progress tracking
        ffmpeg.on('progress', ({ progress }) => {
          setCompressionProgress(Math.round(progress * 100));
        });
        
        ffmpeg.on('log', ({ message }) => {
          console.log('FFmpeg log:', message);
        });
        
      } catch (error) {
        console.error('Failed to load FFmpeg:', error);
        throw new Error('Failed to initialize audio compression');
      }
    }
  };

  const compressAudio = async (file, options = {}) => {
    const {
      quality = 2, // 0-9, where 2 is good quality
      bitrate = '128k',
      format = 'mp3',
      maxSizeMB = 10
    } = options;

    setIsCompressing(true);
    setCompressionProgress(0);

    try {
      // Check if file is already under the size limit
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB <= maxSizeMB) {
        console.log(`File ${file.name} is already under ${maxSizeMB}MB (${fileSizeMB.toFixed(2)}MB)`);
        return file;
      }

      await loadFFmpeg();
      const ffmpeg = ffmpegRef.current;

      // Generate unique filenames
      const inputFileName = `input_${Date.now()}.${file.name.split('.').pop()}`;
      const outputFileName = `output_${Date.now()}.${format}`;

      console.log(`Compressing ${file.name} (${fileSizeMB.toFixed(2)}MB) to target: ${maxSizeMB}MB`);

      // Write input file to FFmpeg filesystem
      await ffmpeg.writeFile(inputFileName, await fetchFile(file));

      // Compression command - using variable bitrate for better quality/size ratio
      const compressionArgs = [
        '-i', inputFileName,
        '-acodec', format === 'mp3' ? 'libmp3lame' : 'aac',
        '-q:a', quality.toString(), // Quality-based encoding
        '-ar', '44100', // Sample rate
        '-ac', '2', // Stereo
        outputFileName
      ];

      // If the quality approach doesn't achieve target size, try bitrate approach
      let compressed = false;
      let attempts = 0;
      const maxAttempts = 3;
      let currentBitrate = parseInt(bitrate);

      while (!compressed && attempts < maxAttempts) {
        attempts++;
        
        try {
          // Clear any existing output file
          try {
            await ffmpeg.deleteFile(outputFileName);
          } catch (e) {
            // File might not exist, ignore
          }

          if (attempts === 1) {
            // First attempt: use quality-based encoding
            await ffmpeg.exec(compressionArgs);
          } else {
            // Subsequent attempts: use bitrate-based encoding with reduced bitrate
            const bitrateArgs = [
              '-i', inputFileName,
              '-acodec', format === 'mp3' ? 'libmp3lame' : 'aac',
              '-b:a', `${currentBitrate}k`,
              '-ar', '44100',
              '-ac', '2',
              outputFileName
            ];
            await ffmpeg.exec(bitrateArgs);
          }

          // Read the compressed file
          const compressedData = await ffmpeg.readFile(outputFileName);
          const compressedBlob = new Blob([compressedData.buffer], { 
            type: file.type || 'audio/mpeg' 
          });
          
          const compressedSizeMB = compressedBlob.size / (1024 * 1024);
          
          console.log(`Attempt ${attempts}: Compressed to ${compressedSizeMB.toFixed(2)}MB`);

          if (compressedSizeMB <= maxSizeMB || attempts === maxAttempts) {
            // Create a new File object with the original name
            const compressedFile = new File([compressedBlob], file.name, {
              type: file.type || 'audio/mpeg',
              lastModified: Date.now(),
            });

            console.log(`Compression successful: ${fileSizeMB.toFixed(2)}MB → ${compressedSizeMB.toFixed(2)}MB`);
            compressed = true;
            
            // Cleanup
            await ffmpeg.deleteFile(inputFileName);
            await ffmpeg.deleteFile(outputFileName);
            
            return compressedFile;
          } else {
            // Reduce bitrate for next attempt
            currentBitrate = Math.max(64, Math.floor(currentBitrate * 0.7));
          }
        } catch (compressionError) {
          console.error(`Compression attempt ${attempts} failed:`, compressionError);
          if (attempts === maxAttempts) {
            throw compressionError;
          }
          // Reduce bitrate and try again
          currentBitrate = Math.max(64, Math.floor(currentBitrate * 0.7));
        }
      }

      throw new Error('Failed to compress audio to target size');

    } catch (error) {
      console.error('Audio compression failed:', error);
      throw new Error(`Audio compression failed: ${error.message}`);
    } finally {
      setIsCompressing(false);
      setCompressionProgress(0);
    }
  };

  const compressMultipleAudios = async (files, options = {}) => {
    const compressedFiles = [];
    const totalFiles = files.length;

    for (let i = 0; i < files.length; i++) {
      try {
        console.log(`Compressing file ${i + 1} of ${totalFiles}: ${files[i].name}`);
        const compressedFile = await compressAudio(files[i], options);
        compressedFiles.push(compressedFile);
      } catch (error) {
        console.error(`Failed to compress ${files[i].name}:`, error);
        // You can choose to either throw the error or continue with the original file
        throw error; // Uncomment this to stop on first error
        // compressedFiles.push(files[i]); // Uncomment this to continue with original file
      }
    }

    return compressedFiles;
  };

  return {
    compressAudio,
    compressMultipleAudios,
    isCompressing,
    compressionProgress,
  };
};