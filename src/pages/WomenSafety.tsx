import { motion } from "framer-motion";
import { Shield, Phone, BookOpen, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import DonateButton from "@/components/DonateButton";
import SectionHeader from "@/components/SectionHeader";
import womenImg from "@/assets/women-safety.jpg";

const resources = [
  { title: "Women Helpline", detail: "181 (24/7)", icon: Phone },
  { title: "Gender & Accessibility Awareness", detail: "Monthly workshops", icon: BookOpen },
  { title: "Self-Defense Training", detail: "Free weekend sessions", icon: Shield },
  { title: "Support Groups", detail: "Weekly counseling", icon: Users },
];

const workshops = [
  { name: "Personal Safety Workshop", contact: "+91 98765 43210" },
  { name: "Awareness Rally", contact: "+91 98765 43211" },
  { name: "Self-Defense Camp", contact: "+91 98765 43212" },
  { name: "Empowerment Seminar", contact: "+91 98765 43213" },
];

const WomenSafety = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageBanner
      title="Women Safety & Awareness"
      subtitle="Empowering women through education, safety resources, and community support networks."
      image={womenImg}
      purpose="Women Safety"
    />

    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader title="Resources & Support" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {resources.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border shadow-warm text-center hover:shadow-warm-lg transition-all"
            >
              <r.icon className="mx-auto mb-3 text-primary" size={32} />
              <h3 className="font-heading font-semibold text-foreground mb-1">{r.title}</h3>
              <p className="text-sm text-muted-foreground">{r.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <SectionHeader title="Workshop & Councils" />
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
          {workshops.map((w, i) => (
            <motion.div
              key={w.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-5 border border-border shadow-warm flex items-center justify-between"
            >
              <div>
                <h4 className="font-semibold text-foreground text-sm">{w.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{w.contact}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <DonateButton purpose="Women Safety" size="lg" />
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default WomenSafety;
