import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <AlertCircle size={64} className="text-blue-500 mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button variant="primary" icon={<Home size={18} />}>
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;