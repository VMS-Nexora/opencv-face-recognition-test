'use client';

import type React from 'react';
import { useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';

interface WebcamCaptureProps {
  onCapture: (image: string) => void;
  autoCapture?: boolean;
}

export const WebcamCapture: React.FC<WebcamCaptureProps> = ({
  onCapture,
  autoCapture = false,
}) => {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  }, [onCapture]);

  useEffect(() => {
    let interval: number;
    if (autoCapture) {
      interval = window.setInterval(() => {
        capture();
      }, 5000); // Capture every 5 seconds
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoCapture, capture]);

  return (
    <div className="relative">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full"
      />
      {!autoCapture && (
        <button
          onClick={capture}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Capture
        </button>
      )}
    </div>
  );
};
