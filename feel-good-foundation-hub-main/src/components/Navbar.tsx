import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser, UserButton, SignInButton } from "@clerk/clerk-react";
import { Menu, X, Heart, Languages } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isHindi, toggleLanguage } = useLanguage();
  const { user, isSignedIn } = useUser();
  const isAdmin = user?.primaryEmailAddress?.emailAddress === "vanshikarao.c@gmail.com";

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="text-red-500 w-6 h-6 fill-current" />
            <span className="font-bold text-xl">
              {isHindi ? "फील गुड" : "Feel Good"} <span className="text-primary">{isHindi ? "फाउंडेशन" : "Foundation"}</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-600 hover:text-primary font-medium">{isHindi ? "होम" : "Home"}</Link>
            <Link to="/campaigns" className="text-gray-600 hover:text-primary font-medium">{isHindi ? "अभियान" : "Campaigns"}</Link>
            
            <button onClick={toggleLanguage} className="flex items-center gap-1 text-sm bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">
              <Languages size={14} /> {isHindi ? "English" : "हिंदी"}
            </button>

            {isSignedIn && isAdmin && (
              <Link to="/admin" className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold">{isHindi ? "एडमिन हब" : "Admin Hub"}</Link>
            )}

            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <button className="bg-primary text-white px-6 py-2 rounded-full font-semibold">{isHindi ? "साइन इन" : "Sign In"}</button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;