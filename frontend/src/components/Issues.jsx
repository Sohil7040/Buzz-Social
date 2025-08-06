import React from 'react';
import { motion } from 'framer-motion';
import { timeAgo } from '../utils/timeAgo';
import IssueCard from './IssueCard';
const Issues = ({ issues, setShowCreateIssueModal }) => (
  <div>
    <div className="lg:hidden mb-4">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowCreateIssueModal(true)}
        className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl transition-colors font-semibold flex items-center justify-center space-x-2 text-sm md:text-base"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span>Create Issue</span>
      </motion.button>
    </div>
    <div className="space-y-4">
      {issues.map((issue) => (
        <IssueCard issue={issue}/>
      ))}
    </div>
  </div>
);

export default Issues;