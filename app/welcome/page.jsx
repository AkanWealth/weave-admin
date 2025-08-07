import React from "react";
import Image from "next/image";

import welcomeGif from "@/assets/images/welcome_gig.gif";
import Link from "next/link";

function Welcome() {
  return (
    <main className="fixed w-full h-full flex justify-center font-rubikRegular text-sm">
      <div className="w-10/12 max-w-[500px] min-h-[400px] m-auto flex-col space-y-8">
        <Image
          src={welcomeGif}
          className="w-[300px] m-auto"
          alt="Welcome Gif"
        />

        <h1 className="text-center text-3xl font-rubikBold">
          Welcome to Admin Portal{" "}
        </h1>

        <Link
          href={"/dashboard"}
          className="block bg-weave-primary py-2 text-base-white text-center rounded-xl"
        >
          Proceed to Dashboard
        </Link>
      </div>
    </main>
  );
}

export default Welcome;


//the login testing
// 'use client';

// import { useState } from 'react';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [accessToken, setAccessToken] = useState('');
//   const [error, setError] = useState('');
//   const [responseData, setResponseData] = useState('');

//   const API_BASE = 'https://founderthrive-cabf912c3adc.herokuapp.com/api/v1';

//   const login = async (e) => {
//     e.preventDefault();
//     setError('');
//     setAccessToken('');
//     setResponseData('');

//     try {
//       const res = await fetch(`${API_BASE}/auth/login`, {
//         method: 'POST',
//         credentials: 'include', // Important for cookies!
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || 'Login failed');

//       setAccessToken(data.accessToken);
//       alert('✅ Login successful!');
//     } catch (err) {
//       setError( `${err.message}`);
//     }
//   };

//   const callProtected = async () => {
//     setError('');
//     setResponseData('');
//     try {
//       const res = await fetch(`${API_BASE}/users/all`, {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || 'Access failed');

//       setResponseData(JSON.stringify(data, null, 2));
//     } catch (err) {
//       setError('❌ Access token expired or invalid.');
//     }
//   };

//   const refreshAccessToken = async () => {
//     setError('');
//     try {
//       const res = await fetch(`${API_BASE}/auth/refresh`, {
//         method: 'PATCH',
//         credentials: 'include', // Send cookie!
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || 'Refresh failed');

//       setAccessToken(data.accessToken);
//       alert('🔁 Token refreshed!');
//     } catch (err) {
//       setError('❌ Failed to refresh token. Try logging in again.');
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: 'auto', fontFamily: 'Arial' }}>
//       <h2>🔐 Login</h2>
//       <form onSubmit={login}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           required
//           style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           required
//           style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
//         />
//         <button type="submit" style={{ padding: '10px', width: '100%' }}>
//           Login
//         </button>
//       </form>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <hr />

//       <p><strong>Access Token:</strong></p>
//       <textarea rows={4} value={accessToken} readOnly style={{ width: '100%' }} />

//       <div style={{ marginTop: '10px' }}>
//         <button onClick={callProtected} style={{ marginRight: '10px', padding: '8px' }}>
//           🔐 Call Protected
//         </button>
//         <button onClick={refreshAccessToken} style={{ padding: '8px' }}>
//           🔄 Refresh Token
//         </button>
//       </div>

//       {responseData && (
//         <>
//           <h4>Protected Route Result:</h4>
//           <pre>{responseData}</pre>
//         </>
//       )}
//     </div>
//   );
// }