import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function Sidebar({ collapsed = false }) {
  const location = useLocation();
  const items = [
    { to: '/', label: 'Overview', emoji: '🏠', id: 'overview' },
    { to: '/teacher', label: 'Teacher Console', emoji: '👩‍🏫', id: 'teacher' },
    { to: '/admin', label: 'Admin Console', emoji: '🛠️', id: 'admin' },
  ];

  return (
    <motion.aside
      className={`bg-gray-800 text-white h-screen flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}
      initial={{ width: collapsed ? 80 : 256 }}
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ type: 'spring', stiffness: 100 }}
      aria-label="Sidebar navigation"
    >
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-bold">AT</div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="font-semibold">Academic Timetable</div>
              <div className="text-xs text-gray-400">Enterprise</div>
            </motion.div>
          )}
        </div>
      </div>

      <nav className="p-4 space-y-2 flex-1" aria-label="Sidebar menu">
        {items.map((item) => (
          <Link
            key={item.id}
            to={item.to}
            className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
              location.pathname === item.to
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
            }`}
            aria-current={location.pathname === item.to ? 'page' : undefined}
            aria-label={item.label}
          >
            <span className="text-xl group-hover:scale-110 transition-transform">{item.emoji}</span>
            {!collapsed && (
              <motion.span
                className="text-sm font-medium"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {item.label}
              </motion.span>
            )}
          </Link>
        ))}
      </nav>

      <div className="p-3 text-xs text-gray-400 border-t border-gray-700">v1.0 • Enterprise</div>
    </motion.aside>
  );
}

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
};