
import React, { useEffect, useState } from 'react';
import API from '../api/axiosConfig';
import TimetableTable from '../components/TimeTable';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sampleTimetable = [
    { day: 'Monday', slots: [{ time: '09:00-10:00', subject: 'Math', room: 'A101', teacher: 'Dr. A', status: 'confirmed' }] },
    { day: 'Tuesday', slots: [{ time: '09:00-10:00', subject: 'Physics', room: 'B201', teacher: 'Dr. B', status: 'confirmed' }] },
    { day: 'Wednesday', slots: [{ time: '09:00-10:00', subject: 'CS', room: 'A102', teacher: 'Prof. C', status: 'pending' }] },
    { day: 'Thursday', slots: [{ time: '09:00-10:00', subject: 'Eng', room: 'B101', teacher: 'Dr. D', status: 'confirmed' }] },
    { day: 'Friday', slots: [{ time: '09:00-10:00', subject: 'Review', room: 'A105', teacher: 'Dr. A', status: 'confirmed' }] },
  ];

  useEffect(() => {
    setTimetable(sampleTimetable); // Set sample data immediately
    setLoading(false); // Stop loading state immediately

    let mounted = true;
    API.get('public/timetable/')
      .then((response) => {
        if (mounted && response.data?.timetable) {
          setTimetable(response.data.timetable);
          setError(null);
        }
      })
      .catch((err) => {
        if (mounted) {
          console.error('API Error:', err.message);
          setError('Failed to fetch real-time data. Using demo timetable.');
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  console.log('Timetable State:', timetable); // Verify state
  console.log('Rendering with loading:', loading, 'error:', error); // Debug rendering conditions

  return (
    <main className="p-4 max-w-6xl mx-auto min-h-screen">
      <motion.div className="mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Active Timetable</h1>
            <p className="text-xs text-gray-500">Week 42 • Demo</p>
          </div>
        </div>
      </motion.div>

      <motion.div className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {loading ? (
          <div className="p-4">
            <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ) : (
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            <TimetableTable data={timetable} />
            {error && (
              <div className="text-red-600 text-center p-2 text-sm mt-2" role="alert">
                {error}
                <button onClick={() => window.location.reload()} className="ml-2 text-primary underline">Retry</button>
              </div>
            )}
          </div>
        )}
      </motion.div>

      <div className="mt-2 flex justify-center text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Last updated: 2 min ago</span>
        </div>
      </div>
    </main>
  );
}