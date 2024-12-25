import React, { useEffect, useState } from 'react';
import { database } from '../appwriteconfig'; // Adjust the import path as needed
import { DocumentTextIcon, CalendarIcon, ClockIcon, AcademicCapIcon, PaperClipIcon } from '@heroicons/react/outline';

const HomeworkList = () => {
  const [homework, setHomework] = useState([]);
  const [filteredHomework, setFilteredHomework] = useState([]);
  const [selectedClass, setSelectedClass] = useState('xi');

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        const response = await database.listDocuments('lic', 'homework');
        setHomework(response.documents);
        filterHomework(response.documents, selectedClass);
      } catch (error) {
        console.error('Failed to fetch homework', error);
      }
    };

    fetchHomework();
  }, []);

  useEffect(() => {
    filterHomework(homework, selectedClass);
  }, [selectedClass, homework]);

  const filterHomework = (homeworkList, selectedClass) => {
    const filtered = homeworkList.filter((hw) => hw.class === selectedClass);
    setFilteredHomework(filtered);
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="class-select" className="block text-gray-700 mb-2">Select Class:</label>
        <select
          id="class-select"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="xi">Class XI</option>
          <option value="xii">Class XII</option>
        </select>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredHomework.map((hw) => (
          <div key={hw.$id} className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <AcademicCapIcon className="w-10 h-10 text-blue-500 mr-4" />
              <h3 className="text-2xl font-semibold">{hw.title}</h3>
            </div>
            <p className="text-gray-700 mb-4">{hw.content}</p>
            <div className="flex items-center text-gray-600 mb-2">
              <CalendarIcon className="w-5 h-5 mr-2" />
              <span>Start Date: {new Date(hw.start_date).toLocaleString()}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <ClockIcon className="w-5 h-5 mr-2" />
              <span>Due Date: {new Date(hw.due_date).toLocaleString()}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <DocumentTextIcon className="w-5 h-5 mr-2" />
              <span>Class: {hw.class.toUpperCase()}</span>
            </div>
            {hw.file_url && (
              <a
                href={hw.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 text-white px-4 py-2 mt-4 rounded-full hover:bg-blue-600 transition-colors duration-300 flex items-center"
              >
                <PaperClipIcon className="w-5 h-5 mr-2" />
                View Attachment
              </a>
            )}
            <div className="absolute bottom-0 right-0 m-2 text-sm text-gray-400">
              <p>Student ID: {hw.student_id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeworkList;
