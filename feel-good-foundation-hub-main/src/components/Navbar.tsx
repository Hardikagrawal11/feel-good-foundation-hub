import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Heart } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
  ];

  const workLinks = [
    { name: "Blood Donation", path: "/blood-donation" },
    { name: "Child Welfare", path: "/child-welfare" },
    { name: "Elder Care", path: "/elder-care" },
    { name: "Women Welfare", path: "/women-welfare" },
    { name: "Food Security", path: "/food-security" },
    { name: "Community Dev", path: "/community-development" },
    { name: "Differently Abled", path: "/differently-abled" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center"><Heart className="text-white" size={24} /></div>
          <span className="font-heading font-bold text-xl text-foreground italic">Feel Good</span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="text-sm font-medium hover:text-primary">{link.name}</Link>
          ))}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-primary">
              Our Work <ChevronDown size={14} />
            </button>
            <div className="absolute top-full left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all bg-white rounded-xl shadow-xl border p-2">
              {workLinks.map((link) => (
                <Link key={link.path} to={link.path} className="block px-4 py-2 text-sm rounded-lg hover:bg-primary/5 hover:text-primary">{link.name}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <SignedOut>
            {/* FORCE REDIRECT TO ADMIN PORTAL ONCE LOGGED IN */}
            <SignInButton mode="modal" forceRedirectUrl="/admin-portal">
              <button className="text-sm font-semibold text-muted-foreground hover:text-primary">Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-3">
              <Link to="/admin-portal" className="text-xs font-bold text-primary border border-primary px-2 py-1 rounded hover:bg-primary/10">Admin</Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          <Link to="/donate">
            <button className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-primary/90">Donate Now</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;