import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Feed from './components/Feed';
import Issues from './components/Issues';
import Explore from './components/Explore';
import CreatePostModal from './components/CreatePostModal';
import CreateIssueModal from './components/CreateIssueModal';
import ToastNotification from './components/ToastNotification';
import axios from 'axios';
import ProfilePage from './pages/ProfilePage';

const BASE_API_URL = 'http://localhost:5000/api';

// Main App Component with Router
const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'like', user: 'John Doe', content: 'liked your post', time: '5 minutes ago', read: false },
    { id: 2, type: 'comment', user: 'Jane Smith', content: 'commented on your issue', time: '15 minutes ago', read: false },
    { id: 3, type: 'follow', user: 'Alex Chen', content: 'started following you', time: '1 hour ago', read: true }
  ]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // Mock login for demonstration
  useEffect(() => {
    // Simulate user login
    setCurrentUser({
      id: 1,
      username: 'johndoe',
      email: 'john@example.com'
    });
  }, []);

  const onLogout = () => {
    setCurrentUser(null);
    // Navigate to login page or home
  };

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <Router>
      <AppContent 
        currentUser={currentUser} 
        onLogout={onLogout}
        notifications={notifications}
        setNotifications={setNotifications}
        showToast={showToast}
        toastMessage={toastMessage}
        toastType={toastType}
        showToastMessage={showToastMessage}
      />
    </Router>
  );
};

