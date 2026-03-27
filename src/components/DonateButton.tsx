import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface DonateButtonProps {
  purpose?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const DonateButton = ({ purpose = "General", className = "", size = "md" }: DonateButtonProps) => {
  const sizeClasses = {
    sm: "px-3 sm:px-4 py-2 text-xs sm:text-sm",
    md: "px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base",
    lg: "px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg",
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
      <Link
        to={`/donate?purpose=${encodeURIComponent(purpose)}`}
        className={`inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground ${sizeClasses[size]} rounded-lg font-semibold shadow-warm hover:shadow-warm-lg transition-all duration-300 ${className}`}
      >
        <Heart size={size === "lg" ? 22 : 18} />
        Donate Now
      </Link>
    </motion.div>
  );
};

export default DonateButton;
