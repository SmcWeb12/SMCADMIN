import React, { useState } from 'react';
import AddCourse from '../components/AddCourse';
import AddHomework from '../components/AddHomework';
import AdminNavBar from '../components/AdminNavbar';
import CreateLiveClassForm from '../components/CreateLiveClassForm';
import AddEvent from '../components/AddEvent';

const AdminPage = () => {
  const [activeComponent, setActiveComponent] = useState('AddCourse');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'AddCourse':
        return <AddCourse />;
      case 'AddHomework':
        return <AddHomework />;
      case 'LiveClass':
        return <CreateLiveClassForm />;
      case 'AddEvent':
        return <AddEvent />;
      default:
        return <AddCourse />;
    }
  };

  return (
    <div className="relative h-screen flex flex-col bg-gray-50">
      <div className="flex-grow overflow-y-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Admin Panel</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          {renderComponent()}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full shadow-lg bg-white">
        <AdminNavBar setActiveComponent={setActiveComponent} />
      </div>
    </div>
  );
};

export default AdminPage;
