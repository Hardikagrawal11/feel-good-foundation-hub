import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Droplets, Shield, GraduationCap, Heart, Users, Utensils, Building, ArrowRight } from "lucide-react";
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
import childImg from "@/assets/child-education.jpg";
import elderImg from "@/assets/child-oldage.jpg";
import foodImg from "@/assets/food-security.jpg";
import abledImg from "@/assets/differently-abled.jpg";
import communityImg from "@/assets/community-dev.jpg";

const domains = [
  { title: "Blood Donation Camp", description: "Organizing regular blood donation camps to ensure life-saving blood supply reaches those in need.", image: bloodImg, path: "/blood-donation", icon: Droplets },
  { title: "Women & Girls Welfare", description: "Empowering women through safety, menstrual hygiene awareness, self-defense training, and support networks.", image: womenImg, path: "/women-welfare", icon: Shield },
  { title: "Child Welfare & Education", description: "Child labor rehabilitation, education access, and developmental programs for underprivileged children.", image: childImg, path: "/child-welfare", icon: GraduationCap },
  { title: "Elder Care", description: "Providing compassionate care, companionship, and essential support to senior citizens.", image: elderImg, path: "/elder-care", icon: Heart },
  { title: "Differently Abled Support", description: "Providing assistive devices, accessibility resources, and inclusive programs for the physically challenged.", image: abledImg, path: "/differently-abled", icon: Users },
  { title: "Food Security", description: "Fighting hunger through the 'Meals to Heal' campaign and community food distribution drives.", image: foodImg, path: "/food-security", icon: Utensils },
  { title: "Community Development", description: "Building stronger communities through infrastructure, skill-building, and collaborative development projects.", image: communityImg, path: "/community-development", icon: Building },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[85vh] min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
        <img src={heroBg} alt="Feel Good Foundation Community" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
            <h1 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-secondary leading-tight mb-4 sm:mb-6">
              Feel Good Foundation:{" "}
              <span className="text-gradient-gold">Serving Community</span> With Compassion
            </h1>
            <p className="text-secondary/80 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
              We believe in creating a better world through blood donation, women's welfare, child education, food security, and care for the differently abled & elderly.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <DonateButton size="lg" />
              <Link to="/about" className="inline-flex items-center justify-center gap-2 bg-secondary/20 backdrop-blur-sm text-secondary px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-secondary/30 transition-all border border-secondary/30">
                Learn More <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ImpactStats />

      {/* Our Domains */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader title="Our Domains" subtitle="We work across seven key areas to create lasting positive impact in our communities." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {domains.map((domain, i) => (
              <DomainCard key={domain.path} {...domain} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-warm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader title="About Feel Good Foundation" subtitle="Founded with a mission to uplift communities, Feel Good Foundation has been serving society through organized camps, awareness programs, and direct assistance." />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10">
              {[
                { title: "Our Mission", text: "To create sustainable change by empowering communities through health, safety, education, and food security initiatives." },
                { title: "Our Vision", text: "A world where every individual has access to healthcare, safety, education, and dignified living regardless of ability, age, or gender." },
                { title: "Our Values", text: "Compassion, integrity, inclusivity, and transparency guide every action we take for the community." },
              ].map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="bg-card rounded-xl p-6 border border-border shadow-warm">
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
