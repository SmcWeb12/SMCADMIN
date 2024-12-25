import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { database, storage } from '../appwriteconfig'; // Adjust the import path as needed

const CreateLiveClassForm = () => {
  const [formData, setFormData] = useState({
    startTime: '',
    topic: '',
    description: '',
    thumbnail: null,
    joinLink: '',
    class: '',
  });

  const [classList, setClassList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, thumbnail: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.thumbnail) {
      alert('Please upload a thumbnail image.');
      return;
    }

    try {
      // Generate a unique ID for the thumbnail
      const fileId = uuidv4();

      // Upload the thumbnail to Appwrite storage
      const file = await storage.createFile('lic-bukket', fileId, formData.thumbnail);

      // Construct the thumbnail URL
      const thumbnailUrl = `https://cloud.appwrite.io/v1/storage/buckets/lic-bukket/files/${file.$id}/view?project=lic`; // Replace with your Appwrite project URL and project ID

      // Save the live class details in the database
      await database.createDocument('lic', 'liveClasses', uuidv4(), {
        startTime: formData.startTime,
        topic: formData.topic,
        description: formData.description,
        thumbnail: thumbnailUrl, // Store the thumbnail URL
        joinLink: formData.joinLink,
        class: formData.class,
      });

      // Reset the form after successful submission
      setFormData({
        startTime: '',
        topic: '',
        description: '',
        thumbnail: null,
        joinLink: '',
        class: '',
      });

      alert('Live class created successfully!');
      fetchClasses();
    } catch (error) {
      console.error('Failed to create live class', error);
      alert('An error occurred while creating the live class.');
    }
  };

  const fetchClasses = async () => {
    try {
      const liveClasses = await database.listDocuments('lic', 'liveClasses');
      setClassList(liveClasses.documents);
    } catch (error) {
      console.error('Failed to fetch live classes', error);
    }
  };

  const handleEndClass = async (classId) => {
    try {
      await database.deleteDocument('lic', 'liveClasses', classId);
      alert('Class ended successfully!');
      fetchClasses();
    } catch (error) {
      console.error('Failed to delete class', error);
    }
  };

  const handleSendToPastClasses = async (classId, classData) => {
    try {
      // Destructure all required fields from classData
      const { startTime, topic, description, thumbnail, joinLink, class: classLevel } = classData;

      // Create a new document in the pastClasses collection with all required data
      await database.createDocument('lic', 'pastClasses', uuidv4(), {
        startTime,
        topic,
        description,
        thumbnail,
        joinLink,
        class: classLevel,
        archivedAt: new Date().toISOString(), // Add archived date
      });

      // Delete the document from the liveClasses collection
      await database.deleteDocument('lic', 'liveClasses', classId);

      alert('Class moved to past successfully!');
      fetchClasses();
    } catch (error) {
      console.error('Failed to move class to past', error);
    }
  };

  useEffect(() => {
    fetchClasses(); // Fetch ongoing classes when the component mounts
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create Live Class</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="startTime" className="block text-gray-700 mb-2">Class Start Time</label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="topic" className="block text-gray-700 mb-2">Class Topic</label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="thumbnail" className="block text-gray-700 mb-2">Thumbnail</label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            onChange={handleFileChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="joinLink" className="block text-gray-700 mb-2">Join Link</label>
          <input
            type="text"
            id="joinLink"
            name="joinLink"
            value={formData.joinLink}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="class" className="block text-gray-700 mb-2">Class Level</label>
          <select
            id="class"
            name="class"
            value={formData.class}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="">Select Class Level</option>
            <option value="ix">IX</option>
            <option value="x">X</option>
            <option value="xi">XI</option>
            <option value="xii">XII</option>
            <option value="others">Others</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Class</button>
      </form>

      {/* Display ongoing classes */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Ongoing Classes</h3>
        <div>
          {classList.length > 0 ? (
            classList.map((classData) => (
              <div key={classData.$id} className="mb-4 p-4 border rounded">
                <h4 className="font-bold">{classData.topic}</h4>
                <p>{classData.description}</p>
                <p><strong>Start Time:</strong> {new Date(classData.startTime).toLocaleString()}</p>
                <button
                  onClick={() => handleEndClass(classData.$id)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2 mr-2"
                >
                  End Class
                </button>
                <button
                  onClick={() => handleSendToPastClasses(classData.$id, classData)}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                >
                  Send to Past
                </button>
              </div>
            ))
          ) : (
            <p>No ongoing classes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLiveClassForm;
