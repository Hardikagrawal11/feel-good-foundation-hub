import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, BookOpen, Heart, ShieldAlert, Paintbrush, Home, Users, Lightbulb, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import DonateButton from "@/components/DonateButton";
import SectionHeader from "@/components/SectionHeader";
import CampaignCard from "@/components/CampaignCard"; // Unified dynamic card
import childImg from "@/assets/child-education.jpg";

const rehabWork = [
  { icon: ShieldAlert, title: "Rescue & Rehabilitation", desc: "We work with authorities to rescue children from hazardous labor conditions like brick kilns and factories." },
  { icon: Home, title: "Shelter & Safe Homes", desc: "Providing rescued children a safe environment with proper nutrition, healthcare, and emotional support." },
  { icon: Users, title: "Family Reunification", desc: "Tracing families and facilitating safe reunification or coordinating alternative care where necessary." },
  { icon: Lightbulb, title: "Vocational Training", desc: "Offering older children (14–18) skill-building in tailoring and computers to ensure a pathway to employment." },
];

const educationWork = [
  { icon: GraduationCap, title: "Scholarship Programs", desc: "Funding tuition, books, and uniforms for over 500 underprivileged children annually." },
  { icon: BookOpen, title: "Learning Centers", desc: "Running 12 after-school centers where children receive tutoring and mentorship from trained volunteers." },
  { icon: Paintbrush, title: "Creative Workshops", desc: "Art, music, and sports programs organized to foster holistic development and build confidence." },
  { icon: Heart, title: "Mid-Day Meal Program", desc: "Ensuring no child studies on an empty stomach—boosting attendance and nutrition in partner schools." },
];

const ChildWelfare = () => {
  // --- DYNAMIC DATA LOGIC ---
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitiatives = async () => {
      try {
        // Fetching specifically for Child/Old Age domain
        const response = await fetch("http://localhost:5000/api/campaigns?domain=Child and old age help");
        const data = await response.json();
        setInitiatives(data);
      } catch (error) {
        console.error("Failed to load child welfare data:", error);
      } finally {
        setLoading(false);
      }
    };
    getInitiatives();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageBanner
        title="Child Welfare & Education"
        subtitle="Rescuing children from labor, providing education access, and building brighter futures."
        image={childImg}
        purpose="Child Welfare & Education"
      />

      {/* 1. Dynamic Initiatives Section (Live from Admin Portal) */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader 
            title="Current Live Programs" 
            subtitle="Active initiatives currently being conducted. Click 'Join Camp' to contribute." 
          />
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-primary" size={40} />
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {initiatives.length > 0 ? (
                    initiatives.map((item: any) => (
                      <motion.div 
                        key={item._id} 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <CampaignCard campaign={item} />
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-16 border-2 border-dashed rounded-[3rem] bg-muted/20">
                      <p className="text-muted-foreground italic font-semibold">
                        No active child welfare camps found. All centers are running on regular schedules.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. Static Info Section: Rehabilitation */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader title="Child Labor Rehabilitation" subtitle="Our approach to rescuing and reintegrating children." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {rehabWork.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-6 border shadow-sm flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                  <item.icon className="text-red-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Static Info Section: Education */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader title="Education Access Programs" subtitle="Ensuring every child has the right to learn and dream." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {educationWork.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-6 border shadow-sm flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <DonateButton purpose="Child Welfare & Education" size="lg" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ChildWelfare;