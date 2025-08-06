import React from 'react';
import { motion } from 'framer-motion';
import { timeAgo } from '../utils/timeAgo';
const Feed = ({ posts, handleLike, setShowCreatePostModal }) => {
  

  return(
  <>
    <div className="lg:hidden mb-4">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowCreatePostModal(true)}
        className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors font-semibold flex items-center justify-center space-x-2 text-sm md:text-base"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span>Create Post</span>
      </motion.button>
    </div>
    <div className="space-y-4">
      {posts.map((post) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800 rounded-xl p-4 md:p-6"
        >

          <div className="flex space-x-3" key={post.id}>
            <img src={post.avatar} alt={post.username} className="h-10 w-10 rounded-full" />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-sm md:text-base">{post.username}</h3>
                <span className="text-gray-400 text-sm">@{post.username.split('@')[1]}</span>
                <span className="text-gray-400 text-sm">•</span>
                <span className="text-gray-400 text-xs md:text-sm">{timeAgo(post.timestamp)}</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {post.skills?.map((skill, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-700 rounded text-xs text-purple-300">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-gray-100 mb-4 whitespace-pre-wrap text-sm md:text-base">{post.content}</p>
              {post.media && post.media.length > 0 && (
                <div className="mb-4">
                  {post.media.map((media, index) => (
                    <div key={index} className="mb-2">
                      {media.type === 'image' && (
                        <img src={media.url} alt={`Post Image ${index + 1}`} className="w-full rounded-lg" />
                      )}
                      {media.type === 'video' && (
                        <iframe src={media.url} title={`Post Video ${index + 1}`} className="w-full aspect-video rounded-lg"></iframe>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between text-gray-400">
                <div className="flex items-center space-x-4 md:space-x-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-1 md:space-x-2 transition-colors ${post.liked ? 'text-red-500' : 'hover:text-red-400'
                      }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill={post.liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-xs md:text-sm">{post.likes}</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center space-x-1 md:space-x-2 hover:text-blue-400 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-xs md:text-sm">{post.comments}</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center space-x-1 md:space-x-2 hover:text-green-400 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span className="text-xs md:text-sm">{post.shares}</span>
                  </motion.button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>

        </motion.div>
      ))}
    </div>
  </>
)};

export default Feed;