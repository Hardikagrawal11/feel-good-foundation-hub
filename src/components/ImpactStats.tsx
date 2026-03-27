import { motion } from "framer-motion";
import { Droplets, Users, Baby, HandHeart } from "lucide-react";

const stats = [
  { icon: Droplets, value: "5000+", label: "Blood Units Donated", color: "text-destructive" },
  { icon: Users, value: "1200+", label: "Women Supported", color: "text-primary" },
  { icon: Baby, value: "3200+", label: "Children Helped", color: "text-olive" },
  { icon: HandHeart, value: "800+", label: "Elderly Served", color: "text-terra" },
];

const ImpactStats = () => (
  <section className="py-16 bg-gradient-warm">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="bg-card rounded-xl p-6 text-center shadow-warm hover:shadow-warm-lg transition-all duration-300 border border-border"
          >
            <stat.icon className={`mx-auto mb-3 ${stat.color}`} size={36} />
            <p className="font-heading text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactStats;
