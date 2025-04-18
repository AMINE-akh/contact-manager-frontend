import React, { useState } from 'react';
import { ContactFormData } from '../types';
import { useContacts } from '../contexts/ContactContext';
import ContactForm from '../components/ContactForm';

const CreateContactPage: React.FC = () => {
  const { addContact } = useContacts();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      await addContact(data);
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Contact</h1>
        <ContactForm 
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
};

export default CreateContactPage;