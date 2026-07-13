import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TreePine, Droplets, Lightbulb, Users, BookOpen, Building, Hammer, HeartHandshake, Loader2 } from "lucide-react";

import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import DonateButton from "@/components/DonateButton";
import SectionHeader from "@/components/SectionHeader";
import CampaignCard from "@/components/CampaignCard"; // Unified dynamic card
import communityImg from "@/assets/community-dev.jpg";

const programs = [
  { icon: TreePine, title: "Green Community Drives", desc: "We've planted 15,000+ trees across urban and rural areas involving schools and corporate volunteers." },
  { icon: Droplets, title: "Clean Water & Sanitation", desc: "Installation of water purification units and community bore-wells in underserved areas." },
  { icon: Lightbulb, title: "Solar Lighting Projects", desc: "Solar street lights and home kits for off-grid rural communities, improving safety after dark." },
  { icon: BookOpen, title: "Adult Literacy Programs", desc: "Evening literacy classes for adults who missed formal education. Over 500 adults have graduated." },
  { icon: Hammer, title: "Infrastructure Building", desc: "Community halls, school repairs, and playground construction in collaboration with local bodies." },
  { icon: Building, title: "Micro-Enterprise Support", desc: "Providing micro-loans and business training to aspiring entrepreneurs from marginalized communities." },
];

const CommunityDevelopment = () => {
  // --- DYNAMIC DATA LOGIC ---
  const [liveProjects, setLiveProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        // Fetching specifically for Community Development domain
        const response = await fetch("http://localhost:5000/api/campaigns?domain=Community Development");
        const data = await response.json();
        setLiveProjects(data);
      } catch (error) {
        console.error("Failed to load community projects:", error);
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  return (
    <div className="min-h-screen bg-background">

      <PageBanner
        title="Community Development"
        subtitle="Building stronger, self-reliant communities through infrastructure, education, and sustainability."
        image={communityImg}
        purpose="Community Development"
      />

      {/* 1. Dynamic Initiatives Section (Live from Admin Portal) */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader 
            title="Live Community Projects" 
            subtitle="Real-time updates on our current ground-level activities. Join a project to help." 
          />
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-olive" size={40} />
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {liveProjects.length > 0 ? (
                    liveProjects.map((project: any) => (
                      <motion.div 
                        key={project._id} 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <CampaignCard campaign={project} />
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-16 border-2 border-dashed rounded-[3rem] bg-accent/10">
                      <p className="text-muted-foreground italic font-semibold">
                        No live project updates at this moment. Our core programs are running as listed below.
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
            title="Our Community Initiatives" 
            subtitle="Addressing the holistic needs of communities through proven, long-term programs." 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {programs.map((item, i) => (
              <motion.div 
                key={item.title} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.05 }} 
                className="bg-card rounded-2xl p-6 border border-border shadow-sm flex gap-4 items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-olive/10 flex items-center justify-center shrink-0">
                  <item.icon className="text-olive" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <DonateButton purpose="Community Development" size="lg" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommunityDevelopment;