import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Droplets, Shield, Heart, Users, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImpactStats from "@/components/ImpactStats";
import DomainCard from "@/components/DomainCard";
import SocialHandles from "@/components/SocialHandles";
import DonateButton from "@/components/DonateButton";
import SectionHeader from "@/components/SectionHeader";
import heroBg from "@/assets/hero-bg.jpg";
import bloodImg from "@/assets/blood-donation.jpg";
import womenImg from "@/assets/women-safety.jpg";
import sanitaryImg from "@/assets/sanitary-awareness.jpg";
import childImg from "@/assets/child-oldage.jpg";

const domains = [
  { title: "Blood Donation Camp", description: "Organizing regular blood donation camps to ensure life-saving blood supply reaches those in need.", image: bloodImg, path: "/blood-donation", icon: Droplets },
  { title: "Women Safety", description: "Empowering women through safety awareness, self-defense training, and support networks.", image: womenImg, path: "/women-safety", icon: Shield },
  { title: "Sanitary Awareness", description: "Breaking taboos and providing access to menstrual hygiene products and education.", image: sanitaryImg, path: "/sanitary-awareness", icon: Heart },
  { title: "Child & Old Age Help", description: "Providing care, education, and support to children and elderly in our communities.", image: childImg, path: "/child-oldage-help", icon: Users },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <img src={heroBg} alt="Feel Good Foundation Community" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-secondary leading-tight mb-6">
              Feel Good Foundation:{" "}
              <span className="text-gradient-gold">Serving Community</span> With Compassion
            </h1>
            <p className="text-secondary/80 text-lg mb-8 leading-relaxed">
              We believe in creating a better world through blood donation, women's safety, sanitary awareness, and care for children & the elderly.
            </p>
            <div className="flex flex-wrap gap-4">
              <DonateButton size="lg" />
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm text-secondary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-secondary/30 transition-all border border-secondary/30"
              >
                Learn More <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ImpactStats />

      {/* Our Domains */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader title="Our Domains" subtitle="We work across multiple areas to create lasting positive impact in our communities." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {domains.map((domain, i) => (
              <DomainCard key={domain.path} {...domain} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader title="About Feel Good Foundation" subtitle="Founded with a mission to uplift communities, Feel Good Foundation has been serving society through organized camps, awareness programs, and direct assistance." />
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              {[
                { title: "Our Mission", text: "To create sustainable change by empowering communities through health, safety, and education initiatives." },
                { title: "Our Vision", text: "A world where every individual has access to healthcare, safety, and dignified living regardless of age or gender." },
                { title: "Our Values", text: "Compassion, integrity, inclusivity, and transparency guide every action we take for the community." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-card rounded-xl p-6 border border-border shadow-warm"
                >
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SocialHandles />
      <Footer />
    </div>
  );
};

export default Index;
