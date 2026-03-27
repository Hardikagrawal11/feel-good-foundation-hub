import { motion } from "framer-motion";
import { Accessibility, Wrench, GraduationCap, Briefcase, Heart, Building, Users, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import DonateButton from "@/components/DonateButton";
import SectionHeader from "@/components/SectionHeader";
import abledImg from "@/assets/differently-abled.jpg";

const programs = [
  { icon: Wrench, title: "Assistive Device Distribution", desc: "We provide wheelchairs, crutches, prosthetic limbs, hearing aids, and white canes free of cost to those who cannot afford them. Last year alone, we distributed 400+ devices across 8 districts." },
  { icon: GraduationCap, title: "Inclusive Education Support", desc: "We fund special educators, Braille textbooks, sign language interpreters, and accessible learning materials for differently abled students in mainstream and special schools." },
  { icon: Briefcase, title: "Skill Development & Employment", desc: "Computer training, handicraft workshops, and job placement assistance tailored for people with physical disabilities. We partner with 30+ employers committed to inclusive hiring." },
  { icon: Building, title: "Accessibility Audits & Advocacy", desc: "We work with local governments and businesses to audit public spaces for accessibility compliance and advocate for ramps, accessible washrooms, and tactile pathways." },
  { icon: Heart, title: "Emotional & Psychological Support", desc: "Regular counseling sessions, peer support groups, and motivational workshops help individuals cope with challenges, build self-esteem, and develop resilience." },
  { icon: Trophy, title: "Para-Sports & Recreation", desc: "We sponsor para-athletes, organize wheelchair basketball tournaments, and run adaptive yoga and swimming programs—proving that disability is not inability." },
  { icon: Users, title: "Caregiver Support Program", desc: "Training and respite services for family members caring for differently abled individuals, including workshops on patient care, mental health support, and community resources." },
  { icon: Accessibility, title: "Awareness & Sensitization", desc: "School and workplace sensitization programs, inclusive cultural events, and media campaigns that challenge stereotypes and promote acceptance of differently abled individuals." },
];

const DifferentlyAbled = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageBanner
      title="Differently Abled Support"
      subtitle="Empowering the physically challenged with assistive resources, inclusive opportunities, and unwavering community support."
      image={abledImg}
      purpose="Differently Abled Support"
    />

    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader title="Our Programs & Initiatives" subtitle="A holistic approach to creating an inclusive society where every individual, regardless of physical ability, can thrive." />
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {programs.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-card rounded-xl p-6 border border-border shadow-warm hover:shadow-warm-lg transition-all flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-olive/10 flex items-center justify-center shrink-0">
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
          <DonateButton purpose="Differently Abled Support" size="lg" />
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default DifferentlyAbled;
