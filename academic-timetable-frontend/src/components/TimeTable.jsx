// import React from 'react';
// import PropTypes from 'prop-types';
// import { motion } from 'framer-motion';

// export default function TimetableTable({ data = [] }) {
//   if (!data || data.length === 0) {
//     return (
//       <div className="card text-center text-gray-500 p-6" role="region" aria-label="No timetable available">
//         <p className="text-lg font-medium">No timetable available</p>
//         <p className="text-sm mt-1">Check back later or contact admin.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="overflow-x-auto bg-white rounded-2xl shadow-xl" role="region" aria-label="Timetable">
//       <table className="min-w-full text-left border-collapse">
//         <thead>
//           <tr className="bg-gray-50 text-gray-600">
//             <th className="p-3 border-b text-sm font-semibold" scope="col">Day</th>
//             <th className="p-3 border-b text-sm font-semibold" scope="col">Time</th>
//             <th className="p-3 border-b text-sm font-semibold" scope="col">Subject</th>
//             <th className="p-3 border-b text-sm font-semibold" scope="col">Room</th>
//             <th className="p-3 border-b text-sm font-semibold" scope="col">Teacher</th>
//             <th className="p-3 border-b text-sm font-semibold" scope="col">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, i) => (
//             row.slots && row.slots.length > 0 ? (
//               row.slots.map((slot, idx) => (
//                 <motion.tr
//                   key={`${i}-${idx}`}
//                   className="hover:bg-gray-50 transition-colors"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: idx * 0.1 }}
//                 >
//                   {idx === 0 && (
//                     <td className="p-3 border-b align-top" rowSpan={row.slots.length} scope="row">
//                       {row.day}
//                     </td>
//                   )}
//                   <td className="p-3 border-b">{slot.time}</td>
//                   <td className="p-3 border-b">{slot.subject}</td>
//                   <td className="p-3 border-b">{slot.room}</td>
//                   <td className="p-3 border-b">{slot.teacher}</td>
//                   <td className="p-3 border-b">
//                     <span
//                       className={`px-2 py-1 rounded text-xs ${
//                         slot.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
//                       }`}
//                     >
//                       {slot.status}
//                     </span>
//                   </td>
//                 </motion.tr>
//               ))
//             ) : (
//               <motion.tr
//                 key={i}
//                 className="hover:bg-gray-50 transition-colors"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: i * 0.1 }}
//               >
//                 <td className="p-3 border-b" scope="row">{row.day}</td>
//                 <td className="p-3 border-b" colSpan="5">—</td>
//               </motion.tr>
//             )
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// TimetableTable.propTypes = {
//   data: PropTypes.arrayOf(
//     PropTypes.shape({
//       day: PropTypes.string,
//       slots: PropTypes.arrayOf(
//         PropTypes.shape({
//           time: PropTypes.string,
//           subject: PropTypes.string,
//           room: PropTypes.string,
//           teacher: PropTypes.string,
//           status: PropTypes.string,
//         }),
//       ),
//     }),
//   ),
// };



import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export default function TimetableTable({ data = [] }) {
  // Check if data is empty or if all entries lack slots
  const hasNoData = !data || data.length === 0 || data.every((item) => !item.slots || item.slots.length === 0);

  if (hasNoData) {
    return (
      <div className="card text-center text-gray-500 p-4" role="region" aria-label="No timetable available">
        <p className="text-lg font-medium">No timetable available</p>
        <p className="text-sm mt-1">Check back later or contact admin.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-xl" role="region" aria-label="Timetable">
      <table className="min-w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 text-gray-600">
            <th className="p-3 border-b text-sm font-semibold" scope="col">Day</th>
            <th className="p-3 border-b text-sm font-semibold" scope="col">Time</th>
            <th className="p-3 border-b text-sm font-semibold" scope="col">Subject</th>
            <th className="p-3 border-b text-sm font-semibold" scope="col">Room</th>
            <th className="p-3 border-b text-sm font-semibold" scope="col">Teacher</th>
            <th className="p-3 border-b text-sm font-semibold" scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) =>
            row.slots && row.slots.length > 0 ? (
              row.slots.map((slot, idx) => (
                <motion.tr
                  key={`${i}-${idx}`}
                  className="hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {idx === 0 && (
                    <td className="p-3 border-b align-top" rowSpan={row.slots.length} scope="row">
                      {row.day}
                    </td>
                  )}
                  <td className="p-3 border-b">{slot.time}</td>
                  <td className="p-3 border-b">{slot.subject}</td>
                  <td className="p-3 border-b">{slot.room}</td>
                  <td className="p-3 border-b">{slot.teacher}</td>
                  <td className="p-3 border-b">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        slot.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {slot.status}
                    </span>
                  </td>
                </motion.tr>
              ))
            ) : (
              <motion.tr
                key={i}
                className="hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <td className="p-3 border-b" scope="row">{row.day}</td>
                <td className="p-3 border-b" colSpan="5">—</td>
              </motion.tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

TimetableTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string,
      slots: PropTypes.arrayOf(
        PropTypes.shape({
          time: PropTypes.string,
          subject: PropTypes.string,
          room: PropTypes.string,
          teacher: PropTypes.string,
          status: PropTypes.string,
        })
      ),
    })
  ),
};