import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplet, Loader2, ShieldCheck, Zap, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import DonateButton from "@/components/DonateButton";
import CampaignCard from "@/components/CampaignCard"; // Unified dynamic card

const BloodDonation = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBloodCampaigns = async () => {
      try {
        // Fetching specifically for Blood donation domain
        const response = await fetch("http://localhost:5000/api/campaigns?domain=Blood donation camp");
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching blood campaigns:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBloodCampaigns();
  }, []);

  const features = [
    {
      icon: <ShieldCheck className="text-red-500" size={24} />,
      title: "Safe Process",
      desc: "We follow strict WHO guidelines for all donations."
    },
    {
      icon: <Zap className="text-red-500" size={24} />,
      title: "Quick Recovery",
      desc: "Donors receive refreshment and medical supervision."
    },
    {
      icon: <Globe className="text-red-500" size={24} />,
      title: "Community Reach",
      desc: "Supplying blood to 15+ hospitals across Nagpur."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="BloodDonation.jpeg" 
            alt="Blood Donation Drive"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/30 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-red-500/50 backdrop-blur-md">
            <Droplet size={14} fill="currentColor" />
            <span>Emergency Support Available</span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-heading font-bold mb-6 text-white leading-tight italic">
            Blood Donation <span className="text-red-500 underline decoration-red-500/30">Drives</span>
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Every drop is a heartbeat. Join our community drives to ensure no life is lost due to blood scarcity in our city.
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <DonateButton purpose="Blood Donation Support" size="lg" />
          </motion.div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="relative z-20 -mt-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              className="bg-card p-8 rounded-[2.5rem] shadow-xl border border-border flex flex-col items-center text-center md:items-start md:text-left group hover:bg-red-50/50 transition-all"
            >
              <div className="mb-4 p-3 bg-red-50 rounded-xl group-hover:bg-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed italic">"{feature.desc}"</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 1. DYNAMIC INITIATIVES SECTION (Live from Admin Portal) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Current Live Drives" 
            subtitle="Active programs currently being conducted by Feel Good Foundation. Click 'Join' to participate."
          />

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-red-600 mb-4" size={44} />
              <p className="text-muted-foreground animate-pulse font-bold tracking-widest text-xs uppercase">Updating Nagpur Hub...</p>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <AnimatePresence>
                  {campaigns.length > 0 ? (
                    campaigns.map((camp: any, index) => (
                      <motion.div
                        key={camp._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CampaignCard campaign={camp} />
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-20 bg-muted/10 rounded-[40px] border-2 border-dashed border-border max-w-5xl mx-auto">
                      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Droplet className="text-red-200" size={40} />
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-foreground italic underline decoration-red-500/20">All Clear!</h3>
                      <p className="text-muted-foreground mt-3 max-w-sm mx-auto font-medium">
                        No extra campaigns listed right now. Check back soon for the next emergency drive.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BloodDonation;