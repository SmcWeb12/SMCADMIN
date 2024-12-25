// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">SMC GODDA</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#welcome" className="hover:underline">Welcome</a></li>
            <li><a href="#courses" className="hover:underline">Courses</a></li>
            <li><a href="#teachers" className="hover:underline">Teachers</a></li>
            <li><a href="#reviews" className="hover:underline">Reviews</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
