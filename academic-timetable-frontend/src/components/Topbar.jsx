import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function Topbar({ onToggle }) {
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white px-6 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <motion.button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-700 focus:bg-gray-700 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle sidebar"
        >
          ☰
        </motion.button>
        <div>
          <div className="font-semibold">Enterprise Timetable</div>
          <div className="text-xs text-gray-300">Operational</div>
        </div>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <motion.button
          className="px-3 py-1.5 bg-primary rounded-lg hover:bg-indigo-700 focus:bg-indigo-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="View notifications"
        >
          Notifications
        </motion.button>
        <motion.button
          className="px-3 py-1.5 bg-primary rounded-lg hover:bg-indigo-700 focus:bg-indigo-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open settings"
        >
          Settings
        </motion.button>
      </div>
    </div>
  );
}

Topbar.propTypes = {
  onToggle: PropTypes.func.isRequired,
};