// CreateProfile.js
import React, { useState, useEffect } from 'react';
import { account, database } from '../appwriteconfig'; // Import from appwriteconfig
import { useNavigate } from 'react-router-dom';

const CreateProfile = () => {
  const [user, setUser] = useState(null); // For storing user details
  const [classLevel, setClassLevel] = useState('');
  const [mobile, setMobile] = useState('');
  const [age, setAge] = useState('');
  const [isStudent, setIsStudent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the logged-in user's details
    const fetchUser = async () => {
      try {
        const userDetails = await account.get(); // Fetch current user details from Appwrite
        setUser(userDetails);
      } catch (error) {
        setErrorMessage('Failed to fetch user details');
      }
    };

    fetchUser();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    try {
      // Save the profile details in the 'users' collection
      await database.createDocument('lic', 'users', user.$id, {
        classLevel,
        mobile,
        age,
        isStudent,
      });

      // Navigate to a different page after profile creation
      navigate('/home'); // Change this to the desired route
    } catch (error) {
      console.error('Error creating profile:', error);
      setErrorMessage(error.message || 'An error occurred while saving the profile.');
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Loading state while fetching user details
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center py-10 px-5">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Complete Your Profile</h2>

        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={user.name}
              disabled
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">User ID</label>
            <input
              type="text"
              value={user.$id}
              disabled
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Class</label>
            <select
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Class</option>
              <option value="X">Class X</option>
              <option value="XI">Class XI</option>
              <option value="XII">Class XII</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your mobile number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your age"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isStudent"
              checked={isStudent}
              onChange={() => setIsStudent(!isStudent)}
              className="h-4 w-4 text-blue-500"
            />
            <label htmlFor="isStudent" className="ml-2 text-sm text-gray-700">
              I am a student of SMC GODDA
            </label>
          </div>

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
