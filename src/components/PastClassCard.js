import React from 'react';
import { useNavigate } from 'react-router-dom';

const PastClassCard = ({ classData }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to a new page (e.g., class details page)
    navigate(`/pastclasses/${classData.$id}`); // Make sure to use the class ID for the specific page
  };

  const handleJoinClick = (joinLink) => {
    // Check if joinLink is a valid absolute URL
    const isAbsoluteURL = /^(https?:\/\/)/.test(joinLink);

    // If not, prepend 'https://' to the link
    const finalJoinLink = isAbsoluteURL ? joinLink : `https://${joinLink}`;

    // Open the join link in a new tab
    window.open(finalJoinLink, '_blank');
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 cursor-pointer transition-all duration-300 transform hover:scale-105"
      onClick={handleClick}
    >
      <img
        src={classData.thumbnail}
        alt={classData.topic}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-xl font-semibold mt-2">{classData.topic}</h3>
      <p>{classData.description}</p>
      <p><strong>Class Level:</strong> {classData.class}</p>
      <p><strong>Start Time:</strong> {new Date(classData.startTime).toLocaleString()}</p>

      {/* Display archivedAt when hovered */}
      <div className="text-sm text-gray-500 mt-2">
        <p><strong>Archived At:</strong> {new Date(classData.archivedAt).toLocaleString()}</p>
      </div>

      {/* Join link button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevents the click from triggering the card's navigation
          handleJoinClick(classData.joinLink);
        }}
        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        Join Class
      </button>
    </div>
  );
};

export default PastClassCard;
