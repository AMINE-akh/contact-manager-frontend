import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ContactProvider } from './contexts/ContactContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ContactDetailPage from './pages/ContactDetailPage';
import CreateContactPage from './pages/CreateContactPage';
import EditContactPage from './pages/EditContactPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ContactProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contacts/new" element={<CreateContactPage />} />
            <Route path="/contacts/:id" element={<ContactDetailPage />} />
            <Route path="/contacts/:id/edit" element={<EditContactPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ContactProvider>
  );
}

export default App;