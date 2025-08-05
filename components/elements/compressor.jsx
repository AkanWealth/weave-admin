// Enhanced audio compression with multiple optimization strategies

// 1. Improved compression with configurable bitrates and sample rates
const compressAudioAdvanced = (file, options = {}) => {
  const {
    bitrate = 96, // Lower bitrate for smaller files (was 128)
    sampleRate = 22050, // Lower sample rate for smaller files (was original rate)
    quality = 5, // lamejs quality (0-9, lower is better quality but larger size)
    mono = false // Convert to mono to halve the file size
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target.result;
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Decode the audio
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        
        // Resample if needed
        const resampledBuffer = await resampleAudio(audioBuffer, sampleRate);
        
        // Convert to mono if specified
        const processedBuffer = mono ? convertToMono(resampledBuffer) : resampledBuffer;
        
        // Convert to PCM data
        const wavData = convertToWav(processedBuffer);
        
        // Configure MP3 encoder
        const channels = mono ? 1 : Math.min(processedBuffer.numberOfChannels, 2);
        const mp3Encoder = new lamejs.Mp3Encoder(channels, sampleRate, bitrate);
        mp3Encoder.quality = quality;
        
        const mp3Data = [];
        const blockSize = 1152;
        
        // Process in chunks with progress callback
        for (let i = 0; i < wavData.length; i += blockSize) {
          const samples = wavData.subarray(i, i + blockSize);
          const mp3buf = mp3Encoder.encodeBuffer(samples);
          if (mp3buf.length > 0) {
            mp3Data.push(mp3buf);
          }
        }
        
        // Flush remaining data
        const mp3buf = mp3Encoder.flush();
        if (mp3buf.length > 0) {
          mp3Data.push(mp3buf);
        }

        const blob = new Blob(mp3Data, { type: "audio/mpeg" });
        const compressedFile = new File([blob], `${file.name.replace(/\.[^/.]+$/, "")}.mp3`, {
          type: "audio/mpeg",
        });
        
        resolve(compressedFile);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsArrayBuffer(file);
  });
};

// 2. Audio resampling function
const resampleAudio = (audioBuffer, targetSampleRate) => {
  return new Promise((resolve) => {
    if (audioBuffer.sampleRate === targetSampleRate) {
      resolve(audioBuffer);
      return;
    }

    const offlineContext = new OfflineAudioContext(
      audioBuffer.numberOfChannels,
      Math.ceil(audioBuffer.duration * targetSampleRate),
      targetSampleRate
    );

    const source = offlineContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(offlineContext.destination);
    source.start();

    offlineContext.startRendering().then(resolve);
  });
};

// 3. Convert stereo to mono
const convertToMono = (audioBuffer) => {
  if (audioBuffer.numberOfChannels === 1) {
    return audioBuffer;
  }

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const monoBuffer = audioContext.createBuffer(1, audioBuffer.length, audioBuffer.sampleRate);
  const monoData = monoBuffer.getChannelData(0);

  // Mix all channels to mono
  for (let i = 0; i < audioBuffer.length; i++) {
    let sum = 0;
    for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
      sum += audioBuffer.getChannelData(channel)[i];
    }
    monoData[i] = sum / audioBuffer.numberOfChannels;
  }

  return monoBuffer;
};

// 4. Improved WAV conversion with proper channel handling
const convertToWav = (audioBuffer) => {
  const numOfChan = audioBuffer.numberOfChannels;
  const length = audioBuffer.length * numOfChan * 2;
  const buffer = new ArrayBuffer(length);
  const view = new DataView(buffer);
  let offset = 0;

  // Interleave channels
  for (let i = 0; i < audioBuffer.length; i++) {
    for (let channel = 0; channel < numOfChan; channel++) {
      const sample = Math.max(-1, Math.min(1, audioBuffer.getChannelData(channel)[i]));
      view.setInt16(offset, sample * 0x7fff, true);
      offset += 2;
    }
  }
  return new Int16Array(buffer);
};

// 5. Compression with different quality presets
const compressionPresets = {
  highest_quality: { bitrate: 320, sampleRate: 44100, quality: 0, mono: false },
  high_quality: { bitrate: 192, sampleRate: 44100, quality: 2, mono: false },
  medium_quality: { bitrate: 128, sampleRate: 44100, quality: 5, mono: false },
  low_quality: { bitrate: 96, sampleRate: 22050, quality: 7, mono: false },
  smallest_size: { bitrate: 64, sampleRate: 22050, quality: 9, mono: true }
};

