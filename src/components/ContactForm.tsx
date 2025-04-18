import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Briefcase, FileText } from 'lucide-react';
import { ContactFormData } from '../types';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import TextArea from './ui/TextArea';

interface ContactFormProps {
  initialData?: ContactFormData;
  onSubmit: (data: ContactFormData) => Promise<void>;
  isLoading: boolean;
}

const defaultFormData: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  category: 'other',
  address: '',
  company: '',
  notes: ''
};

const categoryOptions = [
  { value: 'work', label: 'Work' },
  { value: 'personal', label: 'Personal' },
  { value: 'client', label: 'Client' },
  { value: 'other', label: 'Other' }
];

const ContactForm: React.FC<ContactFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<ContactFormData>(initialData || defaultFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await onSubmit(formData);
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle submission error
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="John"
          error={errors.firstName}
          fullWidth
          required
          leftIcon={<User size={18} />}
        />
        
        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Doe"
          error={errors.lastName}
          fullWidth
          required
          leftIcon={<User size={18} />}
        />
      </div>
      
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="john.doe@example.com"
        error={errors.email}
        fullWidth
        required
        leftIcon={<Mail size={18} />}
      />
      
      <Input
        label="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="(555) 123-4567"
        error={errors.phone}
        fullWidth
        required
        leftIcon={<Phone size={18} />}
      />
      
      <Select
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleSelectChange('category')}
        options={categoryOptions}
        fullWidth
      />
      
      <Input
        label="Company"
        name="company"
        value={formData.company || ''}
        onChange={handleChange}
        placeholder="Acme Inc. (Optional)"
        fullWidth
        leftIcon={<Briefcase size={18} />}
      />
      
      <Input
        label="Address"
        name="address"
        value={formData.address || ''}
        onChange={handleChange}
        placeholder="123 Main St, Anytown, USA (Optional)"
        fullWidth
        leftIcon={<MapPin size={18} />}
      />
      
      <TextArea
        label="Notes"
        name="notes"
        value={formData.notes || ''}
        onChange={handleChange}
        placeholder="Additional information... (Optional)"
        rows={4}
        fullWidth
      />
      
      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          icon={<FileText size={18} />}
        >
          {initialData ? 'Update Contact' : 'Save Contact'}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;