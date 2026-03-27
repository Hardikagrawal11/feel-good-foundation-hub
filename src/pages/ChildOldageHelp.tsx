import { motion } from "framer-motion";
import { Baby, Heart, GraduationCap, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import DonateButton from "@/components/DonateButton";
import SectionHeader from "@/components/SectionHeader";
import childImg from "@/assets/child-oldage.jpg";

const programs = [
  { icon: GraduationCap, title: "Education Support", desc: "Providing school supplies, tuition, and mentorship to underprivileged children." },
  { icon: Home, title: "Old Age Home Visits", desc: "Regular visits to old age homes with essential supplies and companionship." },
  { icon: Baby, title: "Child Welfare", desc: "Nutrition, healthcare, and developmental programs for children in need." },
  { icon: Heart, title: "Volunteer Opportunities", desc: "Join our team of dedicated volunteers making a difference daily." },
];

const ChildOldageHelp = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageBanner
      title="Child & Old Age Help"
      subtitle="Caring for the youngest and eldest members of our community with love, dignity, and dedicated support."
      image={childImg}
      purpose="Child & Old Age Help"
    />

    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader title="Our Programs" subtitle="Comprehensive care and support programs for children and the elderly." />
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {programs.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border shadow-warm hover:shadow-warm-lg transition-all flex gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <DonateButton purpose="Child & Old Age Help" size="lg" />
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default ChildOldageHelp;
