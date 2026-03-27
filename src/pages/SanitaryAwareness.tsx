import { motion } from "framer-motion";
import { BookOpen, Package, HeartHandshake, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import DonateButton from "@/components/DonateButton";
import SectionHeader from "@/components/SectionHeader";
import sanitaryImg from "@/assets/sanitary-awareness.jpg";

const initiatives = [
  { icon: Package, title: "Free Pad Distribution", desc: "Distributing sanitary pads to underprivileged women and girls across rural areas." },
  { icon: BookOpen, title: "Hygiene Education", desc: "Conducting workshops on menstrual health and hygiene in schools and communities." },
  { icon: HeartHandshake, title: "Breaking Stigma", desc: "Community awareness campaigns to normalize conversations around menstrual health." },
  { icon: Users, title: "Volunteer Network", desc: "Building a network of volunteers dedicated to women's health and hygiene initiatives." },
];

const SanitaryAwareness = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageBanner
      title="Women Sanitary Awareness"
      subtitle="Breaking taboos, providing access, and educating communities about menstrual health and hygiene."
      image={sanitaryImg}
      purpose="Sanitary Awareness"
    />

    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader title="Our Initiatives" subtitle="Comprehensive programs addressing menstrual hygiene across communities." />
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {initiatives.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border shadow-warm hover:shadow-warm-lg transition-all flex gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <DonateButton purpose="Sanitary Awareness" size="lg" />
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default SanitaryAwareness;
