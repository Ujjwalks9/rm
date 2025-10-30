import React, { useEffect, useState } from 'react';
import API from '../api/axiosConfig';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [prefs, setPrefs] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newTeacher, setNewTeacher] = useState({ username: '', password: '' });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    Promise.all([API.get('teacher/preferences/'), API.get('admin/teachers/')])
      .then(([pRes, tRes]) => {
        setPrefs(pRes.data || []);
        setTeachers(tRes.data || []);
      })
      .catch((err) => setError(err.message || 'Load failed'))
      .finally(() => setLoading(false));
  }, []);

  const addTeacher = async () => {
    if (!newTeacher.username || !newTeacher.password) {
      setError('Fill all fields');
      return;
    }
    setBusy(true);
    try {
      await API.post('admin/create_teacher/', newTeacher);
      setTeachers((t) => [...t, { id: Date.now(), ...newTeacher }]);
      setNewTeacher({ username: '', password: '' });
    } catch (err) {
      setError(err.message || 'Add failed');
    } finally {
      setBusy(false);
    }
  };

  const generate = async () => {
    setBusy(true);
    try {
      await API.post('admin/generate_timetable/');
      alert('Generation started');
    } catch (err) {
      setError(err.message || 'Generation failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <motion.div className="mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h2 className="text-xl font-semibold text-gray-900">Admin Console</h2>
      </motion.div>

      {error && <div className="text-red-600 text-xs mb-2">{error}</div>}

      {loading ? (
        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h3 className="font-medium text-gray-900 mb-2">Manage Teachers</h3>
            <input
              placeholder="Username"
              value={newTeacher.username}
              onChange={(e) => setNewTeacher({ ...newTeacher, username: e.target.value })}
              className="w-full p-2 border rounded focus:ring-primary mb-2"
            />
            <input
              placeholder="Password"
              type="password"
              value={newTeacher.password}
              onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
              className="w-full p-2 border rounded focus:ring-primary mb-2"
            />
            <motion.button
              onClick={addTeacher}
              disabled={busy}
              className="w-full bg-primary text-white p-2 rounded hover:bg-indigo-700"
              whileHover={{ scale: 1.02 }}
            >
              Add Teacher
            </motion.button>
            <motion.button
              onClick={generate}
              disabled={busy}
              className="w-full mt-2 bg-emerald-600 text-white p-2 rounded hover:bg-emerald-700"
              whileHover={{ scale: 1.02 }}
            >
              Generate Timetable
            </motion.button>
            <div className="mt-2 max-h-[calc(100vh-400px)] overflow-y-auto">
              {teachers.map((t) => (
                <div key={t.id} className="p-2 border-b text-sm">{t.username}</div>
              ))}
            </div>
          </motion.div>

          <motion.div className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h3 className="font-medium text-gray-900 mb-2">Preferences</h3>
            {prefs.length === 0 ? (
              <p className="text-gray-500 text-sm">No prefs</p>
            ) : (
              <div className="max-h-[calc(100vh-400px)] overflow-y-auto space-y-2">
                {prefs.map((g) => (
                  <details key={g.teacher} className="p-2 border rounded">
                    <summary className="font-medium">{g.teacher}</summary>
                    <div className="mt-1 text-xs">
                      {g.preferences.map((p, i) => (
                        <div key={i} className="pl-4">{p.subject} - {p.time_slot}</div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </main>
  );
}