/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { UserModal } from '@/components/user-modal';
import { WebcamCapture } from '@/components/webcam-capture';
import type React from 'react';
import { useState, useEffect, useRef } from 'react';

interface User {
  name: string;
  email: string;
}

const SecurityPage: React.FC = () => {
  const [matchedUser, setMatchedUser] = useState<User | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scanIntervalRef = useRef<number | null>(null);

  const startScanning = () => {
    setIsScanning(true);
  };

  const stopScanning = () => {
    setIsScanning(false);
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
  };

  const scanFace = async (image: string) => {
    const response = await fetch('http://127.0.0.1:5000/api/checkin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image }),
    });

    const data = await response.json();

    if (data?.error) {
      alert(`${data.error}`);
      return;
    }

    if (data.match) {
      setMatchedUser(data);
      stopScanning();
    } else {
      console.log('No match found');
      setError('No match found');
    }
  };

  useEffect(() => {
    return () => {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Security Check-in</h1>
      <WebcamCapture
        onCapture={scanFace}
        autoCapture={isScanning}
      />
      <div className="mt-4">
        <button
          onClick={isScanning ? stopScanning : startScanning}
          className={`w-full py-2 px-4 rounded ${
            isScanning
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          } text-white`}>
          {isScanning ? 'Stop Scanning' : 'Start Scanning'}
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {matchedUser && (
        <UserModal
          user={matchedUser}
          onClose={() => setMatchedUser(null)}
        />
      )}
    </div>
  );
};

export default SecurityPage;
