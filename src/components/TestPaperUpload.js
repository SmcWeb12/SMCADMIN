import React, { useState } from 'react';
import { storage } from '../appwriteconfig'; // Adjust the import path as needed

const TestPaperUpload = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (file) {
        await storage.createFile('unique()', file);
        setFile(null); // Clear the file input after submission
      }
    } catch (error) {
      console.error('Failed to upload test paper', error);
    }
  };

  return (
    <div className="test-paper-upload">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-2">
          Upload Test Paper
        </button>
      </form>
    </div>
  );
};

export default TestPaperUpload;
