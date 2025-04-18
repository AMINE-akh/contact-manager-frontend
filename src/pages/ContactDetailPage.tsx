import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Contact } from '../types';
import { useContacts } from '../contexts/ContactContext';
import ContactDetail from '../components/ContactDetail';

const ContactDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getContact, deleteContact } = useContacts();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const contactData = await getContact(id);
        
        if (contactData) {
          setContact(contactData);
        } else {
          navigate('/404');
        }
      } catch (error) {
        console.error('Error fetching contact:', error);
        navigate('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id, getContact, navigate]);

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      setIsDeleting(true);
      await deleteContact(id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting contact:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900">Contact not found</h2>
        <p className="mt-2 text-gray-600">The contact you're looking for doesn't exist or has been deleted.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ContactDetail 
        contact={contact} 
        onDelete={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ContactDetailPage;