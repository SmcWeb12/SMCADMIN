import React, { useState } from 'react';
import { account } from '../appwriteconfig'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLock } from 'react-icons/fa'; // Icons for username and password

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // Initially show Register
  const navigate = useNavigate(); // To navigate after successful login

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // If it's a registration, create the user and log them in immediately
      if (!isLogin) {
        if (password !== confirmPassword) {
          setErrorMessage('Passwords do not match!');
          return;
        }

        // Step 1: Register the user with the provided details
        await account.create(userId, email, password, name);

        // Step 2: Log the user in automatically after registration
        await account.createEmailPasswordSession(email, password);

        // Redirect to the home page after successful login
        navigate('/create-profile');
      } else {
        // If it's login, just create a session
        await account.createEmailPasswordSession(email, password);
        navigate('/create-profile'); // Redirect to homepage after login
      }
    } catch (error) {
      setErrorMessage(error.message || 'Authentication error');
      console.error('Authentication error', error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0">
        {/* Background with animated shapes */}
        <div className="absolute top-0 left-0 w-full h-full bg-transparent pointer-events-none">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      {/* Header */}
      <header className="absolute top-4 w-full text-center z-10">
        <h1 className="text-4xl font-bold text-white">SMC GODDA</h1>
        <p className="text-lg text-white mt-2">Empowering Education for All</p>
      </header>

      <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        {/* Login/Register Form */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-blue-600">{isLogin ? 'Login' : 'Register'}</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
              <div>
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                  <FaUserAlt className="inline-block mr-2" /> User ID
                </label>
                <input
                  id="userId"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your custom user ID"
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  <FaUserAlt className="inline-block mr-2" /> Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              <FaUserAlt className="inline-block mr-2" /> Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              <FaLock className="inline-block mr-2" /> Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-blue-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
              />
            </div>
          )}

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <div>
            <button type="submit" className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              {isLogin ? 'Login' : 'Register'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500 text-sm">
            {isLogin ? 'Need to register?' : 'Already have an account?'}
          </button>
        </div>

        {/* New section for SMC GODDA features */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-blue-600 text-center mb-4">Join SMC GODDA</h3>
          <p className="text-center text-gray-700 mb-4">
            By joining SMC GODDA, you will have access to a variety of features including:
          </p>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>💻 Live Classes with expert instructors</li>
            <li>📚 Wide range of Courses & PDFs</li>
            <li>📝 Regular Tests and Quizzes</li>
            <li>🎓 Personalized Student Profiles</li>
            <li>📅 Events & Upcoming Classes</li>
          </ul>
          <p className="text-center text-blue-500 mt-4">And much more! Start your learning journey today!</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
