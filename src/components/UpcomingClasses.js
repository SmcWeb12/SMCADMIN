import React, { useEffect, useState } from 'react';
import { database } from '../appwriteconfig'; // Adjust the import path as needed

const UpcomingClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await database.listDocuments('classes_collection_id');
        setClasses(response.documents);
      } catch (error) {
        console.error('Failed to fetch classes', error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="upcoming-classes">
      {classes.map(classItem => (
        <div key={classItem.$id} className="class">
          <h3 className="text-xl">{classItem.title}</h3>
          <p>{classItem.description}</p>
          <p><strong>Date:</strong> {new Date(classItem.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default UpcomingClasses;
