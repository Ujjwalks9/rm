import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-gray-900 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" aria-label="Academic Timetable Home">
          <motion.div
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            AT
          </motion.div>
          <div>
            <div className="text-lg font-semibold">Academic Timetable</div>
            <div className="text-xs text-gray-300">Enterprise</div>
          </div>
        </Link>

        <nav className="flex items-center gap-6" aria-label="Main navigation">
          <Link
            to="/"
            className={`text-sm font-medium pb-2 border-b-2 transition-all duration-200 ${
              window.location.pathname === '/'
                ? 'border-primary text-primary'
                : 'border-transparent hover:border-gray-400 hover:text-gray-300'
            }`}
          >
            Home
          </Link>
          {token ? (
            <>
              <Link
                to="/teacher"
                className={`text-sm font-medium pb-2 border-b-2 transition-all duration-200 ${
                  window.location.pathname === '/teacher'
                    ? 'border-primary text-primary'
                    : 'border-transparent hover:border-gray-400 hover:text-gray-300'
                }`}
              >
                Teacher
              </Link>
              <Link
                to="/admin"
                className={`text-sm font-medium pb-2 border-b-2 transition-all duration-200 ${
                  window.location.pathname === '/admin'
                    ? 'border-primary text-primary'
                    : 'border-transparent hover:border-gray-400 hover:text-gray-300'
                }`}
              >
                Admin
              </Link>
              <motion.button
                onClick={logout}
                className="ml-2 bg-red-600 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-red-700 focus:bg-red-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Log out"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm bg-gradient-to-r from-primary to-secondary px-4 py-1.5 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors shadow-lg"
              aria-label="Log in"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

Navbar.propTypes = {};