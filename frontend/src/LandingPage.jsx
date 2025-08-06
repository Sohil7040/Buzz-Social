import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { motion, AnimatePresence } from 'framer-motion'; // '; // Import the Dashboard component
import App2 from './App2.jsx';
import App from './App.jsx';
import LoginPage from './pages/LoginPage.jsx'; // Import the LoginPage component
import RegisterPage from './pages/RegisterPage.jsx'; // Import the RegisterPage component
// --- Configuration ---
// IMPORTANT: Make sure this matches the port your Node.js server is running on.
// If your frontend is served from a different origin (e.g., React Dev Server on 3000, Node.js on 5000),
// you will need to enable CORS on your Node.js backend.
const BASE_API_URL = 'http://localhost:5000/api';

// Configure Axios to send cookies with every request
axios.defaults.withCredentials = true;


// --- Authentication & Root Component (App2 is now the main entry point) ---
const LandingPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const showToastGlobal = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true);
      try {
        console.log(`Attempting to connect to: ${BASE_API_URL}/user`);
        const response = await axios.get(`${BASE_API_URL}/user`);
        setCurrentUser(response.data.user);
        showToastGlobal(`Welcome back, ${response.data.user.username}!`, 'success');
        setCurrentPage('dashboard'); // Redirect to dashboard after successful session check
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setCurrentUser(null);
          setCurrentPage('landing'); // Ensure we are on landing if not authenticated
        } else {
          console.error('Session check error:', error);
          showToastGlobal('Could not connect to server for session check or an unexpected error occurred.', 'error');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    try {
      console.log(`Attempting login to: ${BASE_API_URL}/login`);
      const response = await axios.post(`${BASE_API_URL}/login`, { email, password });
      setCurrentUser(response.data.user);
      setCurrentPage('dashboard'); // Redirect to dashboard after successful login
      showToastGlobal('Logged in successfully!', 'success');
    } catch (error) {
      console.error('Login API error:', error);
      showToastGlobal(error.response?.data?.message || 'Login failed. Please check your credentials.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (name,username, email, password) => {
    setIsLoading(true);
    try {
      console.log(`Attempting registration to: ${BASE_API_URL}/signup`);
      const response = await axios.post(`${BASE_API_URL}/signup`, { name,username, email, password });
      showToastGlobal('Registration successful! Please log in.', 'success');
      setCurrentPage('login');
    } catch (error) {
      console.error('Register API error:', error);
      showToastGlobal(error.response?.data?.message || 'Registration failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      console.log(`Attempting logout from: ${BASE_API_URL}/logout`);
      await axios.post(`${BASE_API_URL}/logout`);
      setCurrentUser(null);
      setCurrentPage('landing'); // Go back to landing page after logout
      showToastGlobal('Logged out successfully!', 'success');
    } catch (error) {
      console.error('Logout API error:', error);
      showToastGlobal(error.response?.data?.message || 'Logout failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Toast Component (Global)
  const GlobalToast = ({ message, type, show }) => {
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    const textColor = 'text-white';
    const animationClass = show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full';

    return (
      <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-lg ${bgColor} ${textColor} transition-all duration-300 ease-out z-50 ${animationClass}`}>
        {message}
      </div>
    );
  };

  // Login Page Component
  

  // Register Page Component
  

  // Landing Page Component
  const LandingPage = ({ onNavigate, currentUser, onLogout }) => {
    return (
      <div className="min-h-screen bg-gray-900 text-white font-inter flex flex-col">
        {/* Navbar for Landing Page only */}
        <nav className="bg-gray-900 p-4 shadow-md rounded-b-lg text-white">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zM12 7a1 1 0 00-1 1v3H8a1 1 0 000 2h3v3a1 1 0 002 0v-3h3a1 1 0 000-2h-3V8a1 1 0 00-1-1z"/>
              </svg>
              <h1 className="text-2xl font-bold cursor-pointer" onClick={() => onNavigate('landing')}>Buzz</h1>
            </div>
            <div className="flex space-x-4 items-center">
              {currentUser ? (
                <>
                  <span className="text-gray-300">Welcome, {currentUser.username}!</span>
                  <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-md" onClick={onLogout}>Logout</button>
                </>
              ) : (
                <>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-md" onClick={() => onNavigate('login')}>Sign In</button>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-md" onClick={() => onNavigate('register')}>Join Buzz</button>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden flex-grow flex items-center justify-center">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
              <h2 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Connect, Share, Build <span className="text-purple-400">Together</span>
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-md mx-auto md:mx-0">
                Join the premier platform where developers collaborate, share knowledge, and solve problems together. From quick updates to complex Issue tracking.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
                {!currentUser && ( // Only show if not logged in
                  <button
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-lg"
                    onClick={() => onNavigate('register')}
                  >
                    Get Started Free →
                  </button>
                )}
                <button
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.47.087.683-.207.683-.466 0-.233-.007-.866-.012-1.699-2.782.602-3.37-1.34-3.37-1.34-.454-1.156-1.11-1.464-1.11-1.464-.907-.62.068-.608.068-.608 1.007.07 1.532 1.03 1.532 1.03.89 1.528 2.336 1.088 2.902.83.09-.645.35-1.088.636-1.338-2.22-.25-4.555-1.11-4.555-4.943 0-1.09.39-1.984 1.03-2.682-.104-.25-.448-1.27.098-2.65 0 0 .84-.27 2.75 1.025.798-.222 1.649-.333 2.5-.337.85.004 1.7.115 2.5.337 1.91-1.295 2.75-1.025 2.75-1.025.546 1.38.202 2.4.098 2.65.64.698 1.03 1.592 1.03 2.682 0 3.843-2.339 4.688-4.566 4.935.359.308.678.917.678 1.846 0 1.335-.012 2.415-.012 2.74 0 .26.212.557.687.465C21.137 20.207 24 16.453 24 12.017 24 6.484 19.522 2 14 2h-2z" clipRule="evenodd" /></svg>
                  Sign in with Github
                </button>
              </div>
              <div className="flex justify-center md:justify-start space-x-8 text-gray-300">
                <div>
                  <p className="text-3xl font-bold text-purple-400">10K+</p>
                  <p className="text-sm">Developers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-purple-400">50K+</p>
                  <p className="text-sm">Posts</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-purple-400">5K+</p>
                  <p className="text-sm">Issues Solved</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://placehold.co/500x350/1f2937/a855f7?text=Collaborate" // Placeholder for the image
                alt="Collaboration illustration"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-900">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-12">Everything You Need to Collaborate</h2>
            <p className="text-lg text-gray-300 mb-16 max-w-2xl mx-auto">
              Powerful features designed to help developers connect, share knowledge, and build amazing things together.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Social Posts Card */}
              <div className="bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-2xl">
                <div className="flex justify-center mb-6">
                  <div className="bg-blue-600 p-4 rounded-full">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Social Posts</h3>
                <p className="text-gray-300">Share updates, thoughts, and questions with the developer community. Support for markdown and hashtags.</p>
              </div>

              {/* Issue Tracker Card */}
              <div className="bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-2xl">
                <div className="flex justify-center mb-6">
                  <div className="bg-pink-600 p-4 rounded-full">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Issue Tracker</h3>
                <p className="text-gray-300">Create and collaborate on bugs, feature requests, and questions. Track progress with status updates.</p>
              </div>

              {/* Developer Profiles Card */}
              <div className="bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-2xl">
                <div className="flex justify-center mb-6">
                  <div className="bg-green-600 p-4 rounded-full">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Developer Profiles</h3>
                <p className="text-gray-300">Build your developer profile with skills, links, and contributions. Follow other developers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-800 text-center">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Join Buzz?</h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Become part of a thriving community of developers. Sign up today and start collaborating on exciting projects, sharing insights, and growing your skills.
            </p>
            {!currentUser && ( // Only show if not logged in
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-10 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-xl text-lg"
                onClick={() => onNavigate('register')}
              >
                Sign Up Now
              </button>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-950 py-8 px-4 md:px-8 text-gray-400 text-center text-sm">
          <div className="container mx-auto">
            <p>&copy; 2025 Buzz. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-4">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Contact Us</a>
            </div>
          </div>
        </footer>
      </div>
    );
  };

  // Render the appropriate page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigate={setCurrentPage} isLoading={isLoading} showToast={showToastGlobal} />;
      case 'register':
        return <RegisterPage onRegister={handleRegister} onNavigate={setCurrentPage} isLoading={isLoading} showToast={showToastGlobal} />;
      case 'dashboard':
        return <App currentUser={currentUser} onLogout={handleLogout} />;
      case 'landing':
      default:
        return <LandingPage onNavigate={setCurrentPage} currentUser={currentUser} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="App2">
      {renderPage()}
      <GlobalToast message={toast.message} type={toast.type} show={toast.show} />
    </div>
  );
};

export default LandingPage;
