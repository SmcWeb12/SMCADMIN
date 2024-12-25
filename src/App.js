import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FaBook, FaPencilAlt } from 'react-icons/fa';
import { GiTriangleTarget } from 'react-icons/gi';
import Homework from './components/AddHomework';
import TestPaperUpload from './components/TestPaperUpload';
import Reviews from './components/Reviews';
import AdminPage from './Pages/AdminPage';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute component
import './global.css';
import Register from './components/Register';
import CreateProfile from './components/CreateProfile';
import AdminLogin from './components/Auth';
const App = () => {
  return (
    <Router>
      <div className="app">
        <div className="bubble-gradient">
          <div className="bubble" style={{ top: '30%', left: '20%' }}></div>
          <div className="bubble" style={{ top: '50%', right: '25%' }}></div>
          <div className="bubble" style={{ bottom: '30%', left: '15%' }}></div>
          <div className="icon" style={{ top: '20%', left: '40%', fontSize: '5rem' }}>
            <FaBook style={{ color: 'rgba(238, 174, 202, 0.6)' }} />
          </div>
          <div className="icon" style={{ bottom: '20%', right: '30%', fontSize: '5rem' }}>
            <FaPencilAlt style={{ color: 'rgba(148, 187, 233, 0.6)' }} />
          </div>
          <div className="icon" style={{ top: '50%', left: '70%', fontSize: '5rem' }}>
            <GiTriangleTarget style={{ color: 'rgba(144, 238, 144, 0.6)' }} />
          </div>
        </div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PrivateRoute element={AdminPage} />} />
          <Route path="/auth" element={<AdminLogin />} />
          <Route path='/register' element={<Register/>}/>

          {/* Protected Routes */}
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/homeworksend" element={<PrivateRoute element={Homework} />} />
          <Route path="/test-paper-upload" element={<PrivateRoute element={TestPaperUpload} />} />
          <Route path="/reviews" element={<PrivateRoute element={Reviews} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
