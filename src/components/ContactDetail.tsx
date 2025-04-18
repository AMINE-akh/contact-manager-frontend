import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Briefcase, Trash2, Edit, ArrowLeft, ExternalLink } from 'lucide-react';
import { Contact } from '../types';
import Button from './ui/Button';

interface ContactDetailProps {
  contact: Contact;
  onDelete: () => Promise<void>;
  isLoading: boolean;
}

const ContactDetail: React.FC<ContactDetailProps> = ({ contact, onDelete, isLoading }) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (isConfirmingDelete) {
      await onDelete();
      navigate('/');
    } else {
      setIsConfirmingDelete(true);
    }
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getCategoryColor = (category: string): string => {
    const colors = {
      work: 'bg-blue-100 text-blue-800',
      personal: 'bg-green-100 text-green-800',
      client: 'bg-purple-100 text-purple-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-6">
        <div className="flex items-center mb-4">
          <Link to="/" className="text-white hover:text-blue-100 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-semibold text-white ml-4">Contact Details</h1>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <div className="h-24 w-24 rounded-full overflow-hidden bg-white text-blue-600 flex items-center justify-center mb-4 md:mb-0">
            {contact.avatarUrl ? (
              <img src={contact.avatarUrl} alt={`${contact.firstName} ${contact.lastName}`} className="h-24 w-24 object-cover" />
            ) : (
              <span className="font-bold text-3xl">{getInitials(contact.firstName, contact.lastName)}</span>
            )}
          </div>
          
          <div className="md:ml-6 text-white">
            <h2 className="text-2xl font-bold">
              {contact.firstName} {contact.lastName}
            </h2>
            <div className="flex items-center mt-2">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(contact.category)}`}>
                {contact.category.charAt(0).toUpperCase() + contact.category.slice(1)}
              </span>
              {contact.company && (
                <span className="ml-3 flex items-center text-blue-100">
                  <Briefcase size={16} className="mr-1" />
                  {contact.company}
                </span>
              )}
            </div>
          </div>
          
          <div className="md:ml-auto mt-4 md:mt-0 flex space-x-3">
            <Link to={`/contacts/${contact.id}/edit`}>
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                icon={<Edit size={16} />}
              >
                Edit
              </Button>
            </Link>
            <Button
              variant="danger"
              className={isConfirmingDelete ? 'bg-red-700 hover:bg-red-800' : ''}
              onClick={handleDelete}
              isLoading={isLoading}
              icon={<Trash2 size={16} />}
            >
              {isConfirmingDelete ? 'Confirm Delete' : 'Delete'}
            </Button>
            {isConfirmingDelete && (
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={cancelDelete}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
              <div className="mt-3 space-y-3">
                <p className="flex items-center text-gray-800">
                  <Mail size={18} className="mr-2 text-blue-500" />
                  <a 
                    href={`mailto:${contact.email}`} 
                    className="hover:text-blue-600 transition-colors"
                  >
                    {contact.email}
                  </a>
                </p>
                <p className="flex items-center text-gray-800">
                  <Phone size={18} className="mr-2 text-blue-500" />
                  <a 
                    href={`tel:${contact.phone}`} 
                    className="hover:text-blue-600 transition-colors"
                  >
                    {contact.phone}
                  </a>
                </p>
                {contact.address && (
                  <p className="flex items-start text-gray-800">
                    <MapPin size={18} className="mr-2 mt-1 flex-shrink-0 text-blue-500" />
                    <span>{contact.address}</span>
                  </p>
                )}
              </div>
            </div>
            
            {contact.notes && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                <p className="mt-2 text-gray-800 whitespace-pre-line">{contact.notes}</p>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Activity</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-600">Created: {formatDate(contact.createdAt)}</p>
                <p className="text-sm text-gray-600">Last updated: {formatDate(contact.updatedAt)}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-500">Quick Actions</h3>
              <div className="mt-3 space-y-3">
                <a 
                  href={`mailto:${contact.email}`} 
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Mail size={16} className="mr-2" />
                  Send Email
                  <ExternalLink size={14} className="ml-1" />
                </a>
                {contact.company && (
                  <a 
                    href={`https://www.google.com/search?q=${encodeURIComponent(contact.company)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Briefcase size={16} className="mr-2" />
                    Look up Company
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                )}
                {contact.address && (
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(contact.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <MapPin size={16} className="mr-2" />
                    View on Maps
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;