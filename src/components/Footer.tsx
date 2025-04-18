import React from 'react';
import { Github as GitHub, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500">
              &copy; {year} ContactManager. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 transition-colors"
              aria-label="GitHub"
            >
              <GitHub size={20} />
            </a>
            <span className="flex items-center text-gray-500 text-sm">
              Made with <Heart size={16} className="mx-1 text-red-500" /> using React
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;