import { motion } from "framer-motion";
import { Droplets, Users, Baby, HandHeart, Utensils, Accessibility, Heart, Building, Shield, GraduationCap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, React.ComponentType<any>> = {
  Droplets, Users, Baby, HandHeart, Utensils, Accessibility, Heart, Building, Shield, GraduationCap,
};

const ImpactStats = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["impact_stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("impact_stats")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <section className="py-10 sm:py-12 md:py-16 bg-gradient-warm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!stats || stats.length === 0) return null;

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-gradient-warm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon_name] || Heart;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-card rounded-xl p-5 text-center shadow-warm hover:shadow-warm-lg transition-all duration-300 border border-border"
              >
                <Icon className={`mx-auto mb-2 ${stat.color_class}`} size={24} />
                <p className="font-heading text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
