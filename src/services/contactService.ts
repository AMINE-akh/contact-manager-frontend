import { Contact, ContactFormData } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Mock data
const initialContacts: Contact[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    category: 'work',
    company: 'Acme Inc.',
    address: '123 Main St, Anytown, USA',
    notes: 'Met at the conference last month',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    createdAt: new Date(2023, 1, 15).toISOString(),
    updatedAt: new Date(2023, 4, 10).toISOString(),
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    category: 'personal',
    address: '456 Oak Ave, Somewhere, USA',
    notes: 'Friend from college',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    createdAt: new Date(2023, 2, 20).toISOString(),
    updatedAt: new Date(2023, 2, 20).toISOString(),
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.j@example.com',
    phone: '(555) 234-5678',
    category: 'work',
    company: 'Tech Solutions Ltd',
    address: '789 Pine Rd, Elsewhere, USA',
    avatarUrl: 'https://i.pravatar.cc/150?img=8',
    createdAt: new Date(2023, 3, 5).toISOString(),
    updatedAt: new Date(2023, 3, 5).toISOString(),
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Brown',
    email: 'emily.b@example.com',
    phone: '(555) 876-5432',
    category: 'personal',
    notes: 'Yoga instructor',
    avatarUrl: 'https://i.pravatar.cc/150?img=9',
    createdAt: new Date(2023, 4, 10).toISOString(),
    updatedAt: new Date(2023, 4, 10).toISOString(),
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.w@example.com',
    phone: '(555) 345-6789',
    category: 'client',
    company: 'Global Enterprises',
    address: '101 Maple Dr, Nowhere, USA',
    notes: 'Important client - handle with care',
    avatarUrl: 'https://i.pravatar.cc/150?img=11',
    createdAt: new Date(2023, 5, 25).toISOString(),
    updatedAt: new Date(2023, 5, 25).toISOString(),
  }
];

// Mock localStorage implementation
class ContactService {
  private contacts: Contact[] = [];
  private storageKey = 'contacts';

  constructor() {
    // Load contacts from localStorage or use initial data
    const savedContacts = localStorage.getItem(this.storageKey);
    this.contacts = savedContacts ? JSON.parse(savedContacts) : initialContacts;
    
    // If no contacts are saved, initialize with mock data
    if (!savedContacts) {
      this.saveToStorage();
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.contacts));
  }

  public async getContacts(): Promise<Contact[]> {
    // Simulate API delay
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([...this.contacts]);
      }, 300);
    });
  }

  public async getContactById(id: string): Promise<Contact | undefined> {
    // Simulate API delay
    return new Promise(resolve => {
      setTimeout(() => {
        const contact = this.contacts.find(c => c.id === id);
        resolve(contact ? {...contact} : undefined);
      }, 300);
    });
  }

  public async createContact(contactData: ContactFormData): Promise<Contact> {
    const newContact: Contact = {
      id: uuidv4(),
      ...contactData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Simulate API delay
    return new Promise(resolve => {
      setTimeout(() => {
        this.contacts.push(newContact);
        this.saveToStorage();
        resolve({...newContact});
      }, 300);
    });
  }

  public async updateContact(id: string, contactData: ContactFormData): Promise<Contact | undefined> {
    // Simulate API delay
    return new Promise(resolve => {
      setTimeout(() => {
        const index = this.contacts.findIndex(c => c.id === id);
        if (index !== -1) {
          const updatedContact: Contact = {
            ...this.contacts[index],
            ...contactData,
            updatedAt: new Date().toISOString(),
          };
          this.contacts[index] = updatedContact;
          this.saveToStorage();
          resolve({...updatedContact});
        } else {
          resolve(undefined);
        }
      }, 300);
    });
  }

  public async deleteContact(id: string): Promise<boolean> {
    // Simulate API delay
    return new Promise(resolve => {
      setTimeout(() => {
        const index = this.contacts.findIndex(c => c.id === id);
        if (index !== -1) {
          this.contacts.splice(index, 1);
          this.saveToStorage();
          resolve(true);
        } else {
          resolve(false);
        }
      }, 300);
    });
  }

  public async searchContacts(query: string): Promise<Contact[]> {
    const searchTerm = query.toLowerCase();
    // Simulate API delay
    return new Promise(resolve => {
      setTimeout(() => {
        const results = this.contacts.filter(
          contact => 
            contact.firstName.toLowerCase().includes(searchTerm) ||
            contact.lastName.toLowerCase().includes(searchTerm) ||
            contact.email.toLowerCase().includes(searchTerm) ||
            contact.phone.includes(searchTerm) ||
            (contact.company && contact.company.toLowerCase().includes(searchTerm))
        );
        resolve([...results]);
      }, 300);
    });
  }

  public async filterContactsByCategory(category: string): Promise<Contact[]> {
    // Simulate API delay
    return new Promise(resolve => {
      setTimeout(() => {
        if (category === 'all') {
          resolve([...this.contacts]);
        } else {
          const results = this.contacts.filter(
            contact => contact.category === category
          );
          resolve([...results]);
        }
      }, 300);
    });
  }
}

export default new ContactService();