import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Stethoscope, Music, HandHeart, Phone, Users, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import DonateButton from "@/components/DonateButton";
import SectionHeader from "@/components/SectionHeader";
import CampaignCard from "@/components/CampaignCard"; // Unified dynamic card
import elderImg from "@/assets/child-oldage.jpg";

const elderWork = [
  { icon: Home, title: "Old Age Home Support", desc: "Partnering with 15+ homes to provide monthly groceries, medicines, and essential supplies." },
  { icon: Stethoscope, title: "Free Health Camps", desc: "Bi-monthly health check-ups including eye testing, BP monitoring, and diabetes screening for seniors." },
  { icon: Music, title: "Recreation & Wellness", desc: "Music therapy, yoga classes, and cultural events to keep seniors mentally active and socially engaged." },
  { icon: HandHeart, title: "Adopt-a-Grandparent", desc: "Connecting lonely seniors with caring families for regular visits, calls, and festival celebrations." },
  { icon: Phone, title: "Emergency Support", desc: "A dedicated helpline providing immediate medical assistance and food delivery for senior citizens." },
  { icon: Users, title: "Community Integration", desc: "Intergenerational events bringing children and seniors together for storytelling and meals." },
];

const ElderCare = () => {
  // --- DYNAMIC DATA LOGIC ---
  const [activeUpdates, setActiveUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getElderUpdates = async () => {
      try {
        // Fetching specifically for Child/Old Age domain
        const response = await fetch("http://localhost:5000/api/campaigns?domain=Child and old age help");
        const data = await response.json();
        setActiveUpdates(data);
      } catch (error) {
        console.error("Failed to load elder care updates:", error);
      } finally {
        setLoading(false);
      }
    };
    getElderUpdates();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageBanner
        title="Elder Care"
        subtitle="Providing compassionate care, companionship, and dignified support to senior citizens in our communities."
        image={elderImg}
        purpose="Elder Care"
      />

      {/* 1. Dynamic Live Support Updates (Live from Admin Portal) */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader 
            title="Live Support Updates" 
            subtitle="Recent distributions and ongoing companionship drives. Click 'Join Camp' to help out." 
          />
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-primary" size={40} />
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {activeUpdates.length > 0 ? (
                    activeUpdates.map((update: any) => (
                      <motion.div 
                        key={update._id} 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <CampaignCard campaign={update} />
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-16 border-2 border-dashed rounded-[3rem] bg-primary/5">
                      <p className="text-muted-foreground italic font-semibold text-lg">
                        No live campaign updates at the moment. Regular visits continue as scheduled.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. Static Program Information */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader 
            title="What We Do for Our Elders" 
            subtitle="Ensuring our senior community members live with dignity, health, and happiness." 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {elderWork.map((item, i) => (
              <motion.div 
                key={item.title} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.05 }} 
                className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="text-primary" size={28} />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-lg">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed italic">"{item.desc}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 text-center">
        <DonateButton purpose="Elder Care" size="lg" />
      </section>

      <Footer />
    </div>
  );
};

export default ElderCare;