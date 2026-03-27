import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Blood Donation", path: "/blood-donation" },
  { label: "Women Safety", path: "/women-safety" },
  { label: "Sanitary Awareness", path: "/sanitary-awareness" },
  { label: "Child & Old Age Help", path: "/child-oldage-help" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-warm">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Feel Good Foundation" className="h-10 w-10" />
          <span className="font-heading text-lg font-bold text-foreground tracking-tight">
            Feel Good<br /><span className="text-sm font-medium text-primary">Foundation</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/donate"
            className="bg-gradient-gold text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold shadow-warm hover:shadow-warm-lg transition-all duration-300 hover:scale-105"
          >
            Donate Now
          </Link>
          <Link
            to="/signin"
            className="border border-primary text-primary px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            Sign In
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-foreground"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-card border-t border-border overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium ${
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-2">
                <Link to="/donate" onClick={() => setMobileOpen(false)} className="flex-1 bg-gradient-gold text-primary-foreground px-4 py-3 rounded-lg text-sm font-semibold text-center">
                  Donate Now
                </Link>
                <Link to="/signin" onClick={() => setMobileOpen(false)} className="flex-1 border border-primary text-primary px-4 py-3 rounded-lg text-sm font-semibold text-center">
                  Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
