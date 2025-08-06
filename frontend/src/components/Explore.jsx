import React from 'react';
import { motion } from 'framer-motion';

const Explore = ({ posts, issues }) => (
  <div className="space-y-6">
    <div className="bg-gray-800 rounded-xl p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-semibold mb-4">Explore DevCircle</h2>
      <div className="relative">
        <input
          type="text"
          placeholder="Search posts, issues, users..."
          className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Trending Posts */}
      <div className="bg-gray-800 rounded-xl p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold mb-4">Trending Posts</h3>
        <div className="space-y-3">
          {posts.slice(0, 3).map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ scale: 1.01 }}
              className="flex space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
            >
              <img src={post.avatar} alt={post.username} className="h-8 w-8 rounded-full" />
                        <div>
                          <p className="text-sm text-gray-300 line-clamp-2">{post.content}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                            <span>{post.username}</span>
                            <span>•</span>
                            <span>{post.likes} likes</span>
                          </div>
                        </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Popular Issues */}
      <div className="bg-gray-800 rounded-xl p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold mb-4">Popular Issues</h3>
        <div className="space-y-3">
          {issues.slice(0, 3).map((issue) => (
            <motion.div
              key={issue.id}
              whileHover={{ scale: 1.01 }}
              className="p-3 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
            >
              <h4 className="font-medium text-purple-300 text-sm md:text-base">{issue.title}</h4>
                        <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-400 mt-1">
                          <span>{issue.username}</span>
                          <span>•</span>
                          <span>{issue.comments} comments</span>
                          <span>•</span>
                          <span className={`px-1 py-0.5 rounded text-xs ${
                            issue.category === 'Bug' ? 'bg-red-900 text-red-200' :
                            issue.category === 'Feature' ? 'bg-green-900 text-green-200' :
                            'bg-blue-900 text-blue-200'
                          }`}>
                            {issue.category}
                          </span>
                        </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Explore;