import React from 'react';
import { motion } from 'framer-motion';

const CreatePostModal = ({ newPost, setNewPost, handlePost, loading, setShowCreatePostModal }) => (
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
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share an update, ask a question, or start a discussion..."
            className="w-full bg-gray-700 rounded-lg p-4 mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 border-none text-sm md:text-base"
            rows="4"
          />
          <div className="flex justify-between items-center">
            <span className="text-xs md:text-sm text-gray-400">
              {280 - newPost.length} characters left • Markdown supported
            </span>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePost}
              disabled={!newPost.trim() || loading}
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

export default CreatePostModal;