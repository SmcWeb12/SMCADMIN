import React, { useEffect, useState } from 'react';
import { ClockIcon, CalendarIcon, VideoCameraIcon } from '@heroicons/react/outline';

const LiveClassCard = ({ classData }) => {
  const [isClassStarted, setIsClassStarted] = useState(false);

  useEffect(() => {
    const checkClassTime = () => {
      const now = new Date();
      const classStartTime = new Date(classData.startTime);
      setIsClassStarted(now >= classStartTime);
    };

    checkClassTime();
    const interval = setInterval(checkClassTime, 1000); // Check every second
    return () => clearInterval(interval);
  }, [classData.startTime]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <img src={classData.thumbnail} alt={classData.topic} className="w-full h-40 object-cover rounded-t-lg mb-4" />
      <div className="p-4">
        <h3 className="text-2xl font-semibold mb-2">{classData.topic}</h3>
        <p className="text-gray-700 mb-4">{classData.description}</p>
        <div className="flex items-center text-gray-600 mb-2">
          <CalendarIcon className="w-5 h-5 mr-2" />
          <span>{new Date(classData.startTime).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <ClockIcon className="w-5 h-5 mr-2" />
          <span>{new Date(classData.startTime).toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <VideoCameraIcon className="w-5 h-5 mr-2" />
          <span>Class: {classData.class.toUpperCase()}</span>
        </div>
        {isClassStarted ? (
          <a
            href={classData.joinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 text-white px-4 py-2 mt-4 rounded-full hover:bg-green-600 transition-colors duration-300"
          >
            Join Now
          </a>
        ) : (
          <button
            disabled
            className="inline-block bg-gray-500 text-white px-4 py-2 mt-4 rounded-full cursor-not-allowed"
          >
            Waiting...
          </button>
        )}
      </div>
    </div>
  );
};

export default LiveClassCard;
