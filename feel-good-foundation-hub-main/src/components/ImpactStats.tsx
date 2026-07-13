import { motion } from "framer-motion";
import { Droplets, Users, Baby, HandHeart, Utensils, Accessibility, Building } from "lucide-react";

const stats = [
  { icon: Droplets, value: "5000+", label: "Blood Units Donated", color: "text-destructive" },
  { icon: Users, value: "1200+", label: "Women Supported", color: "text-primary" },
  { icon: Baby, value: "3200+", label: "Children Helped", color: "text-olive" },
  { icon: HandHeart, value: "800+", label: "Elderly Served", color: "text-terra" },
  { icon: Utensils, value: "730K+", label: "Meals Served", color: "text-warm-gold-dark" },
  { icon: Accessibility, value: "400+", label: "Devices Distributed", color: "text-olive-light" },
];

const ImpactStats = () => (
  <section className="py-10 sm:py-12 md:py-16 bg-gradient-to-b from-background to-muted">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="bg-card rounded-xl p-5 text-center shadow-warm hover:shadow-warm-lg transition-all duration-300 border border-border"
          >
            <stat.icon className={`mx-auto mb-2 ${stat.color}`} size={24} />
            <p className="font-heading text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactStats;
