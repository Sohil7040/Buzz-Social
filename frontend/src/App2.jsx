import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const App2 = ({ currentUser, onLogout }) => {
    const [activeTab, setActiveTab] = useState('feed');
    const [posts, setPosts] = useState([])
    const [issues, setIssues] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [newIssue, setNewIssue] = useState({ title: '', description: '', category: 'Bug', tags: '' });
    const [postsLoading, setPostsLoading] = useState(true);
    const [issuesLoading, setIssuesLoading] = useState(true);

    useEffect(() => {
        // Function to fetch posts from the backend API.
        const fetchPosts = async () => {
            setPostsLoading(true); // Set loading state to true before fetching.
            try {
                console.log(`Fetching posts from: ${BASE_API_URL}/posts`);
                const response = await axios.get(`${BASE_API_URL}/posts`);
                // Format timestamp for display. MongoDB stores dates as ISO strings.
                const formattedPosts = response.data.map(post => ({
                    ...post,
                    timestamp: new Date(post.timestamp).toLocaleString() // Convert ISO string to local date/time string.
                }));
                setPosts(formattedPosts); // Update posts state with fetched data.
            } catch (error) {
                console.error("Error fetching posts:", error);
                showToast("Error loading posts.", "error"); // Show error toast.
            } finally {
                setPostsLoading(false); // Set loading state to false after fetching (success or error).
            }
        };

        // Function to fetch issues from the backend API.
        const fetchIssues = async () => {
            setIssuesLoading(true); // Set loading state to true before fetching.
            try {
                console.log(`Fetching issues from: ${BASE_API_URL}/issues`);
                const response = await axios.get(`${BASE_API_URL}/issues`);
                // Format createdAt for display.
                const formattedIssues = response.data.map(issue => ({
                    ...issue,
                    createdAt: new Date(issue.createdAt).toLocaleString() // Convert ISO string to local date/time string.
                }));
                setIssues(formattedIssues); // Update issues state with fetched data.
            } catch (error) {
                console.error("Error fetching issues:", error);
                showToast("Error loading issues.", "error"); // Show error toast.
            } finally {
                setIssuesLoading(false); // Set loading state to false after fetching.
            }
        };

        // Only fetch data if currentUser is available, indicating the user is authenticated.
        if (currentUser) {
            fetchPosts();
            fetchIssues();
        }
    }, [currentUser]);

    const [notifications, setNotifications] = useState([
        { id: 1, type: 'like', user: 'John Doe', content: 'liked your post', time: '5 minutes ago', read: false },
        { id: 2, type: 'comment', user: 'Jane Smith', content: 'commented on your issue', time: '15 minutes ago', read: false },
        { id: 3, type: 'follow', user: 'Alex Chen', content: 'started following you', time: '1 hour ago', read: true }
    ]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [loading, setLoading] = useState(false);
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const [showCreateIssueModal, setShowCreateIssueModal] = useState(false);

    const showToastMessage = (message, type = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleLike = (postId) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
                : post
        ));
    };

    const handlePost = async () => {
    if (newPost.trim()) {
      setLoading(true); // Set loading state for the button.
      try {
        console.log(`Submitting new post to: ${BASE_API_URL}/posts`);
        // Send post content to the backend. Backend will add userId, username, timestamp.
        const response = await axios.post(`${BASE_API_URL}/posts`, {
          content: newPost,
          // media: [] // Placeholder for media data if you implement media uploads.
        });
        // The backend returns the full new post object, including its MongoDB _id and server-generated timestamp.
        // Format the timestamp for display before adding to local state.
        const addedPost = { ...response.data.post, timestamp: new Date(response.data.post.timestamp).toLocaleString() };
        setPosts([addedPost, ...posts]); // Add the new post to the beginning of the local posts list.
        setNewPost(''); // Clear the input field.
        setShowCreatePostModal(false); // Close the modal.
        showToast('Post created successfully!', 'success'); // Show success toast.
      } catch (error) {
        console.error("Error creating post:", error);
        showToast(error.response?.data?.message || 'Failed to create post.', 'error'); // Show error toast.
      } finally {
        setLoading(false); // Reset loading state.
      }
    }
  };

  // Handles submitting a new issue to the Node.js backend.
  const handleCreateIssue = async () => {
    if (newIssue.title.trim() && newIssue.description.trim()) {
      setLoading(true); // Set loading state for the button.
      try {
        console.log(`Submitting new issue to: ${BASE_API_URL}/issues`);
        // Send issue details to the backend. Backend will add userId, username, createdAt.
        const response = await axios.post(`${BASE_API_URL}/issues`, {
          title: newIssue.title,
          description: newIssue.description,
          category: newIssue.category,
          // Convert tags string (comma-separated) into an array of trimmed strings.
          tags: newIssue.tags.map(tag => tag.trim()).filter(tag => tag), 
          // media: [] // Placeholder for media data if you implement media uploads.
        });
        // The backend returns the full new issue object.
        // Format the createdAt timestamp for display.
        const addedIssue = { ...response.data.issue, createdAt: new Date(response.data.issue.createdAt).toLocaleString() };
        setIssues([addedIssue, ...issues]); // Add the new issue to the beginning of the local issues list.
        setNewIssue({ title: '', description: '', category: 'Bug', tags: '' }); // Reset form fields.
        setShowCreateIssueModal(false); // Close the modal.
        showToast('Issue created successfully!', 'success'); // Show success toast.
      } catch (error) {
        console.error("Error creating issue:", error);
        showToast(error.response?.data?.message || 'Failed to create issue.', 'error'); // Show error toast.
      } finally {
        setLoading(false); // Reset loading state.
      }
    }
  };


    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
        showToastMessage('All notifications marked as read', 'info');
    };

    const mobileNavItems = [
        { id: 'feed', label: 'Feed', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { id: 'issues', label: 'Issues', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
        { id: 'explore', label: 'Explore', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
        { id: 'notifications', label: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.0 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
        { id: 'profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <header className="bg-black border-b border-gray-800 px-4 py-3 md:px-6 md:py-4">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center space-x-6">
                        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Buzz
                        </h1>
                        <nav className="hidden md:flex space-x-6">
                            {['feed', 'issues', 'explore'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-3 py-2 rounded-lg transition-all duration-200 ${activeTab === tab
                                        ? 'bg-gray-800 text-white font-medium scale-105'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center space-x-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative p-2 text-gray-400 hover:text-white transition-colors"
                            onClick={() => setActiveTab('notifications')}
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

                    {/* Feed Tab */}
                    {activeTab === 'feed' && (
                        <Feed
                            posts={posts}
                            handleLike={handleLike}
                            setShowCreatePostModal={setShowCreatePostModal}
                        />
                    )}

                    {/* Issues Tab */}
                    {activeTab === 'issues' && (
                        <Issues
                            issues={issues}
                            setShowCreateIssueModal={setShowCreateIssueModal}
                        />
                    )}

                    {/* Explore Tab */}
                    {activeTab === 'explore' && (
                        <Explore posts={posts} issues={issues} />
                    )}
                    {activeTab === 'profile' && (
                        <ProfilePage currentUser={currentUser} onLogout={onLogout} />
                    )}
                </main>

                {/* Right Sidebar */}
                <aside className="w-72 lg:w-80 p-4 md:p-6 hidden lg:block">
                    {/* Notifications */}
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
            <BottomNav mobileNavItems={mobileNavItems} setActiveTab={setActiveTab} activeTab={activeTab} />
        </div>
    );
};

export default App2;