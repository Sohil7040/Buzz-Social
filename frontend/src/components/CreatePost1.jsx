import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CreatePostModal = ({ newPost = "", setNewPost, handlePost, loading, setShowCreatePostModal }) => {
  const [media, setMedia] = useState(null);
  const [link, setLink] = useState('');

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
    }
  };

  const removeMedia = () => {
    setMedia(null);
  };

  const addLink = () => {
    if (link.trim()) {
      const linkText = ` [${link}](${link})`;
      setNewPost(prev => prev + linkText);
      setLink('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && link.trim()) {
      e.preventDefault();
      addLink();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-gray-800 rounded-2xl p-6 w-full max-w-md md:max-w-lg lg:max-w-2xl mx-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create a Post</h2>
          <button
            onClick={() => setShowCreatePostModal(false)}
            className="text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex space-x-3 mb-4">
          <img src="https://placehold.co/40x40" alt="Your avatar" className="h-10 w-10 rounded-full" />
          <div className="flex-1">
            <textarea
              value={newPost || ""}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share an update, ask a question, or start a discussion..."
              className="w-full bg-gray-700 rounded-lg p-4 mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 border-none text-sm md:text-base"
              rows="4"
            />
            
            {/* Media Preview */}
            {media && (
              <div className="mb-3 relative rounded-lg overflow-hidden">
                {media.type.startsWith('image') ? (
                  <div className="bg-gray-700 p-2 rounded-lg">
                    <img 
                      src="https://placehold.co/400x200/6366f1/ffffff?text=Image+Preview" 
                      alt="Preview" 
                      className="w-full h-32 object-cover rounded"
                    />
                  </div>
                ) : (
                  <div className="bg-gray-700 p-2 rounded-lg">
                    <div className="w-full h-32 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span className="ml-2 text-gray-400">Video File</span>
                    </div>
                  </div>
                )}
                <button
                  onClick={removeMedia}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 rounded-full p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            
            {/* Add Media Button */}
            <div className="flex flex-wrap gap-2 mb-3">
              <label className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Add Image/Video</span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaChange}
                  className="hidden"
                />
              </label>
              
              {/* Add Link Input */}
              <div className="flex items-center space-x-1 bg-gray-700 rounded-lg px-3 py-2 flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add a link"
                  className="bg-transparent text-sm flex-1 outline-none text-gray-300 placeholder-gray-500"
                />
                {link && (
                  <button
                    onClick={addLink}
                    className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs md:text-sm text-gray-400">
                {newPost ? (280 - newPost.length) : 280} characters left • Markdown supported
              </span>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePost}
                disabled={!newPost || !newPost.trim() || loading}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors font-medium text-sm"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Posting...
                  </div>
                ) : 'Post'}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreatePostModal;