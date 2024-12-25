import React, { useEffect, useState } from 'react';
import { account, database } from '../appwriteconfig'; // Adjust the import path as needed
import { jsPDF } from 'jspdf';
import MobileNavBar from './MobileNavBar';

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    email: '',
    userId: '',
    name: '',
    mobile: '',
    age: '',
    classLevel: '',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch the authenticated user's data (email, user ID, name)
        const userResponse = await account.get();
        setProfile((prevProfile) => ({
          ...prevProfile,
          email: userResponse.email,
          userId: userResponse.$id,
          name: userResponse.name || '',
        }));

        // Fetch the additional details (mobile, age, classLevel) from the database
        const profileResponse = await database.getDocument('lic', 'users', userResponse.$id);
        setProfile((prevProfile) => ({
          ...prevProfile,
          mobile: profileResponse.mobile,
          age: profileResponse.age,
          classLevel: profileResponse.classLevel,
        }));
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Update the user's profile data in the database
      await database.updateDocument('lic', 'users', profile.userId, {
        mobile: profile.mobile,
        age: profile.age,
        classLevel: profile.classLevel,
      });

      setEditing(false);
    } catch (error) {
      console.error('Failed to update profile', error);
    }
  };

  // Function to generate PDF of the profile
  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [90, 160], // 9:16 aspect ratio, adjust as needed
    });

    // Add profile data to PDF
    doc.setFontSize(16);
    doc.text(`Name: ${profile.name}`, 10, 10);
    doc.text(`Email: ${profile.email}`, 10, 20);
    doc.text(`User ID: ${profile.userId}`, 10, 30);
    doc.text(`Mobile No: ${profile.mobile}`, 10, 40);
    doc.text(`Age: ${profile.age} Years`, 10, 50);
    doc.text(`Class: ${profile.classLevel}`, 10, 60);

    // Save the PDF
    doc.save('student_profile.pdf');
  };

  return (
    <div className="profile">
      {/* ID Card Layout */}
      <div
        className="max-w-xs mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-300 space-y-4"
        style={{
          width: '90mm',
          height: '160mm',
          backgroundColor: '#f3f4f6',
        }}
      >
        {/* Header section */}
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex-shrink-0"></div> {/* Placeholder for Profile Picture */}
          <div>
            <h2 className="text-2xl font-bold text-blue-600">{profile.name}</h2>
            <p className="text-sm text-gray-600">{profile.classLevel}</p>
          </div>
        </div>

        {/* Body section */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-800">Email:</span>
            <span className="text-gray-600">{profile.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-800">User ID:</span>
            <span className="text-gray-600">{profile.userId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-800">Mobile No:</span>
            <span className="text-gray-600">{profile.mobile}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-800">Age:</span>
            <span className="text-gray-600">{profile.age} Years</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-800">Class:</span>
            <span className="text-gray-600">{profile.classLevel}</span>
          </div>
        </div>

        {/* Edit and Save Section */}
        {editing ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={profile.name || ''}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="border p-2 w-full rounded-md"
                placeholder="Name"
              />
            </div>
            <div>
              <label className="block text-gray-700">Mobile No</label>
              <input
                type="text"
                value={profile.mobile || ''}
                onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
                className="border p-2 w-full rounded-md"
                placeholder="Mobile Number"
              />
            </div>
            <div>
              <label className="block text-gray-700">Age</label>
              <input
                type="date"
                value={profile.age || ''}
                onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                className="border p-2 w-full rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Class</label>
              <input
                type="text"
                value={profile.classLevel || ''}
                onChange={(e) => setProfile({ ...profile, classLevel: e.target.value })}
                className="border p-2 w-full rounded-md"
                placeholder="Class"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 mt-2 rounded-md"
            >
              Save
            </button>
          </form>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="w-full bg-yellow-500 text-white px-4 py-2 mt-4 rounded-md"
          >
            Edit Profile
          </button>
        )}

        {/* Download PDF Button */}
        <button
          onClick={generatePDF}
          className="w-full bg-green-500 text-white px-4 py-2 mt-4 rounded-md"
        >
          Download ID Card (PDF)
        </button>
      </div>
      <MobileNavBar/>
    </div>
  );
};

export default StudentProfile;
