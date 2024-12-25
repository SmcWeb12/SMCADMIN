import React from 'react';
import { motion } from 'framer-motion';
import { XIcon, ArrowLeftIcon } from '@heroicons/react/outline';

const CourseDetailsModal = ({ course, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-start justify-center pt-16">
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-4 lg:mx-8 relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute top-0 left-0 w-full bg-white flex justify-between items-center p-4 border-b border-gray-200">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 flex items-center">
            <ArrowLeftIcon className="w-6 h-6 mr-1" />
            Go Back
          </button>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="lg:flex lg:space-x-6 mt-16">
          <img src={course.thumbnail} alt={course.name} className="w-full lg:w-1/2 h-64 lg:h-auto object-cover rounded-lg mb-4 lg:mb-0" />
          <div className="flex-1">
            <h3 className="text-3xl font-bold mb-2 text-gray-900">{course.name}</h3>
            <p className="text-gray-700 mb-4">{course.description}</p>
            <p className="text-gray-600 mb-2"><strong>Duration:</strong> {course.duration}</p>
            <p className="text-gray-600 mb-2"><strong>Author:</strong> {course.author}</p>
            <p className="text-green-500 font-bold mb-6 text-xl">Price: ₹{course.price}</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300 w-full lg:w-auto lg:px-6 lg:py-3 text-lg">
              Buy Now
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseDetailsModal;
