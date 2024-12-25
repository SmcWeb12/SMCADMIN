// src/components/MapView.js
import React from 'react';

const MapView = () => {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Find Us</h2>
        <div className="map-container">
          {/* Embed Google Map or any map view */}
          <iframe
            src="https://maps.app.goo.gl/Jd8BNfqhU2myvy8y6"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default MapView;
