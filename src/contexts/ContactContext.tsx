import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Contact, ContactFormData } from '../types';
import contactService from '../services/contactService';

interface ContactContextType {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  getContact: (id: string) => Promise<Contact | undefined>;
  addContact: (contact: ContactFormData) => Promise<Contact>;
  updateContact: (id: string, contact: ContactFormData) => Promise<Contact | undefined>;
  deleteContact: (id: string) => Promise<boolean>;
  searchContacts: (query: string) => Promise<void>;
  filterByCategory: (category: string) => Promise<void>;
  clearFilters: () => Promise<void>;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
};

interface ContactProviderProps {
  children: ReactNode;
}

export const ContactProvider: React.FC<ContactProviderProps> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await contactService.getContacts();
      setContacts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch contacts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getContact = async (id: string): Promise<Contact | undefined> => {
    try {
      return await contactService.getContactById(id);
    } catch (err) {
      setError('Failed to fetch contact');
      console.error(err);
      return undefined;
    }
  };

  const addContact = async (contactData: ContactFormData): Promise<Contact> => {
    try {
      setLoading(true);
      const newContact = await contactService.createContact(contactData);
      setContacts(prevContacts => [...prevContacts, newContact]);
      return newContact;
    } catch (err) {
      setError('Failed to add contact');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateContact = async (id: string, contactData: ContactFormData): Promise<Contact | undefined> => {
    try {
      setLoading(true);
      const updatedContact = await contactService.updateContact(id, contactData);
      if (updatedContact) {
        setContacts(prevContacts => 
          prevContacts.map(contact => 
            contact.id === id ? updatedContact : contact
          )
        );
      }
      return updatedContact;
    } catch (err) {
      setError('Failed to update contact');
      console.error(err);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const success = await contactService.deleteContact(id);
      if (success) {
        setContacts(prevContacts => 
          prevContacts.filter(contact => contact.id !== id)
        );
      }
      return success;
    } catch (err) {
      setError('Failed to delete contact');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const searchContacts = async (query: string): Promise<void> => {
    try {
      setLoading(true);
      if (!query.trim()) {
        await fetchContacts();
        return;
      }
      const results = await contactService.searchContacts(query);
      setContacts(results);
    } catch (err) {
      setError('Failed to search contacts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = async (category: string): Promise<void> => {
    try {
      setLoading(true);
      const results = await contactService.filterContactsByCategory(category);
      setContacts(results);
    } catch (err) {
      setError('Failed to filter contacts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = async (): Promise<void> => {
    await fetchContacts();
  };

  const value = {
    contacts,
    loading,
    error,
    getContact,
    addContact,
    updateContact,
    deleteContact,
    searchContacts,
    filterByCategory,
    clearFilters
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
};