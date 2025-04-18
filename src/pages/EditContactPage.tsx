import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContactFormData } from '../types';
import { useContacts } from '../contexts/ContactContext';
import ContactForm from '../components/ContactForm';

const EditContactPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getContact, updateContact } = useContacts();
  const [contactData, setContactData] = useState<ContactFormData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const contact = await getContact(id);
        
        if (contact) {
          const { id: _, avatarUrl, createdAt, updatedAt, ...formData } = contact;
          setContactData(formData as ContactFormData);
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

  const handleSubmit = async (data: ContactFormData) => {
    if (!id) return;
    
    try {
      setIsSubmitting(true);
      await updateContact(id, data);
      navigate(`/contacts/${id}`);
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!contactData) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900">Contact not found</h2>
        <p className="mt-2 text-gray-600">The contact you're trying to edit doesn't exist or has been deleted.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Contact</h1>
        <ContactForm 
          initialData={contactData}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EditContactPage;