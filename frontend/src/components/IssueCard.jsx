import React from 'react';
import { motion } from 'framer-motion';
import { timeAgo } from '../utils/timeAgo';
function IssueCard({ issue }) {
  return (
    <motion.div
          key={issue.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800 rounded-xl p-4 md:p-6"
        >

          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img src={issue.avatar} alt={issue.username} className="h-10 w-10 rounded-full" />
              <div>
                <h3 className="font-semibold text-sm md:text-base">{issue.username}</h3>
                <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-400">
                  <span>{timeAgo(issue.createdAt)}</span>
                  <span>•</span>
                  <span className={`px-1 py-0.5 rounded text-xs font-medium ${issue.category === 'Bug' ? 'bg-red-900 text-red-200' :
                      issue.category === 'Feature' ? 'bg-green-900 text-green-200' :
                        'bg-blue-900 text-blue-200'
                    }`}>
                    {issue.category}
                  </span>
                  <span className={`px-1 py-0.5 rounded text-xs font-medium ${issue.status === 'Open' ? 'bg-yellow-900 text-yellow-200' :
                      issue.status === 'In Progress' ? 'bg-blue-900 text-blue-200' :
                        'bg-green-900 text-green-200'
                    }`}>
                    {issue.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 bg-gray-700 rounded text-xs ${issue.likes > 10 ? 'text-purple-300' : 'text-gray-300'}`}>
                {issue.likes} likes
              </span>
            </div>
          </div>

          <h2 className="text-lg md:text-xl font-bold mb-3">{issue.title}</h2>
          <p className="text-gray-300 mb-4 leading-relaxed text-sm md:text-base">{issue.description}</p>

          {issue.media && issue.media.length > 0 && (
            <div className="mb-4">
              {issue.media.map((media, index) => (
                <div key={index} className="mb-2">
                  {media.type === 'image' && (
                    <img src={media.url} alt={`Issue Image ${index + 1}`} className="w-full rounded-lg" />
                  )}
                  {media.type === 'video' && (
                    <iframe src={media.url} title={`Issue Video ${index + 1}`} className="w-full aspect-video rounded-lg"></iframe>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1 md:gap-2 mb-4">
            {issue.tags.map((tag, i) => (
              tag.trim() && (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="px-2 py-1 md:px-3 md:py-1 bg-gray-700 rounded-full text-xs md:text-sm hover:bg-gray-600 cursor-pointer transition-colors"
                >
                  #{tag.trim()}
                </motion.span>
              )
            ))}
          </div>

          {issue.assignees.length > 0 && (
            <div className="flex items-center space-x-2 mb-4 text-xs md:text-sm">
              <span className="text-gray-400">Assigned to:</span>
              {issue.assignees.map((assignee, i) => (
                <span key={i} className="text-purple-400 font-medium">{assignee}</span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between text-gray-400">
            <div className="flex items-center space-x-4 md:space-x-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center space-x-1 md:space-x-2 hover:text-purple-400 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-xs md:text-sm">{issue.likes}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center space-x-1 md:space-x-2 hover:text-blue-400 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-xs md:text-sm">{issue.comments}</span>
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

        </motion.div>
  );
}
export default IssueCard;