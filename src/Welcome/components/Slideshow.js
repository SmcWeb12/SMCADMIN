// src/components/Slideshow.js
import React, { useEffect, useState } from 'react';
import { storage } from '../../appwriteconfig';

const Slideshow = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await storage.listFiles('slideshow');
        setImages(response.files);
      } catch (error) {
        console.error('Error fetching slideshow images', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <section className="relative min-h-screen bg-black">
      <div className="absolute inset-0 flex items-center justify-center">
        {images.length > 0 ? (
          <div className="slideshow">
            {images.map((image, index) => (
              <img key={index} src={`https://cloud.appwrite.io/v1/storage/files/${image.$id}/view`} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
            ))}
          </div>
        ) : (
          <p className="text-white">Loading slideshow...</p>
        )}
      </div>
    </section>
  );
};

export default Slideshow;
