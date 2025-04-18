import React from 'react';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ContactManager</span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              >
                Contacts
              </Link>
              <Link
                to="/contacts/new"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              >
                Add Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;