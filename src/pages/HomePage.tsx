import React from 'react';
import ContactList from '../components/ContactList';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <ContactList />
    </div>
  );
};

export default HomePage;