import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Filter, User, Briefcase, Users, X } from 'lucide-react';
import { Contact } from '../types';
import { useContacts } from '../contexts/ContactContext';
import Button from './ui/Button';
import Input from './ui/Input';

const CategoryBadge: React.FC<{ category: string }> = ({ category }) => {
  const categoryStyles = {
    work: 'bg-blue-100 text-blue-800',
    personal: 'bg-green-100 text-green-800',
    client: 'bg-purple-100 text-purple-800',
    other: 'bg-gray-100 text-gray-800'
  };

  const style = categoryStyles[category as keyof typeof categoryStyles] || categoryStyles.other;
  
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${style}`}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </span>
  );
};

const ContactList: React.FC = () => {
  const { contacts, loading, searchContacts, filterByCategory, clearFilters } = useContacts();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchContacts(value);
  };
  
  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    filterByCategory(category);
  };
  
  const handleClearFilters = () => {
    setSearchTerm('');
    setActiveFilter('all');
    clearFilters();
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
        <Link to="/contacts/new">
          <Button variant="primary" icon={<Plus size={18} />}>
            Add Contact
          </Button>
        </Link>
      </div>
      
      <div className="mb-6">
        <Input
          placeholder="Search contacts..."
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          leftIcon={<Search size={18} />}
          rightIcon={searchTerm ? 
            <button onClick={handleClearFilters}>
              <X size={18} />
            </button> : undefined
          }
        />
      </div>
      
      <div className="flex items-center mb-6 gap-2 overflow-x-auto pb-2">
        <div className="flex-shrink-0 text-gray-500 mr-2">
          <Filter size={18} />
        </div>
        <Button 
          variant={activeFilter === 'all' ? 'primary' : 'outline'} 
          size="sm"
          onClick={() => handleFilterChange('all')}
        >
          All
        </Button>
        <Button 
          variant={activeFilter === 'work' ? 'primary' : 'outline'} 
          size="sm"
          icon={<Briefcase size={14} />}
          onClick={() => handleFilterChange('work')}
        >
          Work
        </Button>
        <Button 
          variant={activeFilter === 'personal' ? 'primary' : 'outline'} 
          size="sm"
          icon={<User size={14} />}
          onClick={() => handleFilterChange('personal')}
        >
          Personal
        </Button>
        <Button 
          variant={activeFilter === 'client' ? 'primary' : 'outline'} 
          size="sm"
          icon={<Users size={14} />}
          onClick={() => handleFilterChange('client')}
        >
          Client
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No contacts found</p>
          <Link to="/contacts/new">
            <Button variant="outline" icon={<Plus size={18} />}>
              Add your first contact
            </Button>
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden">
          <ul className="divide-y divide-gray-200 -mx-6">
            {contacts.map((contact) => (
              <li key={contact.id} className="transition-colors hover:bg-gray-50">
                <Link 
                  to={`/contacts/${contact.id}`} 
                  className="px-6 py-4 flex items-center"
                >
                  <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden bg-gray-200 text-gray-600 flex items-center justify-center">
                    {contact.avatarUrl ? (
                      <img src={contact.avatarUrl} alt={`${contact.firstName} ${contact.lastName}`} className="h-12 w-12 object-cover" />
                    ) : (
                      <span className="font-medium text-lg">{getInitials(contact.firstName, contact.lastName)}</span>
                    )}
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-medium text-gray-900 truncate">
                        {contact.firstName} {contact.lastName}
                      </p>
                      <CategoryBadge category={contact.category} />
                    </div>
                    <p className="text-sm text-gray-500 truncate">{contact.email}</p>
                    <p className="text-sm text-gray-500 truncate">{contact.phone}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContactList;