
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";
import { Target, Eye, Award, Users } from "lucide-react";

const About = () => (
  <div className="min-h-screen bg-background">

    <section className="py-10 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader title="About Feel Good Foundation" subtitle="Learn about our journey, mission, and the impact we strive to create every day." />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
          {[
            { icon: Target, title: "Our Mission", text: "To create sustainable, positive change through health, safety, and community care initiatives. We empower individuals and uplift communities through organized programs." },
            { icon: Eye, title: "Our Vision", text: "A world where every person—regardless of age, gender, or background—has access to healthcare, safety, education, and a dignified life." },
            { icon: Award, title: "Our Values", text: "Compassion, transparency, integrity, and inclusivity form the foundation of everything we do. We believe in collective action for collective good." },
            { icon: Users, title: "Our Team", text: "A passionate group of volunteers, healthcare professionals, educators, and community leaders working together to make a meaningful difference." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-5 sm:p-8 border border-border shadow-warm"
            >
              <item.icon className="text-primary mb-4" size={36} />
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default About;
