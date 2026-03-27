import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeader = ({ title, subtitle, centered = true }: SectionHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`mb-10 ${centered ? "text-center" : ""}`}
  >
    <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">{title}</h2>
    <div className="w-20 h-1 bg-gradient-gold rounded-full mx-auto mb-4" />
    {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
  </motion.div>
);

export default SectionHeader;
