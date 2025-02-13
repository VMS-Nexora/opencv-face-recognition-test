import Link from 'next/link';
import { Home, Users, Camera, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="bg-[#4448e6] text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link
          href="/dashboard"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-[#5559ff] hover:text-white">
          <Home
            className="inline-block mr-2"
            size={20}
          />
          Overview
        </Link>
        <Link
          href="/dashboard/departments"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-[#5559ff] hover:text-white">
          <Users
            className="inline-block mr-2"
            size={20}
          />
          Departments
        </Link>
        <Link
          href="/dashboard/resources"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-[#5559ff] hover:text-white">
          <Camera
            className="inline-block mr-2"
            size={20}
          />
          Resources
        </Link>
        <Link
          href="/dashboard/settings"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-[#5559ff] hover:text-white">
          <Settings
            className="inline-block mr-2"
            size={20}
          />
          Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
