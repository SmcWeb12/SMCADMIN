import React, { useState } from 'react';
import { account } from '../appwriteconfig'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLock } from 'react-icons/fa';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // To navigate after successful login

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await account.createEmailPasswordSession(email, password);
      navigate('/'); // Redirect to homepage after login
    } catch (error) {
      setErrorMessage(error.message || 'Login error');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-blue-600">Admin Login</h2>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              <FaUserAlt className="inline-block mr-2" /> Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              <FaLock className="inline-block mr-2" /> Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
