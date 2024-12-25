// src/components/Reviews.js
import React, { useEffect, useState } from 'react';
import { database } from '../../appwriteconfig';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await database.listDocuments('lic', 'reviews');
        setReviews(response.documents);
      } catch (error) {
        console.error('Error fetching reviews', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section id="reviews" className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">{review.name}</h3>
              <p className="text-gray-700 mb-4">{review.message}</p>
              <div className="flex">
                {[...Array(5)].map((star, i) => (
                  <i key={i} className={`fas fa-star ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}></i>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
