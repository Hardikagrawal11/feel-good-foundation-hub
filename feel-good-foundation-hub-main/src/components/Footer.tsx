import { Link } from "react-router-dom";
import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-secondary py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
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
              <a href="mailto:feelgoodfoundation.ngo@gmail.com" className="flex items-center gap-2 hover:text-warm-gold transition-colors"><Mail size={14} /> feelgoodfoundation.ngo@gmail.com</a>
              <span className="flex items-center gap-2"><Phone size={14} /> +91 8668456446</span>
              <span className="flex items-center gap-2"><MapPin size={14} /> Nagpur, India</span>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold mb-4 text-warm-gold">Follow Us</h4>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, url: "https://www.facebook.com/share/1HaSNDcLfP/" },
                { Icon: Twitter, url: "https://x.com/FeelGood_NGO" },
                { Icon: Instagram, url: "https://www.instagram.com/feelgoodfoundation.ngo?igsh=eTdmcm14c28zczV3" },
                { Icon: Linkedin, url: "https://www.linkedin.com/company/feel-good-foundation/" },
              ].map((social, i) => (
                <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200">
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-secondary/20 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
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
