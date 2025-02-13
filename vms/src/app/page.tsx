'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

const Home = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center">
      <Button
        onClick={() => {
          router.push('/register');
        }}>
        Register visitor
      </Button>
      <Button
        onClick={() => {
          router.push('/security');
        }}>
        {' '}
        Check camera visitor
      </Button>
      ;
    </div>
  );
};

export default Home;
