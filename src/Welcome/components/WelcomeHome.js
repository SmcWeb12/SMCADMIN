// src/pages/Homepage.js
import React from 'react';
import Header from './Header';
import Welcome from './Welcome';
import Courses from './Courses';
import Teachers from './Teachers';
import Slideshow from './Slideshow';
import MapView from './MapView';
import Footer from './Footer';
import Reviews from './Review';

const WelcomeHomepage = () => {
  return (
    <div>
      {/* Header and Navbar */}
      <Header />

      {/* Welcome Section */}
      <Welcome />

      {/* Courses Details */}
      <Courses />

      {/* Teachers Details */}
      <Teachers />

      {/* Full-Screen Slideshow */}
      <Slideshow />

      {/* Map View */}
      <MapView />

      {/* Reviews Section */}
      <Reviews />

      {/* Footer with Social Links */}
      <Footer />
    </div>
  );
};

export default WelcomeHomepage;
