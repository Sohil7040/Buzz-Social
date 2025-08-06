import React from 'react';  
import { motion } from 'framer-motion';

const BottomNav = ({ mobileNavItems, navigate, currentPath }) => {
    // Add safety check for mobileNavItems
    const items = Array.isArray(mobileNavItems) ? mobileNavItems : [];
    
    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800">
            <div className="flex">
                {items.map((item) => (
                    <motion.button
                        key={item.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(item.path)}
                        className={`flex-1 p-3 text-center transition-colors ${currentPath === item.path ? 'text-purple-400' : 'text-gray-400'
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                        <span className="text-xs">{item.label}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default BottomNav;