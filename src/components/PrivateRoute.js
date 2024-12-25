import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { account } from '../appwriteconfig'; // Adjust the import path as needed

const PrivateRoute = ({ element: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Tracks auth status
  const [isLoading, setIsLoading] = useState(true); // Tracks loading state

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.getSession('current'); // Check session
        setIsAuthenticated(!!session); // Set true if session exists
      } catch (error) {
        setIsAuthenticated(false); // Set false if session check fails
      } finally {
        setIsLoading(false); // Stop loading after session check
      }
    };

    checkSession();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>; // Show loading indicator
  }

  return isAuthenticated ? (
    <Component {...rest} /> // Render the component if authenticated
  ) : (
    <Navigate to="/auth" replace /> // Redirect to login page if not authenticated
  );
};

export default PrivateRoute;
