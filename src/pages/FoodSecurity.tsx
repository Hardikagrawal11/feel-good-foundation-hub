import { motion } from "framer-motion";
import { Utensils, Truck, Wheat, Apple, HeartHandshake, Building, CalendarCheck, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import DonateButton from "@/components/DonateButton";
import SectionHeader from "@/components/SectionHeader";
import foodImg from "@/assets/food-security.jpg";

const campaigns = [
  { icon: Utensils, title: "Meals to Heal Campaign", desc: "Our flagship initiative serves 2,000+ hot, nutritious meals daily to homeless individuals, daily-wage workers, and families in crisis. Mobile kitchen vans operate across the city, reaching the most vulnerable populations.", highlight: true },
  { icon: Truck, title: "Ration Kit Distribution", desc: "Monthly ration kits containing rice, dal, oil, sugar, salt, and spices are distributed to 800+ families below the poverty line. During festivals, special kits include sweets and fresh produce." },
  { icon: Wheat, title: "Community Kitchen Program", desc: "We run 5 community kitchens in high-need areas where anyone can walk in for a free meal—no questions asked. Kitchens are staffed by volunteers and funded entirely by donations." },
  { icon: Apple, title: "School Nutrition Program", desc: "Partnering with 25 government schools, we supplement mid-day meals with fruits, eggs, and milk to combat childhood malnutrition. Regular health check-ups track nutritional outcomes." },
  { icon: HeartHandshake, title: "Food Rescue Network", desc: "We collect surplus food from restaurants, hotels, wedding caterers, and corporate canteens—redirecting it to shelters, orphanages, and old age homes before it goes to waste." },
  { icon: CalendarCheck, title: "Festival Food Drives", desc: "During Diwali, Eid, Christmas, and other festivals, large-scale food drives bring communities together. Volunteers prepare and distribute festive meals to 5,000+ beneficiaries." },
  { icon: Building, title: "Urban Farming Initiative", desc: "We help slum communities set up rooftop and balcony gardens, providing seeds, soil, and training. Over 200 families now grow their own vegetables, reducing food expenses by 30%." },
  { icon: Users, title: "Volunteer Cook Program", desc: "Home cooks volunteer to prepare meals from their kitchens, which our delivery volunteers pick up and distribute. This grassroots model has scaled to 150+ volunteer cooks city-wide." },
];

const FoodSecurity = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageBanner
      title="Food Security"
      subtitle="Fighting hunger through the 'Meals to Heal' campaign, community kitchens, and food distribution drives."
      image={foodImg}
      purpose="Food Security"
    />

    {/* Meals to Heal highlight */}
    <section className="py-16 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto bg-card rounded-2xl p-8 md:p-10 border-2 border-primary/30 shadow-warm-lg text-center">
          <Utensils className="mx-auto mb-4 text-primary" size={48} />
          <h2 className="font-heading text-3xl font-bold text-foreground mb-3">🍽️ Meals to Heal</h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-4">
            Our flagship campaign serves <span className="font-bold text-foreground">2,000+ hot meals daily</span> to homeless individuals, daily-wage workers, and families in crisis. Mobile kitchen vans operate across the city, reaching the most vulnerable—no one is turned away.
          </p>
          <div className="flex justify-center gap-8 mt-6">
            {[
              { value: "2,000+", label: "Daily Meals" },
              { value: "5", label: "Kitchen Vans" },
              { value: "730K+", label: "Meals Served (Annual)" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader title="All Food Security Initiatives" subtitle="A comprehensive approach to ensuring no one in our community goes to bed hungry." />
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {campaigns.filter(c => !c.highlight).map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-card rounded-xl p-6 border border-border shadow-warm hover:shadow-warm-lg transition-all flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-terra/10 flex items-center justify-center shrink-0">
                <item.icon className="text-terra" size={24} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <DonateButton purpose="Food Security" size="lg" />
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default FoodSecurity;
