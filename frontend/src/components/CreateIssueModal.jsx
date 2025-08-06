import React from 'react';
import { motion } from 'framer-motion';

const CreateIssueModal = ({ newIssue, setNewIssue, handleCreateIssue, loading, setShowCreateIssueModal }) => (
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
        <h2 className="text-xl font-semibold">Create an Issue</h2>
        <button
          onClick={() => setShowCreateIssueModal(false)}
          className="text-gray-400 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="space-y-4">
        <input
          type="text"
          value={newIssue.title}
          onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
          placeholder="Issue title"
          className="w-full bg-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
        />
        <textarea
          value={newIssue.description}
          onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
          placeholder="Describe the issue, bug, or feature request..."
          className="w-full bg-gray-700 rounded-lg p-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={newIssue.category}
            onChange={(e) => setNewIssue({ ...newIssue, category: e.target.value })}
            className="bg-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
          >
            <option value="Bug">Bug</option>
            <option value="Feature">Feature</option>
            <option value="Question">Question</option>
          </select>
          <input
            type="text"
            value={Array.isArray(newIssue.tags) ? newIssue.tags.join(',') : newIssue.tags}
            onChange={(e) => setNewIssue({ ...newIssue, tags: e.target.value.split(',') })}
            placeholder="Tags (comma separated)"
            className="bg-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCreateIssue}
          disabled={!newIssue.title.trim() || !newIssue.description.trim() || loading}
          className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors font-semibold text-sm md:text-base"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Issue...
            </div>
          ) : 'Create Issue'}
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
);

export default CreateIssueModal;
