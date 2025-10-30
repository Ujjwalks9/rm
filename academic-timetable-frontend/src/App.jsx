import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import PropTypes from 'prop-types';

const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const TeacherDashboard = lazy(() => import('./pages/TeacherDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

function RequireAuth({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/login" replace />;
}

RequireAuth.propTypes = { children: PropTypes.node.isRequired };

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col md:flex-row">
        <Sidebar collapsed={collapsed} />
        <div className="flex-1 flex flex-col">
          <Topbar onToggle={() => setCollapsed(!collapsed)} />
          <Navbar />
          <div className="flex-1 overflow-auto">
            <Suspense fallback={<div className="p-4 text-center text-gray-500">Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/teacher" element={<RequireAuth><TeacherDashboard /></RequireAuth>} />
                <Route path="/admin" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </Router>
  );
}