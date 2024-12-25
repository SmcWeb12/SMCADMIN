import React, { useState } from 'react';
import { database, storage } from '../appwriteconfig'; // Adjust the import path as needed
import { v4 as uuidv4 } from 'uuid';

const Homework = () => {
  const [homework, setHomework] = useState('');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [classLevel, setClassLevel] = useState('xi');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const documentId = uuidv4();
    const startDateTime = new Date(startDate);
    const dueDateTime = new Date(dueDate);

    if (startDateTime >= dueDateTime) {
      setMessage('End time must be after start time.');
      return;
    }

    try {
      let fileUrl = null;
      if (file) {
        const fileId = uuidv4();
        await storage.createFile('lic-bukket', fileId, file);
        fileUrl = storage.getFileView('lic-bukket', fileId); // Replace with actual URL retrieval method
      }

      await database.createDocument('lic', 'homework', documentId, {
        title,
        content: homework,
        start_date: startDateTime.toISOString(),
        due_date: dueDateTime.toISOString(),
        class: classLevel,
        file_url: fileUrl,
        student_id: 'student_id_example', // Replace with actual student ID
      });

      setMessage('Homework sent successfully!');
      setHomework('');
      setTitle('');
      setDueDate('');
      setStartDate('');
      setClassLevel('xi');
      setFile(null);
    } catch (error) {
      console.error('Failed to submit homework', error);
      setMessage('Failed to submit homework. Please try again.');
    }
  };

  return (
    <div className="homework max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Send Homework/Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title/Topic</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <textarea
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            value={homework}
            onChange={(e) => setHomework(e.target.value)}
            placeholder="Enter homework/tasks/suggestions/notes"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Due Date</label>
          <input
            type="datetime-local"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Start Date</label>
          <input
            type="datetime-local"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Class</label>
          <select
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
            required
          >
            <option value="xi">XI</option>
            <option value="xii">XII</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Upload File</label>
          <input
            type="file"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300">
          Send Homework
        </button>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </form>
    </div>
  );
};

export default Homework;
