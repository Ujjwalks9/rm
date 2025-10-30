import React, { useEffect, useState } from 'react';
import API from '../api/axiosConfig';
import { motion } from 'framer-motion';

export default function TeacherDashboard() {
  const [prefs, setPrefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newPref, setNewPref] = useState({ subject: '', time: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    API.get('teacher/preferences/')
      .then((res) => setPrefs(res.data || []))
      .catch((err) => setError(err.message || 'Load failed'))
      .finally(() => setLoading(false));
  }, []);

  const add = async () => {
    if (!newPref.subject || !newPref.time) {
      setError('Fill all fields');
      return;
    }
    setSaving(true);
    try {
      await API.post('teacher/preferences/', newPref);
      setPrefs((p) => [...p, { id: Date.now(), ...newPref }]);
      setNewPref({ subject: '', time: '' });
    } catch (err) {
      setError(err.message || 'Add failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <motion.div className="mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h2 className="text-xl font-semibold text-gray-900">Preferences</h2>
      </motion.div>

      {error && <div className="text-red-600 text-xs mb-2">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h3 className="font-medium text-gray-900 mb-2">Existing</h3>
          {loading ? (
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          ) : prefs.length === 0 ? (
            <p className="text-gray-500 text-sm">No prefs</p>
          ) : (
            <div className="max-h-[calc(100vh-300px)] overflow-y-auto space-y-2">
              {prefs.map((p) => (
                <motion.div
                  key={p.id}
                  className="p-2 border rounded flex justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span>{p.subject}</span>
                  <span className="text-xs text-gray-400">{p.time}</span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h3 className="font-medium text-gray-900 mb-2">Add New</h3>
          <div className="space-y-2">
            <input
              placeholder="Subject"
              value={newPref.subject}
              onChange={(e) => setNewPref({ ...newPref, subject: e.target.value })}
              className="w-full p-2 border rounded focus:ring-primary"
            />
            <input
              placeholder="Time"
              value={newPref.time}
              onChange={(e) => setNewPref({ ...newPref, time: e.target.value })}
              className="w-full p-2 border rounded focus:ring-primary"
            />
            <motion.button
              onClick={add}
              disabled={saving}
              className="w-full bg-primary text-white p-2 rounded hover:bg-indigo-700"
              whileHover={{ scale: 1.02 }}
            >
              {saving ? 'Saving...' : 'Add'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}