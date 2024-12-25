import React, { useState } from 'react';
import {
  HomeIcon,
  ClipboardListIcon,
  MenuIcon,
  VideoCameraIcon,
  CalendarIcon,
  UserIcon,
  LogoutIcon
} from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import { account } from '../appwriteconfig'; // Adjust the import path as needed

const AdminNavBar = ({ setActiveComponent }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('AddCourse');
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
    setActiveComponent(component);
  };

  const handleSignOut = async () => {
    try {
      await account.deleteSession('current'); // Log out by deleting the current session
      localStorage.removeItem('authToken'); // Clear any stored tokens or user data if applicable
      navigate('/auth'); // Redirect to the login page
    } catch (error) {
      console.error('Error during sign out:', error.message);
    }
  };

  const handleRegisterStudent = () => {
    navigate('/register'); // Redirect to register page
  };

  const navButtonClasses = (component) =>
    `flex flex-col items-center px-3 py-1 rounded-md transition-all duration-300 ${
      selectedComponent === component ? 'text-blue-500 bg-blue-100' : 'text-black hover:text-blue-500 hover:bg-gray-100'
    }`;

  return (
    <>
      {/* Bottom navigation bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around py-2 z-50 h-16">
        <button
          onClick={() => handleComponentChange('AddCourse')}
          className={navButtonClasses('AddCourse')}
        >
          <HomeIcon className="h-6 w-6" />
          <span className="text-xs">Course</span>
        </button>
        <button
          onClick={() => handleComponentChange('LiveClass')}
          className={navButtonClasses('LiveClass')}
        >
          <VideoCameraIcon className="h-6 w-6" />
          <span className="text-xs">Live Class</span>
        </button>
        <button
          onClick={() => handleComponentChange('AddHomework')}
          className={navButtonClasses('AddHomework')}
        >
          <ClipboardListIcon className="h-6 w-6" />
          <span className="text-xs">Homework</span>
        </button>
        <button onClick={toggleSidebar} className="flex flex-col items-center text-black hover:text-blue-500">
          <MenuIcon className="h-6 w-6" />
          <span className="text-xs">More</span>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end transform transition-transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="w-64 bg-white p-4 transition-all h-full shadow-md flex flex-col">
          <button onClick={toggleSidebar} className="mb-4 text-gray-700 self-end">
            Close
          </button>
          <button
            onClick={() => handleComponentChange('AddEvent')}
            className={navButtonClasses('AddEvent')}
          >
            <CalendarIcon className="h-6 w-6" />
            <span className="text-xs">Add Event</span>
          </button>
          <button
            onClick={handleRegisterStudent}
            className="flex flex-col items-center mb-4 text-black hover:text-blue-500"
          >
            <UserIcon className="h-6 w-6" />
            <span className="text-xs">Register Student</span>
          </button>
          <button
            onClick={handleSignOut}
            className="flex flex-col items-center text-black hover:text-red-500"
          >
            <LogoutIcon className="h-6 w-6" />
            <span className="text-xs">Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminNavBar;
