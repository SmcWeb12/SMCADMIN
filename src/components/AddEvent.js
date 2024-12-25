import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { database, storage } from '../appwriteconfig'; // Adjust the import path as needed

const AddEvent = () => {
  const [eventName, setEventName] = useState('');
  const [details, setDetails] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Generate a unique file ID
      const uniqueFileId = uuidv4();

      // Upload the thumbnail
      const file = await storage.createFile('lic-bukket', uniqueFileId, thumbnail);

      // Construct the thumbnail URL
      const thumbnailUrl = `https://cloud.appwrite.io/v1/storage/buckets/lic-bukket/files/${file.$id}/view?project=lic`; // Replace with your Appwrite project URL and project ID

      // Save the event details
      const response = await database.createDocument('lic', 'events', uuidv4(), {
        title: eventName,
        description: details,
        thumbnail: thumbnailUrl,
        startDate: startDate,
        endDate: endDate,
      });

      console.log('Event added:', response);

      // Schedule deletion after end date
      const endDateObj = new Date(endDate);
      const deletionDate = new Date(endDateObj.getTime() + 24 * 60 * 60 * 1000);

      setTimeout(async () => {
        await database.deleteDocument('lic', 'events', response.$id);
        console.log('Event deleted:', response.$id);
      }, deletionDate.getTime() - Date.now());
    } catch (error) {
      console.error('Failed to add event:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Add Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Event Name</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Details</label>
          <textarea
            className="mt-1 p-2 w-full border rounded"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Thumbnail</label>
          <input
            type="file"
            className="mt-1 p-2 w-full border rounded"
            onChange={handleThumbnailChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            className="mt-1 p-2 w-full border rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            className="mt-1 p-2 w-full border rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
