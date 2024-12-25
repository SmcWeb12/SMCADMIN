import React, { useState, useEffect } from 'react';
import { storage, database } from '../appwriteconfig'; // Adjust the import path as needed
import { v4 as uuidv4 } from 'uuid';

const AddCourse = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [duration, setDuration] = useState('');
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await database.listDocuments('lic', 'courses');
        setCourses(response.documents);
      } catch (error) {
        console.error('Failed to fetch courses', error);
      }
    };
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!thumbnail) {
      setMessage('Please upload a thumbnail image.');
      return;
    }

    setLoading(true);

    try {
      const fileId = uuidv4();
      const response = await storage.createFile('lic-bukket', fileId, thumbnail);
      const thumbnailUrl = `https://cloud.appwrite.io/v1/storage/buckets/lic-bukket/files/${response.$id}/view?project=lic`;

      await database.createDocument('lic', 'courses', uuidv4(), {
        name,
        description,
        price,
        thumbnail: thumbnailUrl,
        duration,
        author,
      });

      setMessage('Course added successfully!');
      setShowSuccessPopup(true);

      const updatedCourses = await database.listDocuments('lic', 'courses');
      setCourses(updatedCourses.documents);

      setName('');
      setDescription('');
      setPrice('');
      setThumbnail(null);
      setDuration('');
      setAuthor('');
    } catch (error) {
      console.error('Failed to add course', error);
      setMessage('Failed to add course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleDelete = async (courseId) => {
    setLoading(true);
    try {
      await database.deleteDocument('lic', 'courses', courseId);
      setCourses(courses.filter((course) => course.$id !== courseId));
    } catch (error) {
      console.error('Failed to delete course', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (courseId) => {
    // Implement the editing logic (can be used to populate the form for editing)
  };

  return (
    <div className="p-8 bg-white h-full overflow-y-auto">
      <h2 className="text-3xl font-bold mb-6">Add New Course</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700">Course Name</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Thumbnail</label>
          <input
            type="file"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Duration</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Author</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Add Course'}
        </button>
        {message && <p className="mt-4 text-gray-700">{message}</p>}
      </form>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Courses</h2>
      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.$id} className="border p-4 rounded-lg">
            <h3 className="text-xl font-semibold">{course.name}</h3>
            <p>{course.description}</p>
            <p>
              <strong>Price:</strong> ₹{course.price}
            </p>
            <p>
              <strong>Duration:</strong> {course.duration}
            </p>
            <p>
              <strong>Author:</strong> {course.author}
            </p>
            <div className="mt-4">
              <button
                onClick={() => handleEdit(course.$id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(course.$id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCourse;
