import { Link } from "react-router-dom";
import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-secondary py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Feel Good Foundation" className="h-10 w-10" />
              <span className="font-heading text-lg font-bold text-secondary">Feel Good Foundation</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Serving community with compassion. Together, we create a world where every individual feels cared for and empowered.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold mb-4 text-warm-gold">Our Work</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Blood Donation", path: "/blood-donation" },
                { label: "Women & Girls Welfare", path: "/women-welfare" },
                { label: "Child Welfare & Education", path: "/child-welfare" },
                { label: "Elder Care", path: "/elder-care" },
                { label: "Differently Abled Support", path: "/differently-abled" },
                { label: "Food Security", path: "/food-security" },
                { label: "Community Development", path: "/community-development" },
              ].map((item) => (
                <Link key={item.path} to={item.path} className="text-sm text-muted-foreground hover:text-warm-gold transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold mb-4 text-warm-gold">Contact Us</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Mail size={14} /> info@feelgoodfoundation.org</span>
              <span className="flex items-center gap-2"><Phone size={14} /> +91 98765 43210</span>
              <span className="flex items-center gap-2"><MapPin size={14} /> New Delhi, India</span>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold mb-4 text-warm-gold">Follow Us</h4>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2026 Feel Good Foundation. All rights reserved.</p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart size={14} className="text-primary fill-primary" /> for the community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
