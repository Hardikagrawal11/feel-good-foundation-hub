import { motion } from "framer-motion";
import { TreePine, Droplets, Lightbulb, Users, BookOpen, Building, Hammer, HeartHandshake } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import DonateButton from "@/components/DonateButton";
import SectionHeader from "@/components/SectionHeader";
import CampaignsSection from "@/components/CampaignsSection";
import communityImg from "@/assets/community-dev.jpg";

const programs = [
  { icon: TreePine, title: "Green Community Drives", desc: "We've planted 15,000+ trees across urban and rural areas. Our tree plantation drives involve schools, colleges, and corporate volunteers, turning barren lands into green lungs." },
  { icon: Droplets, title: "Clean Water & Sanitation", desc: "Installation of water purification units, community bore-wells, and public toilet blocks in underserved areas. We've brought clean water access to 3,000+ families." },
  { icon: Lightbulb, title: "Solar Lighting Projects", desc: "Solar street lights and home lighting kits for off-grid rural communities and urban slums, improving safety and enabling children to study after dark." },
  { icon: BookOpen, title: "Adult Literacy Programs", desc: "Evening literacy classes for adults who missed formal education. Over 500 adults have gained basic reading, writing, and numeracy skills through our program." },
  { icon: Hammer, title: "Infrastructure Building", desc: "Community halls, school repairs, playground construction, and road improvement projects carried out in collaboration with local panchayats and municipal bodies." },
  { icon: Users, title: "Youth Leadership Camps", desc: "Annual leadership and civic responsibility camps for youth aged 16–25, covering public speaking, community organizing, first aid, and social entrepreneurship." },
  { icon: Building, title: "Micro-Enterprise Support", desc: "We provide micro-loans, business training, and market access to self-help groups and aspiring entrepreneurs from marginalized communities—especially women." },
  { icon: HeartHandshake, title: "Disaster Relief & Preparedness", desc: "Rapid response teams for flood, fire, and earthquake relief. Community preparedness workshops train volunteers in first aid, evacuation protocols, and emergency kit preparation." },
];

const CommunityDevelopment = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageBanner
      title="Community Development"
      subtitle="Building stronger, self-reliant communities through infrastructure, education, sustainability, and collaborative efforts."
      image={communityImg}
      purpose="Community Development"
    />

    <section className="py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader title="Our Community Initiatives" subtitle="From planting trees to building infrastructure, our programs address the holistic needs of communities." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {programs.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-card rounded-xl p-6 border border-border shadow-warm hover:shadow-warm-lg transition-all flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/50 flex items-center justify-center shrink-0">
                <item.icon className="text-olive" size={24} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <DonateButton purpose="Community Development" size="lg" />
        </div>
      </div>
    </section>

    <CampaignsSection domain="Community Development" />
    <Footer />
  </div>
);

export default CommunityDevelopment;
