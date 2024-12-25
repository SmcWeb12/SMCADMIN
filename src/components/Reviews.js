import React, { useState } from 'react';
import { database } from '../appwriteconfig'; // Adjust the import path as needed

const Reviews = () => {
  const [review, setReview] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await database.createDocument('lic', 'reviews', 'unique()', {
        content: review,
        rating: 5, // Example rating, replace with actual rating
        student_id: 'student_id_example' // Replace with actual student ID
      });
      setReview(''); // Clear the textarea after submission
    } catch (error) {
      console.error('Failed to submit review', error);
    }
  };

  return (
    <div className="reviews">
      <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="border p-2 w-full"
          placeholder="Enter your review"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-2">
          Send Review
        </button>
      </form>
    </div>
  );
};

export default Reviews;
