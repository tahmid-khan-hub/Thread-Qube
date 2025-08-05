import { motion } from "framer-motion";

const StatCard = ({ icon: Icon, value, label, gradientFrom, gradientTo }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl shadow-lg p-6 text-center text-white relative overflow-hidden"
      style={{
        background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      {/* Icon in a circular background */}
      <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm shadow-inner">
        <Icon className="text-3xl" />
      </div>

      {/* Number */}
      <h2 className="text-3xl font-extrabold mt-4">{value}</h2>

      {/* Label */}
      <p className="text-sm font-semibold opacity-90 mt-1">{label}</p>

      {/* Decorative background blur circle */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
    </motion.div>
  );
};

export default StatCard;
