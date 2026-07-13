import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Truck, Wheat, Apple, HeartHandshake, Building, CalendarCheck, Users, Loader2 } from "lucide-react";

import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import DonateButton from "@/components/DonateButton";
import SectionHeader from "@/components/SectionHeader";
import CampaignCard from "@/components/CampaignCard"; // Unified dynamic card
import foodImg from "@/assets/food-security.jpg";

const staticInitiatives = [
  { icon: Truck, title: "Ration Kit Distribution", desc: "Monthly ration kits containing rice, dal, and oil distributed to 800+ families below poverty line." },
  { icon: Wheat, title: "Community Kitchen", desc: "We run 5 kitchens in high-need areas where anyone can walk in for a free meal—no questions asked." },
  { icon: Apple, title: "School Nutrition", desc: "Partnering with 25 schools to supplement mid-day meals with fruits and milk to combat malnutrition." },
  { icon: HeartHandshake, title: "Food Rescue Network", desc: "Collecting surplus food from hotels and weddings—redirecting it to shelters before it goes to waste." },
  { icon: CalendarCheck, title: "Festival Food Drives", desc: "Large-scale drives bringing festive meals to 5,000+ beneficiaries across Nagpur during festivals." },
  { icon: Building, title: "Urban Farming", desc: "Helping slum communities set up rooftop gardens to grow their own vegetables and reduce expenses." },
];

const FoodSecurity = () => {
  // --- DYNAMIC DATA LOGIC ---
  const [liveDrives, setLiveDrives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFoodUpdates = async () => {
      try {
        // Fetching specifically for Food Security domain
        const response = await fetch("http://localhost:5000/api/campaigns?domain=Food Security");
        const data = await response.json();
        setLiveDrives(data);
      } catch (error) {
        console.error("Failed to load food security updates:", error);
      } finally {
        setLoading(false);
      }
    };
    getFoodUpdates();
  }, []);

  return (
    <div className="min-h-screen bg-background">

      <PageBanner
        title="Food Security"
        subtitle="Fighting hunger through 'Meals to Heal', community kitchens, and sustainable food drives."
        image={foodImg}
        purpose="Food Security"
      />

      {/* 1. Meals to Heal Highlight (Core Static Program) */}
      <section className="py-16 bg-gradient-to-b from-white to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto bg-card rounded-[3rem] p-10 border-2 border-primary/20 shadow-xl text-center">
            <Utensils className="mx-auto mb-4 text-primary" size={48} />
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3 italic">Meals to Heal</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 italic">
              Our flagship campaign serves <span className="font-bold text-foreground">2,000+ hot meals daily</span> to homeless individuals and daily-wage workers across Nagpur.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { value: "2,000+", label: "Daily Meals" },
                { value: "5", label: "Kitchen Vans" },
                { value: "730K+", label: "Annual Impact" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-heading text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Dynamic Live Drives Section (Live from Admin Portal) */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader 
            title="Live Food Drives" 
            subtitle="Real-time updates on today's distribution points. Join a drive to help serve." 
          />
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-primary" size={40} />
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {liveDrives.length > 0 ? (
                    liveDrives.map((drive: any) => (
                      <motion.div key={drive._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <CampaignCard campaign={drive} />
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-16 border-2 border-dashed rounded-[3rem] bg-muted/10">
                      <p className="text-muted-foreground italic font-semibold text-lg">
                        No extra food drives scheduled for this hour. Standard kitchen vans are on route.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. Static Initiatives Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader 
            title="Sustained Food Security Programs" 
            subtitle="Our long-term approach to ensuring no one in our community goes to bed hungry." 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {staticInitiatives.map((item, i) => (
              <motion.div 
                key={item.title} 
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.05 }} 
                className="bg-card rounded-2xl p-6 border border-border shadow-sm flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed italic">"{item.desc}"</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <DonateButton purpose="Food Security" size="lg" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FoodSecurity;