// Main Content Component
const AppContent = ({ 
  currentUser, 
  onLogout, 
  notifications, 
  setNotifications,
  showToast,
  toastMessage,
  toastType,
  showToastMessage
}) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [issues, setIssues] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newIssue, setNewIssue] = useState({ title: '', description: '', category: 'Bug', tags: '' });
  const [postsLoading, setPostsLoading] = useState(true);
  const [issuesLoading, setIssuesLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showCreateIssueModal, setShowCreateIssueModal] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setPostsLoading(true);
      try {
        console.log(`Fetching posts from: ${BASE_API_URL}/posts`);
        const response = await axios.get(`${BASE_API_URL}/posts`);
        const formattedPosts = response.data.map(post => ({
          ...post,
          timestamp: new Date(post.timestamp).toLocaleString()
        }));
        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        showToastMessage("Error loading posts.", "error");
      } finally {
        setPostsLoading(false);
      }
    };

    const fetchIssues = async () => {
      setIssuesLoading(true);
      try {
        console.log(`Fetching issues from: ${BASE_API_URL}/issues`);
        const response = await axios.get(`${BASE_API_URL}/issues`);
        const formattedIssues = response.data.map(issue => ({
          ...issue,
          createdAt: new Date(issue.createdAt).toLocaleString()
        }));
        setIssues(formattedIssues);
      } catch (error) {
        console.error("Error fetching issues:", error);
        showToastMessage("Error loading issues.", "error");
      } finally {
        setIssuesLoading(false);
      }
    };

    if (currentUser) {
      fetchPosts();
      fetchIssues();
    }
  }, [currentUser, showToastMessage]);

  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handlePost = async () => {
    if (newPost.trim()) {
      setLoading(true);
      try {
        console.log(`Submitting new post to: ${BASE_API_URL}/posts`);
        const response = await axios.post(`${BASE_API_URL}/posts`, {
          content: newPost,
        });
        const addedPost = { ...response.data.post, timestamp: new Date(response.data.post.timestamp).toLocaleString() };
        setPosts([addedPost, ...posts]);
        setNewPost('');
        setShowCreatePostModal(false);
        showToastMessage('Post created successfully!', 'success');
      } catch (error) {
        console.error("Error creating post:", error);
        showToastMessage(error.response?.data?.message || 'Failed to create post.', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCreateIssue = async () => {
    if (newIssue.title.trim() && newIssue.description.trim()) {
      setLoading(true);
      try {
        console.log(`Submitting new issue to: ${BASE_API_URL}/issues`);
        const response = await axios.post(`${BASE_API_URL}/issues`, {
          title: newIssue.title,
          description: newIssue.description,
          category: newIssue.category,
          tags: newIssue.tags.map(tag => tag.trim()).filter(tag => tag),
        });
        const addedIssue = { ...response.data.issue, createdAt: new Date(response.data.issue.createdAt).toLocaleString() };
        setIssues([addedIssue, ...issues]);
        setNewIssue({ title: '', description: '', category: 'Bug', tags: '' });
        setShowCreateIssueModal(false);
        showToastMessage('Issue created successfully!', 'success');
      } catch (error) {
        console.error("Error creating issue:", error);
        showToastMessage(error.response?.data?.message || 'Failed to create issue.', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    showToastMessage('All notifications marked as read', 'info');
  };

  const mobileNavItems = [
    { id: 'feed', label: 'Feed', path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'issues', label: 'Issues', path: '/issues', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
    { id: 'explore', label: 'Explore', path: '/explore', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    { id: 'notifications', label: 'Notifications', path: '/notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.0 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
    { id: 'profile', label: 'Profile', path: '/profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-black border-b border-gray-800 px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Buzz
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-lg transition-all duration-200 ${window.location.pathname === '/' 
                  ? 'bg-gray-800 text-white font-medium scale-105' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                Feed
              </Link>
              <Link 
                to="/issues" 
                className={`px-3 py-2 rounded-lg transition-all duration-200 ${window.location.pathname === '/issues' 
                  ? 'bg-gray-800 text-white font-medium scale-105' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                Issues
              </Link>
              <Link 
                to="/explore" 
                className={`px-3 py-2 rounded-lg transition-all duration-200 ${window.location.pathname === '/explore' 
                  ? 'bg-gray-800 text-white font-medium scale-105' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                Explore
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => navigate('/notifications')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 md:h-6 w-5 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.0 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {notifications.some(n => !n.read) && (
                <span className="absolute -top-1 -right-1 h-3 w-3 md:h-4 md:w-4 bg-red-500 rounded-full"></span>
              )}
            </motion.button>
            <div className="flex items-center space-x-2">
              <img src="https://placehold.co/32x32" alt="Profile" className="h-7 md:h-8 w-7 md:w-8 rounded-full" />
              <span className="hidden md:inline text-sm md:text-base">{currentUser?.username || 'Guest'}</span>
              {currentUser && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onLogout}
                  className="ml-4 bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg text-sm transition duration-200 ease-in-out"
                >
                  Logout
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-72 lg:w-80 border-r border-gray-800 min-h-screen p-4 md:p-6 hidden lg:block">
          <div className="space-y-4">
            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-xl p-4 md:p-6">
              <h3 className="font-semibold mb-4 text-sm md:text-base">Quick Actions</h3>
              <div className="space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCreatePostModal(true)}
                  className="w-full text-left px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-sm md:text-base"
                >
                  New Post
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCreateIssueModal(true)}
                  className="w-full text-left px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm md:text-base"
                >
                  New Issue
                </motion.button>
              </div>
            </div>
            {/* Trending Tags */}
            <div className="bg-gray-800 rounded-xl p-4 md:p-6">
              <h3 className="font-semibold mb-4 text-sm md:text-base">Trending Tags</h3>
              <div className="flex flex-wrap gap-1 md:gap-2">
                {['#javascript', '#react', '#nodejs', '#python', '#ai', '#webdev', '#mobile', '#devops'].map(tag => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    className="px-2 py-1 md:px-3 md:py-1 bg-gray-700 rounded-full text-xs md:text-sm hover:bg-gray-600 cursor-pointer transition-colors"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
            {/* Stats */}
            <div className="bg-gray-800 rounded-xl p-4 md:p-6">
              <h3 className="font-semibold mb-4 text-sm md:text-base">Your Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-400">Posts</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-400">Issues Created</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-400">Comments</span>
                  <span className="font-semibold">42</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-400">Followers</span>
                  <span className="font-semibold">156</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pb-16 lg:pb-6">
          {/* Create Post Modal */}
          <AnimatePresence>
            {showCreatePostModal && (
              <CreatePostModal
                newPost={newPost}
                setNewPost={setNewPost}
                handlePost={handlePost}
                loading={loading}
                setShowCreatePostModal={setShowCreatePostModal}
              />
            )}
          </AnimatePresence>
          
          {/* Create Issue Modal */}
          <AnimatePresence>
            {showCreateIssueModal && (
              <CreateIssueModal
                newIssue={newIssue}
                setNewIssue={setNewIssue}
                handleCreateIssue={handleCreateIssue}
                loading={loading}
                setShowCreateIssueModal={setShowCreateIssueModal}
              />
            )}
          </AnimatePresence>

          {/* Routes */}
          <Routes>
            <Route 
              path="/" 
              element={
                <Feed
                  posts={posts}
                  handleLike={handleLike}
                  setShowCreatePostModal={setShowCreatePostModal}
                />
              } 
            />
            <Route 
              path="/issues" 
              element={
                <Issues
                  issues={issues}
                  setShowCreateIssueModal={setShowCreateIssueModal}
                />
              } 
            />
            <Route 
              path="/explore" 
              element={
                <Explore posts={posts} issues={issues} />
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProfilePage currentUser={currentUser} onLogout={onLogout} />
              } 
            />
            <Route 
              path="/notifications" 
              element={
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Notifications</h2>
                    {!notifications.every(n => n.read) && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={markAllRead}
                        className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        Mark all read
                      </motion.button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        whileHover={{ scale: 1.01 }}
                        className={`p-4 rounded-xl transition-colors ${notification.read ? 'bg-gray-800' : 'bg-purple-900 bg-opacity-20 border border-purple-800'
                          }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`h-2 w-2 rounded-full ${notification.read ? 'invisible' : 'bg-purple-400'}`}></div>
                          <div className="flex-1">
                            <p className="font-medium">{notification.user}</p>
                            <p className="text-sm text-gray-300">{notification.content}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              } 
            />
          </Routes>
        </main>

        {/* Right Sidebar */}
        <aside className="w-72 lg:w-80 p-4 md:p-6 hidden lg:block">
          {/* Notifications Preview */}
          <div className="bg-gray-800 rounded-xl p-4 md:p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm md:text-base">Notifications</h3>
              {!notifications.every(n => n.read) && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={markAllRead}
                  className="text-xs md:text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Mark all read
                </motion.button>
              )}
            </div>
            <div className="space-y-2">
              {notifications.slice(0, 5).map((notification) => (
                <motion.div
                  key={notification.id}
                  whileHover={{ scale: 1.01 }}
                  className={`p-3 rounded-lg transition-colors cursor-pointer ${notification.read ? 'bg-gray-700' : 'bg-purple-900 bg-opacity-20 border border-purple-800'
                    }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`h-2 w-2 rounded-full ${notification.read ? 'invisible' : 'bg-purple-400'}`}></div>
                    <span className="font-medium text-sm">{notification.user}</span>
                    <span className="text-sm">{notification.content}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                </motion.div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate('/notifications')}
              className="w-full text-center py-2 text-purple-400 hover:text-purple-300 text-xs md:text-sm mt-3"
            >
              View all notifications
            </motion.button>
          </div>
        </aside>
      </div>

      {/* Toast Notification */}
      <ToastNotification
        showToast={showToast}
        toastType={toastType}
        toastMessage={toastMessage}
      />

      {/* Mobile Bottom Navigation */}
      <BottomNav mobileNavItems={mobileNavItems} navigate={navigate} currentPath={window.location.pathname} />
    </div>
  );
};

export default App;