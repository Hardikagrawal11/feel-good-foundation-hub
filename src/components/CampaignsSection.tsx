import { motion } from "framer-motion";
import { Calendar, MapPin, Phone } from "lucide-react";
import { useCampaigns } from "@/hooks/useCampaigns";
import { Skeleton } from "@/components/ui/skeleton";
import SectionHeader from "@/components/SectionHeader";
import DonateButton from "@/components/DonateButton";

interface CampaignsSectionProps {
  domain: string;
  title?: string;
  subtitle?: string;
  bgClass?: string;
}

const CampaignsSection = ({ domain, title = "Ongoing Campaigns & Events", subtitle = "Current initiatives and upcoming events in this domain.", bgClass = "" }: CampaignsSectionProps) => {
  const { data: campaigns, isLoading } = useCampaigns(domain);

  if (!isLoading && (!campaigns || campaigns.length === 0)) return null;

  return (
    <section className={`py-12 sm:py-16 md:py-20 ${bgClass}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader title={title} subtitle={subtitle} />
        <div className="max-w-4xl mx-auto space-y-4">
          {isLoading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))
          ) : (
            campaigns?.map((campaign, i) => (
              <motion.div key={campaign.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-xl p-6 border border-border shadow-warm hover:shadow-warm-lg transition-all">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-foreground mb-1">{campaign.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{campaign.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {campaign.date && <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Calendar size={14} className="text-primary" /> {campaign.date}</span>}
                      {campaign.location && <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin size={14} /> {campaign.location}</span>}
                      {campaign.contact && <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Phone size={14} /> {campaign.contact}</span>}
                    </div>
                  </div>
                  <DonateButton purpose={domain} size="sm" />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CampaignsSection;
