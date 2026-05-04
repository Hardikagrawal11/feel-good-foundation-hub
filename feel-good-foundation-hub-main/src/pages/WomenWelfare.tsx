import { useEffect, useState } from "react"; // Added for dynamic data
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Phone, BookOpen, Users, Heart, Package, AlertTriangle, Scale, CheckCircle, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import DonateButton from "@/components/DonateButton";
import SectionHeader from "@/components/SectionHeader";
import CampaignCard from "@/components/CampaignCard"; // new dynamic card component
import womenImg from "@/assets/Womenwellfare.jpeg"; // Local image for the banner
import sanitaryImg from "@/assets/sanitary-awareness.jpg";

const resources = [
  { title: "Women Helpline", detail: "181 (24/7)", icon: Phone },
  { title: "Safety Awareness", detail: "Monthly workshops & rallies", icon: BookOpen },
  { title: "Self-Defense Training", detail: "Free weekend sessions in communities", icon: Shield },
  { title: "Support Groups", detail: "Weekly counseling & legal aid", icon: Users },
];

const safetyWork = [
  { icon: AlertTriangle, title: "Anti-Harassment Campaigns", desc: "Awareness drives educating communities about harassment laws and reporting mechanisms." },
  { icon: Scale, title: "Legal Aid & Counseling", desc: "Partnered lawyers providing free legal advice and FIR guidance for women facing abuse." },
  { icon: Shield, title: "Self-Defense Workshops", desc: "Monthly training camps organized in collaboration with martial arts instructors." },
  { icon: Users, title: "Community Watch Networks", desc: "Neighborhood women-safety groups that coordinate with local police." },
];

const hygieneWork = [
  { icon: Package, title: "Free Sanitary Pad Distribution", desc: "Distributing over 10,000 pads monthly to rural areas and schools." },
  { icon: BookOpen, title: "Menstrual Health Education", desc: "Interactive sessions on hygiene practices and myth-busting in schools." },
];

const WomenWelfare = () => {
  // --- DYNAMIC DATA LOGIC START ---
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        // Fetching specifically for "Women safety" domain
        const response = await fetch("http://localhost:5000/api/campaigns?domain=Women safety");
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching Women Welfare campaigns:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);
  // --- DYNAMIC DATA LOGIC END ---

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageBanner
        title="Women & Girls Welfare"
        subtitle="Empowering women through safety, education, menstrual hygiene awareness, and community support."
        image={womenImg}
        purpose="Women & Girls Welfare"
      />

      {/* 1. DYNAMIC CAMPAIGNS SECTION (New) */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Active Women Welfare Programs" 
            subtitle="Current live initiatives you can join and support right now." 
          />
          
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-primary" size={40} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <AnimatePresence>
                {campaigns.length > 0 ? (
                  campaigns.map((camp: any) => (
                    <motion.div key={camp._id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                      <CampaignCard campaign={camp} />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 border-2 border-dashed rounded-[2rem] bg-gray-50">
                    <p className="text-muted-foreground italic font-bold">No active Women Welfare camps found at the moment.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* 2. Resources Quick Cards */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <SectionHeader title="Resources & Helplines" subtitle="Immediate resources available for women in need of support." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {resources.map((r, i) => (
              <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-xl p-6 border border-border shadow-sm text-center">
                <r.icon className="mx-auto mb-3 text-primary" size={32} />
                <h3 className="font-heading font-semibold mb-1">{r.title}</h3>
                <p className="text-xs text-muted-foreground font-bold">{r.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Women Safety Work (Static Info) */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeader title="Our On-Ground Initiatives" subtitle="How we work to create a safer environment." centered={true} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-10">
            {safetyWork.map((item, i) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border flex gap-4">
                <item.icon className="text-primary shrink-0" size={24} />
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Menstrual Hygiene (Static Info) */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center mb-12">
              <img src={sanitaryImg} alt="Hygiene" className="md:col-span-2 rounded-3xl h-64 w-full object-cover shadow-xl" />
              <div className="md:col-span-3">
                <SectionHeader title="Menstrual Hygiene Awareness" subtitle="Breaking taboos and providing access to education." centered={false} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hygieneWork.map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-6 border flex gap-4">
                  <item.icon className="text-primary shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-16">
              <DonateButton purpose="Women & Girls Welfare" size="lg" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WomenWelfare;