import React from 'react';
import { motion } from 'framer-motion';
import { timeAgo } from '../utils/timeAgo';

const ProfilePage = () => {
  const profileData = {
    username: 'johndoe',
    name: 'John Doe',
    bio: 'Full-stack developer • Open source contributor • Tech enthusiast\nBuilding the future one line of code at a time',
    avatar: 'https://placehold.co/150/6366f1/ffffff?text=JD',
    coverImage: 'https://placehold.co/800x300/1e293b/64748b?text=Cover+Image',
    followers: 1247,
    following: 342,
    posts: 89,
    skills: ['React', 'Node.js', 'Python', 'AWS', 'GraphQL'],
    website: 'johndoe.dev',
    location: 'San Francisco, CA'
  };

  const userPosts = [
    {
      id: 1,
      username: 'johndoe',
      avatar: 'https://placehold.co/150/6366f1/ffffff?text=JD',
      timestamp: Date.now() - 3600000,
      content: 'Just shipped a new feature to production! 🚀\nOur real-time collaboration system is now live and handling thousands of concurrent users.',
      skills: ['React', 'Node.js', 'WebSockets'],
      likes: 42,
      comments: 8,
      shares: 3,
      liked: false,
      media: [
        {
          type: 'image',
          url: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Feature+Launch'
        }
      ]
    },
    {
      id: 2,
      username: 'johndoe',
      avatar: 'https://placehold.co/150/6366f1/ffffff?text=JD',
      timestamp: Date.now() - 7200000,
      content: 'Sharing my favorite VS Code extensions for React development:\n\n1. ES7+ React/Redux/React-Native snippets\n2. Prettier\n3. Bracket Pair Colorizer\n4. GitLens\n\nWhat are your must-have extensions?',
      skills: ['React', 'VS Code', 'Developer Tools'],
      likes: 28,
      comments: 15,
      shares: 5,
      liked: true,
      media: []
    },
    {
      id: 3,
      username: 'johndoe',
      avatar: 'https://placehold.co/150/6366f1/ffffff?text=JD',
      timestamp: Date.now() - 10800000,
      content: 'Cloud architecture deep dive 🌩️\nBreaking down how we scaled our microservices to handle 10x traffic with zero downtime.',
      skills: ['AWS', 'Microservices', 'Docker'],
      likes: 67,
      comments: 12,
      shares: 9,
      liked: false,
      media: [
        {
          type: 'image',
          url: 'https://placehold.co/600x400/06b6d4/ffffff?text=Architecture+Diagram'
        }
      ]
    }
  ];

  const stats = [
    { label: 'Posts', value: profileData.posts },
    { label: 'Followers', value: profileData.followers },
    { label: 'Following', value: profileData.following }
  ];

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 min-h-screen">
      {/* Cover Photo */}
      <div className="relative">
        <img 
          src={profileData.coverImage} 
          alt="Cover" 
          className="w-full h-48 md:h-64 object-cover rounded-b-3xl"
        />
        <div className="absolute -bottom-16 left-6 md:left-8">
          <img 
            src={profileData.avatar} 
            alt={profileData.name}
            className="w-32 h-32 rounded-full border-4 border-gray-900 shadow-2xl"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-20 px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
          <div className="md:w-2/3">
            <h1 className="text-2xl font-bold text-white mb-1">{profileData.name}</h1>
            <p className="text-purple-400 font-medium mb-2">@{profileData.username}</p>
            <p className="text-gray-300 text-sm leading-relaxed mb-4 whitespace-pre-line">
              {profileData.bio}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {profileData.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-800 rounded-full text-xs text-purple-300 border border-purple-800"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
              {profileData.location && (
                <div className="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{profileData.location}</span>
                </div>
              )}
              {profileData.website && (
                <div className="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span>{profileData.website}</span>
                </div>
              )}
            </div>
          </div>

          <div className="md:w-1/3 md:text-right mt-6 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors font-semibold text-sm"
            >
              Follow
            </motion.button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center md:justify-start space-x-8 mb-8 pb-6 border-b border-gray-800">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl font-bold text-white">{stat.value.toLocaleString()}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* User Posts Feed */}
        <div className="space-y-4">
          {userPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-xl p-4 md:p-6"
            >
              <div className="flex space-x-3">
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
                        className={`flex items-center space-x-1 md:space-x-2 transition-colors ${post.liked ? 'text-red-500' : 'hover:text-red-400'}`}
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
      </div>
    </div>
  );
};

export default ProfilePage;