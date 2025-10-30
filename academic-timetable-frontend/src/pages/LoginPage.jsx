import React, { useState } from 'react';
import API from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Fill all fields');
      return;
    }
    setLoading(true);
    try {
      const res = await API.post('auth/login/', { username, password });
      localStorage.setItem('token', res.data.access);
      navigate(res.data.role === 'admin' ? '/admin' : '/teacher');
    } catch (err) {
      setError(err.message || 'Invalid login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div
        className="w-full max-w-sm bg-white rounded-xl p-4 shadow-lg border"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Sign In</h2>
        <p className="text-xs text-gray-500 mb-3">Enter credentials</p>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label htmlFor="username" className="text-sm text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              className="w-full p-2 border rounded focus:ring-primary focus:border-primary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              className="w-full p-2 border rounded focus:ring-primary focus:border-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-600 text-xs">{error}</div>}
          <motion.button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded hover:bg-indigo-700 disabled:bg-indigo-400"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Signing...' : 'Sign In'}
          </motion.button>
          <a href="#" className="text-xs text-primary underline">Forgot?</a>
        </form>
      </motion.div>
    </main>
  );
}