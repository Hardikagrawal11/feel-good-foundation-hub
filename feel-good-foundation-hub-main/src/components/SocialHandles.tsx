import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ExternalLink } from "lucide-react";
import SectionHeader from "./SectionHeader";

const socials = [
  { name: "Instagram", icon: Instagram, handle: "@feelgoodfoundation", url: "https://www.instagram.com/feelgoodfoundation", color: "from-pink-500 to-orange-400", followers: "12.5K" },
  { name: "Facebook", icon: Facebook, handle: "Feel Good Foundation", url: "https://www.facebook.com/feelgoodfoundation", color: "from-blue-600 to-blue-500", followers: "25K" },
  { name: "Twitter", icon: Twitter, handle: "@feelgood_ngo", url: "https://twitter.com/feelgood_ngo", color: "from-sky-500 to-sky-400", followers: "8.2K" },
  { name: "LinkedIn", icon: Linkedin, handle: "Feel Good Foundation", url: "https://www.linkedin.com/company/feelgoodfoundation", color: "from-blue-700 to-blue-600", followers: "5K" },
  { name: "YouTube", icon: Youtube, handle: "Feel Good Foundation", url: "https://www.youtube.com/@feelgoodfoundation", color: "from-red-600 to-red-500", followers: "3.1K" },
];

const SocialHandles = () => (
  <section className="py-12 sm:py-16 md:py-20 bg-card">
    <div className="container mx-auto px-4 sm:px-6">
      <SectionHeader title="Connect With Us" subtitle="Follow our journey and stay updated on our community impact across social platforms." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto">
        {socials.map((social, i) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="group flex items-center gap-4 bg-background rounded-xl p-5 border border-border hover:shadow-warm-lg transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center text-primary-foreground shrink-0`}>
              <social.icon size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-foreground text-sm">{social.name}</span>
                <ExternalLink size={12} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-muted-foreground truncate">{social.handle}</p>
              <p className="text-xs text-primary font-medium mt-0.5">{social.followers} followers</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default SocialHandles;
