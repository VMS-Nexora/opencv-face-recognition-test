'use client';

import { useState } from 'react';
import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-800">
              Visitor Management System
            </h1>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon">
              <Bell className="h-6 w-6" />
            </Button>
            <span className="ml-4 font-medium text-gray-800">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