// 6. Smart compression based on file size
const smartCompress = async (file) => {
  const fileSizeMB = file.size / (1024 * 1024);
  
  let preset;
  if (fileSizeMB > 50) {
    preset = compressionPresets.smallest_size;
  } else if (fileSizeMB > 20) {
    preset = compressionPresets.low_quality;
  } else if (fileSizeMB > 10) {
    preset = compressionPresets.medium_quality;
  } else {
    preset = compressionPresets.high_quality;
  }
  
  return await compressAudioAdvanced(file, preset);
};

// 7. Batch compression with progress tracking
const compressBatch = async (files, onProgress, compressionOptions = compressionPresets.medium_quality) => {
  const compressedFiles = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress?.(i, files.length, `Compressing ${file.name}...`);
    
    try {
      const compressed = await compressAudioAdvanced(file, compressionOptions);
      compressedFiles.push(compressed);
      
      // Log compression stats
      const originalSize = (file.size / (1024 * 1024)).toFixed(2);
      const compressedSize = (compressed.size / (1024 * 1024)).toFixed(2);
      const reduction = (((file.size - compressed.size) / file.size) * 100).toFixed(1);
      
      console.log(`${file.name}: ${originalSize}MB → ${compressedSize}MB (${reduction}% reduction)`);
      
    } catch (error) {
      console.error(`Failed to compress ${file.name}:`, error);
      // Fallback to original file if compression fails
      compressedFiles.push(file);
    }
  }
  
  onProgress?.(files.length, files.length, 'Compression complete!');
  return compressedFiles;
};

// 8. Alternative using Web Audio API with better performance
const compressAudioWebAPI = async (file, options = {}) => {
  const {
    bitrate = 96,
    sampleRate = 22050,
    mono = false
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target.result;
        
        // Use Web Audio API for processing
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        
        // Create offline context with target sample rate
        const channels = mono ? 1 : Math.min(audioBuffer.numberOfChannels, 2);
        const offlineContext = new OfflineAudioContext(
          channels,
          Math.ceil(audioBuffer.duration * sampleRate),
          sampleRate
        );
        
        const source = offlineContext.createBufferSource();
        source.buffer = audioBuffer;
        
        if (mono && audioBuffer.numberOfChannels > 1) {
          // Create a channel merger to mix to mono
          const merger = offlineContext.createChannelMerger(1);
          const splitter = offlineContext.createChannelSplitter(audioBuffer.numberOfChannels);
          const gain = offlineContext.createGain();
          gain.gain.value = 1 / audioBuffer.numberOfChannels;
          
          source.connect(splitter);
          for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
            splitter.connect(gain, i);
          }
          gain.connect(merger, 0, 0);
          merger.connect(offlineContext.destination);
        } else {
          source.connect(offlineContext.destination);
        }
        
        source.start();
        
        const renderedBuffer = await offlineContext.startRendering();
        
        // Convert to MP3
        const wavData = convertToWav(renderedBuffer);
        const mp3Encoder = new lamejs.Mp3Encoder(channels, sampleRate, bitrate);
        const mp3Data = [];
        
        const blockSize = 1152;
        for (let i = 0; i < wavData.length; i += blockSize) {
          const samples = wavData.subarray(i, i + blockSize);
          const mp3buf = mp3Encoder.encodeBuffer(samples);
          if (mp3buf.length > 0) {
            mp3Data.push(mp3buf);
          }
        }
        
        const mp3buf = mp3Encoder.flush();
        if (mp3buf.length > 0) {
          mp3Data.push(mp3buf);
        }

        const blob = new Blob(mp3Data, { type: "audio/mpeg" });
        const compressedFile = new File([blob], `${file.name.replace(/\.[^/.]+$/, "")}.mp3`, {
          type: "audio/mpeg",
        });
        
        resolve(compressedFile);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsArrayBuffer(file);
  });
};

export {
  compressAudioAdvanced,
  smartCompress,
  compressBatch,
  compressAudioWebAPI,
  compressionPresets
};