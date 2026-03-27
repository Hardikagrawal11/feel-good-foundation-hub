import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Heart, ShieldAlert, Paintbrush, Home, Users, Lightbulb } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import DonateButton from "@/components/DonateButton";
import SectionHeader from "@/components/SectionHeader";
import childImg from "@/assets/child-education.jpg";

const rehabWork = [
  { icon: ShieldAlert, title: "Rescue & Rehabilitation", desc: "We work with local authorities and NGOs to identify and rescue children trapped in hazardous labor conditions—brick kilns, factories, domestic servitude, and rag-picking. Rescued children are enrolled in rehabilitation centers with counseling and medical care." },
  { icon: Home, title: "Shelter & Safe Homes", desc: "Our partner shelters provide rescued children a safe living environment with proper nutrition, healthcare, and emotional support while they reintegrate into society." },
  { icon: Users, title: "Family Reunification", desc: "Our social workers trace families and facilitate safe reunification. When families are the source of exploitation, we coordinate with child protection authorities for alternative care." },
  { icon: Lightbulb, title: "Vocational Training for Teens", desc: "For older rescued children (14–18), we offer skill-building in tailoring, computer basics, carpentry, and more—giving them a pathway to employment rather than returning to labor." },
];

const educationWork = [
  { icon: GraduationCap, title: "Scholarship Programs", desc: "We fund tuition, books, uniforms, and school fees for over 500 underprivileged children annually. Our merit-based and need-based scholarships ensure talented students aren't held back by poverty." },
  { icon: BookOpen, title: "Community Learning Centers", desc: "We run 12 after-school learning centers in underserved areas where children receive tutoring, access to computers and books, and mentorship from trained volunteers." },
  { icon: Paintbrush, title: "Creative & Extracurricular Programs", desc: "Art, music, sports, and drama workshops are organized to foster holistic development. Annual talent shows and inter-center competitions build confidence and community." },
  { icon: Heart, title: "Mid-Day Meal Program", desc: "Many children attend school hungry. Our daily mid-day meal program at partner schools ensures no child studies on an empty stomach—boosting attendance by 40%." },
];

const ChildWelfare = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageBanner
      title="Child Welfare & Education"
      subtitle="Rescuing children from labor, providing education access, and building brighter futures for the underprivileged."
      image={childImg}
      purpose="Child Welfare & Education"
    />

    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader title="Child Labor Rehabilitation" subtitle="Our multi-step approach to rescuing, rehabilitating, and reintegrating children who have been subjected to child labor." />
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {rehabWork.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-xl p-6 border border-border shadow-warm hover:shadow-warm-lg transition-all flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                <item.icon className="text-destructive" size={24} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <SectionHeader title="Education Access Programs" subtitle="Ensuring every child—regardless of background—has the right and resources to learn, grow, and dream." />
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {educationWork.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-xl p-6 border border-border shadow-warm hover:shadow-warm-lg transition-all flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
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

export default ChildWelfare;
