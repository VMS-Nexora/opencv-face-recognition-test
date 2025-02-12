/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { WebcamCapture } from '@/components/webcam-capture';
import type React from 'react';
import { useState } from 'react';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, image }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      alert('Registration successful!');
      setName('');
      setEmail('');
      setImage(null);
    } catch (err) {
      setError('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Registration</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <WebcamCapture onCapture={setImage} />
        {image && (
          <div className="mt-4">
            <img
              src={image || '/placeholder.svg'}
              alt="Captured"
              className="w-full"
            />
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading || !image}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400">
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default RegisterPage;
