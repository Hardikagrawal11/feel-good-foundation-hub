import { motion } from "framer-motion";
import DonateButton from "./DonateButton";

interface PageBannerProps {
  title: string;
  subtitle: string;
  image: string;
  purpose: string;
}

const PageBanner = ({ title, subtitle, image, purpose }: PageBannerProps) => (
  <section className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] min-h-[280px] sm:min-h-[320px] md:min-h-[350px] flex items-center justify-center overflow-hidden">
    <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-foreground/60" />
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 text-center px-4 sm:px-6"
    >
      <h1 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold text-secondary mb-3 sm:mb-4">{title}</h1>
      <p className="text-secondary/80 max-w-2xl mx-auto mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">{subtitle}</p>
      <DonateButton purpose={purpose} size="lg" />
    </motion.div>
  </section>
);

export default PageBanner;
