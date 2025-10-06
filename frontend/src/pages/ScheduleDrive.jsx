import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const ScheduleDrive = () => {
  const location = useLocation();
  const { carName } = location.state || {};

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-xl w-full border border-gray-100">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">🚘 Schedule Test Drive</h1>
        <p className="text-gray-600 mb-6">
          You’ve selected: <span className="font-semibold text-black">{carName || "Unknown Car"}</span>
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Preferred Date</label>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all"
          >
            Confirm Test Drive
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ScheduleDrive;
