import { motion } from "framer-motion";
import { Shield, Phone, BookOpen, Users, Heart, Package, AlertTriangle, Scale, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import DonateButton from "@/components/DonateButton";
import SectionHeader from "@/components/SectionHeader";
import womenImg from "@/assets/women-safety.jpg";
import sanitaryImg from "@/assets/sanitary-awareness.jpg";

const resources = [
  { title: "Women Helpline", detail: "181 (24/7)", icon: Phone },
  { title: "Safety Awareness", detail: "Monthly workshops & rallies", icon: BookOpen },
  { title: "Self-Defense Training", detail: "Free weekend sessions in communities", icon: Shield },
  { title: "Support Groups", detail: "Weekly counseling & legal aid", icon: Users },
];

const safetyWork = [
  { icon: AlertTriangle, title: "Anti-Harassment Campaigns", desc: "We conduct street-level awareness drives and poster campaigns educating communities about harassment laws, bystander intervention, and reporting mechanisms." },
  { icon: Scale, title: "Legal Aid & Counseling", desc: "Our partnered lawyers and counselors provide free legal advice, FIR guidance, and emotional support to women facing domestic violence, workplace harassment, or any form of abuse." },
  { icon: Shield, title: "Self-Defense Workshops", desc: "Monthly self-defense training camps are organized in collaboration with martial arts instructors, empowering women and girls with practical safety skills." },
  { icon: Users, title: "Community Watch Networks", desc: "We help neighborhoods set up women-safety watch groups that patrol sensitive areas, escort women during late hours, and coordinate with local police." },
];

const hygieneWork = [
  { icon: Package, title: "Free Sanitary Pad Distribution", desc: "We distribute over 10,000 sanitary pads monthly to women and girls in rural areas, slums, and schools—ensuring no girl misses school due to periods." },
  { icon: BookOpen, title: "Menstrual Health Education", desc: "Our trained educators visit schools, colleges, and community centers to conduct interactive sessions on menstrual health, hygiene practices, and myth-busting." },
  { icon: Heart, title: "Breaking the Stigma", desc: "Through street plays, social media campaigns, and community dialogues, we normalize conversations around menstruation and fight deep-rooted taboos." },
  { icon: CheckCircle, title: "Eco-Friendly Alternatives", desc: "We promote and distribute reusable cloth pads and menstrual cups, educating women on sustainable hygiene options that are cost-effective and environment-friendly." },
];

const WomenWelfare = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageBanner
      title="Women & Girls Welfare"
      subtitle="Empowering women through safety, education, menstrual hygiene awareness, and community support."
      image={womenImg}
      purpose="Women & Girls Welfare"
    />

    {/* Resources Quick Cards */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader title="Resources & Helplines" subtitle="Immediate resources available for women in need of support." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {resources.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-xl p-6 border border-border shadow-warm text-center hover:shadow-warm-lg transition-all">
              <r.icon className="mx-auto mb-3 text-primary" size={32} />
              <h3 className="font-heading font-semibold text-foreground mb-1">{r.title}</h3>
              <p className="text-sm text-muted-foreground">{r.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Women Safety Work */}
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <SectionHeader title="Women Safety — What We Do" subtitle="Our on-ground initiatives to create a safer environment for women and girls." />
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {safetyWork.map((item, i) => (
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
      </div>
    </section>

    {/* Sanitary Awareness */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 items-center mb-12">
            <div className="md:col-span-2">
              <img src={sanitaryImg} alt="Sanitary Awareness" className="rounded-2xl shadow-warm-lg w-full h-64 object-cover" loading="lazy" />
            </div>
            <div className="md:col-span-3">
              <SectionHeader title="Menstrual Hygiene Awareness" subtitle="Breaking taboos and ensuring every woman and girl has access to menstrual hygiene products and education." centered={false} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {hygieneWork.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-xl p-6 border border-border shadow-warm hover:shadow-warm-lg transition-all flex gap-4">
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
        </div>
        <div className="text-center mt-12">
          <DonateButton purpose="Women & Girls Welfare" size="lg" />
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default WomenWelfare;
