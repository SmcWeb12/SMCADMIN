// src/components/Footer.js
import React, { useEffect, useState } from 'react';
import { database } from '../../appwriteconfig';

const Footer = () => {
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await database.listDocuments('lic', 'socialLinks');
        setSocialLinks(response.documents);
      } catch (error) {
        console.error('Error fetching social links', error);
      }
    };

    fetchSocialLinks();
  }, []);

  return (
    <footer className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-6">
      <div className="container mx-auto text-center">
        <h3 className="text-lg font-bold mb-4">Connect with us</h3>
        <div className="flex justify-center space-x-4">
          {socialLinks.map((link, index) => (
            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <i className={`fab fa-${link.icon}`}></i>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
