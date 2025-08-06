import React, { useState } from 'react';

const RegisterPage = ({ onRegister, onNavigate, isLoading, showToast }) => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!username || !email || !password) {
        showToast('Please fill in all fields: username, email, and password.', 'error');
        return;
      }
      onRegister(name,username, email, password);
    };

    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md md:max-w-xl lg:max-w-2xl border border-gray-700">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Join Buzz</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="shadow-sm appearance-none border border-gray-600 bg-gray-700 text-white rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="shadow-sm appearance-none border border-gray-600 bg-gray-700 text-white rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="JohnDoe123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="shadow-sm appearance-none border border-gray-600 bg-gray-700 text-white rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="your@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="shadow-sm appearance-none border border-gray-600 bg-gray-700 text-white rounded-lg w-full py-3 px-4 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105 shadow-md w-full sm:w-auto"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 'Register'}
              </button>
              <button
                type="button"
                className="inline-block align-baseline font-bold text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 w-full sm:w-auto"
                onClick={() => onNavigate('login')}
                disabled={isLoading}
              >
                Already have an account? Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
export default RegisterPage;