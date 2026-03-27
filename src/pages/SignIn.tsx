import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Facebook, Instagram, Linkedin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import logo from "@/assets/logo.png";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-10 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto bg-card rounded-2xl p-5 sm:p-8 border border-border shadow-warm-lg"
          >
            <div className="text-center mb-8">
              <img src={logo} alt="Feel Good Foundation" className="h-16 w-16 mx-auto mb-4" />
              <h1 className="font-heading text-2xl font-bold text-foreground">Sign In</h1>
              <p className="text-sm text-muted-foreground mt-1">Welcome back to Feel Good Foundation</p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email / Username</label>
                <input className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring outline-none" placeholder="Enter email or username" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring outline-none pr-10" placeholder="Enter password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" className="rounded border-input accent-primary" />
                  Remember me
                </label>
                <a href="#" className="text-primary hover:underline font-medium">Forgot Password?</a>
              </div>
              <button type="submit" className="w-full bg-gradient-gold text-primary-foreground py-3 rounded-lg font-semibold shadow-warm hover:shadow-warm-lg transition-all">
                Log In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">Or sign in with</p>
              <div className="flex justify-center gap-3">
                {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{" "}
              <a href="#" className="text-primary font-medium hover:underline">Sign Up</a>
            </p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SignIn;
