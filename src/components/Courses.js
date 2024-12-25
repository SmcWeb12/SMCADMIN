import React, { useEffect, useState } from 'react';
import { database } from '../appwriteconfig';
import { motion } from 'framer-motion';
import { InformationCircleIcon } from '@heroicons/react/outline';
import CourseDetailsModal from './CourseDetailsModal';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await database.listDocuments('lic', 'courses');
        console.log(response.documents); // Log the fetched courses to check data structure
        setCourses(response.documents);
      } catch (error) {
        console.error('Failed to fetch courses', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="relative flex space-x-4 overflow-x-auto py-4">
      {courses.map((course) => (
        <motion.div 
          key={course.$id} 
          className="course relative bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer min-w-[250px] flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedCourse(course)}
        >
          <img src={course.thumbnail} alt={course.name} className="w-full h-40 object-cover rounded-t-lg mb-4" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
            <p className="text-gray-700 mb-4">{course.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-green-500 font-bold">Price: ₹{course.price}</p>
              <p className="text-gray-600 text-sm">Duration: {course.duration}</p>
            </div>
            <p className="text-gray-600 text-sm">Instructor: {course.author}</p>
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 flex justify-center items-center rounded-lg transition-opacity duration-300">
            <div className="text-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <InformationCircleIcon className="w-10 h-10 text-white mb-2" />
              <span className="text-white text-lg font-bold">Click to know more</span>
            </div>
          </div>
        </motion.div>
      ))}
      {selectedCourse && (
        <CourseDetailsModal 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}
    </div>
  );
};

export default Courses;
