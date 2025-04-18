export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  category: string;
  address?: string;
  company?: string;
  notes?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  category: string;
  address?: string;
  company?: string;
  notes?: string;
}

export interface ContactCategory {
  id: string;
  name: string;
  color: string;
}