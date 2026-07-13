import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Accessibility, Wrench, GraduationCap, Briefcase, Heart, Building, Users, Trophy, Loader2 } from "lucide-react";

import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import DonateButton from "@/components/DonateButton";
import SectionHeader from "@/components/SectionHeader";
import CampaignCard from "@/components/CampaignCard"; // Unified dynamic card
import abledImg from "@/assets/differently-abled.jpg";

const programs = [
  { icon: Wrench, title: "Assistive Devices", desc: "Providing wheelchairs, crutches, hearing aids, and white canes free of cost to those in need." },
  { icon: GraduationCap, title: "Inclusive Education", desc: "Funding special educators, Braille textbooks, and sign language interpreters for students." },
  { icon: Briefcase, title: "Skill & Employment", desc: "Computer training and job placement assistance tailored for people with physical disabilities." },
  { icon: Building, title: "Accessibility Advocacy", desc: "Auditing public spaces and advocating for ramps and tactile pathways in Nagpur." },
  { icon: Heart, title: "Emotional Support", desc: "Counseling sessions and peer support groups to help individuals build resilience." },
  { icon: Trophy, title: "Para-Sports", desc: "Sponsoring para-athletes and organizing wheelchair basketball tournaments." },
];

const DifferentlyAbled = () => {
  // --- DYNAMIC DATA LOGIC ---
  const [activeDrives, setActiveDrives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDrives = async () => {
      try {
        // Fetching specifically for Differently Abled domain
        const response = await fetch("http://localhost:5000/api/campaigns?domain=Differently Abled Support");
        const data = await response.json();
        setActiveDrives(data);
      } catch (error) {
        console.error("Failed to load support drives:", error);
      } finally {
        setLoading(false);
      }
    };
    getDrives();
  }, []);

  return (
    <div className="min-h-screen bg-background">

      <PageBanner
        title="Differently Abled Support"
        subtitle="Empowering the physically challenged with assistive resources, inclusive opportunities, and community support."
        image={abledImg}
        purpose="Differently Abled Support"
      />

      {/* 1. Dynamic Active Drives Section (Live from Admin Portal) */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader 
            title="Active Support Drives" 
            subtitle="Current distribution camps and support programs. Join a drive to support the cause." 
          />
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-olive" size={40} />
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {activeDrives.length > 0 ? (
                    activeDrives.map((drive: any) => (
                      <motion.div 
                        key={drive._id} 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <CampaignCard campaign={drive} />
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-16 border-2 border-dashed rounded-[3rem] bg-olive/5">
                      <p className="text-muted-foreground italic font-semibold text-lg">
                        No active distribution drives scheduled today. Regular registrations are open below.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. Static Programs Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader 
            title="Our Programs & Initiatives" 
            subtitle="A holistic approach to creating an inclusive society where every individual can thrive." 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {programs.map((item, i) => (
              <motion.div 
                key={item.title} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.05 }} 
                className="bg-card rounded-2xl p-6 border border-border shadow-sm flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-full bg-olive/10 flex items-center justify-center mb-4">
                  <item.icon className="text-olive" size={28} />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-lg">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed italic">"{item.desc}"</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <DonateButton purpose="Differently Abled Support" size="lg" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DifferentlyAbled;