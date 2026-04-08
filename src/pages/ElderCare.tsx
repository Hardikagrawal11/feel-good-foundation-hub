import { motion } from "framer-motion";
import { Heart, Home, Stethoscope, Users, Music, HandHeart, Phone, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import DonateButton from "@/components/DonateButton";
import SectionHeader from "@/components/SectionHeader";
import CampaignsSection from "@/components/CampaignsSection";
import elderImg from "@/assets/child-oldage.jpg";

const elderWork = [
  { icon: Home, title: "Old Age Home Support", desc: "We partner with 15+ old age homes across the region, providing monthly supplies of groceries, medicines, bedding, and toiletries. Our volunteers visit every weekend to offer companionship and emotional support." },
  { icon: Stethoscope, title: "Free Health Camps", desc: "Bi-monthly health check-up camps with volunteer doctors, including eye testing, blood pressure monitoring, diabetes screening, and basic dental care for senior citizens." },
  { icon: Music, title: "Recreation & Wellness", desc: "We organize music therapy sessions, yoga classes, board game afternoons, and cultural events to keep seniors mentally active, socially engaged, and emotionally fulfilled." },
  { icon: HandHeart, title: "Adopt-a-Grandparent Program", desc: "Our flagship program connects lonely seniors with caring individuals or families who commit to regular visits, phone calls, and festival celebrations—bringing joy back into their lives." },
  { icon: Phone, title: "Helpline & Emergency Support", desc: "A dedicated helpline for senior citizens provides immediate assistance with medical emergencies, food delivery, and emotional crisis support." },
  { icon: Users, title: "Community Integration", desc: "We organize intergenerational events where children and seniors come together for storytelling, craft sessions, and community meals—bridging the generation gap." },
];

const ElderCare = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageBanner
      title="Elder Care"
      subtitle="Providing compassionate care, companionship, and dignified support to senior citizens in our communities."
      image={elderImg}
      purpose="Elder Care"
    />

    <section className="py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader title="What We Do for Our Elders" subtitle="Comprehensive programs ensuring our senior community members live with dignity, health, and happiness." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {elderWork.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-card rounded-xl p-6 border border-border shadow-warm hover:shadow-warm-lg transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <DonateButton purpose="Elder Care" size="lg" />
        </div>
      </div>
    </section>

    <CampaignsSection domain="Elder Care" />
    <Footer />
  </div>
);

export default ElderCare;
