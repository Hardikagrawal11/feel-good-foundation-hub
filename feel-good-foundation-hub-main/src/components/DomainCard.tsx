import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface DomainCardProps {
  title: string;
  description: string;
  image: string;
  path: string;
  icon: LucideIcon;
  index: number;
}

const DomainCard = ({ title, description, image, path, icon: Icon, index }: DomainCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
  >
    <Link to={path} className="group block">
      <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-warm hover:shadow-warm-lg transition-all duration-500 group-hover:-translate-y-2">
        <div className="relative h-48 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/90 flex items-center justify-center text-primary-foreground">
              <Icon size={20} />
            </div>
            <h3 className="font-heading text-lg font-bold text-secondary">{title}</h3>
          </div>
        </div>
        <div className="p-5">
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
            Learn More <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default DomainCard;
