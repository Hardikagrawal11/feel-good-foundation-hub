import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const domainItems = [
  { label: "Blood Donation", path: "/blood-donation" },
  { label: "Women & Girls Welfare", path: "/women-welfare" },
  { label: "Child Welfare & Education", path: "/child-welfare" },
  { label: "Elder Care", path: "/elder-care" },
  { label: "Differently Abled Support", path: "/differently-abled" },
  { label: "Food Security", path: "/food-security" },
  { label: "Community Development", path: "/community-development" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [domainsOpen, setDomainsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isDomainActive = domainItems.some((d) => isActive(d.path));

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
          <Link to="/" className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive("/") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"}`}>
            Home
          </Link>
          <Link to="/about" className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive("/about") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"}`}>
            About Us
          </Link>

          {/* Domains Dropdown */}
          <div className="relative" onMouseEnter={() => setDomainsOpen(true)} onMouseLeave={() => setDomainsOpen(false)}>
            <button className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isDomainActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"}`}>
              Our Work <ChevronDown size={14} className={`transition-transform ${domainsOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {domainsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1 w-64 bg-card rounded-xl border border-border shadow-warm-lg overflow-hidden z-50"
                >
                  {domainItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block px-4 py-3 text-sm font-medium transition-all ${isActive(item.path) ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/donate" className="bg-gradient-gold text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold shadow-warm hover:shadow-warm-lg transition-all duration-300 hover:scale-105">
            Donate Now
          </Link>
          <Link to="/signin" className="border border-primary text-primary px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200">
            Sign In
          </Link>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-foreground">
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
            <div className="flex flex-col p-4 gap-1 max-h-[70vh] overflow-y-auto">
              <Link to="/" onClick={() => setMobileOpen(false)} className={`px-4 py-3 rounded-lg text-sm font-medium ${isActive("/") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"}`}>Home</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)} className={`px-4 py-3 rounded-lg text-sm font-medium ${isActive("/about") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"}`}>About Us</Link>
              <p className="px-4 pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Our Work</p>
              {domainItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)} className={`px-4 py-3 rounded-lg text-sm font-medium pl-6 ${isActive(item.path) ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"}`}>
                  {item.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-3">
                <Link to="/donate" onClick={() => setMobileOpen(false)} className="flex-1 bg-gradient-gold text-primary-foreground px-4 py-3 rounded-lg text-sm font-semibold text-center">Donate Now</Link>
                <Link to="/signin" onClick={() => setMobileOpen(false)} className="flex-1 border border-primary text-primary px-4 py-3 rounded-lg text-sm font-semibold text-center">Sign In</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
