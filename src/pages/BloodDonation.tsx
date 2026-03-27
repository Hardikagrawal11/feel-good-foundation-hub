import { motion } from "framer-motion";
import { Calendar, MapPin, Phone, Droplets, Heart, Users, ClipboardCheck, Syringe, Activity } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import DonateButton from "@/components/DonateButton";
import SectionHeader from "@/components/SectionHeader";
import bloodImg from "@/assets/blood-donation.jpg";

const upcomingCamps = [
  { date: "Sunday, 06 AM", location: "Community Hall, Sector 15", contact: "+91 98765 43210" },
  { date: "Sunday, 06 AM", location: "City Hospital, Main Road", contact: "+91 98765 43211" },
  { date: "Sunday, 06 AM", location: "Town Center, Block A", contact: "+91 98765 43212" },
];

const whatWeDo = [
  { icon: Syringe, title: "Organized Blood Donation Camps", desc: "We host bi-monthly blood donation drives across colleges, corporate offices, community halls, and religious institutions. Each camp is equipped with trained phlebotomists, sterile equipment, and refreshment stations for donors." },
  { icon: Activity, title: "Emergency Blood Supply Network", desc: "Our 24/7 helpline connects patients in need of rare blood groups with registered donors in real-time. We maintain a live database of 2,000+ active donors categorized by blood type and location." },
  { icon: Users, title: "Awareness & Myth-Busting", desc: "Through street plays, social media campaigns, and school/college seminars, we debunk myths about blood donation—addressing fears, misconceptions, and cultural barriers that prevent people from donating." },
  { icon: ClipboardCheck, title: "Donor Health Screening", desc: "Every donor undergoes a comprehensive pre-donation health screening including hemoglobin testing, blood pressure check, and medical history review—ensuring both donor and recipient safety." },
  { icon: Heart, title: "Post-Donation Care & Follow-up", desc: "Donors receive refreshments, health supplements, and a thank-you kit. We follow up within 48 hours to check on their recovery and address any concerns." },
  { icon: Droplets, title: "Thalassemia & Rare Blood Support", desc: "Special drives are conducted for thalassemia patients and those needing rare blood types. We work closely with blood banks and hospitals to bridge critical supply gaps." },
];

const BloodDonation = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageBanner
      title="Blood Donation Camp"
      subtitle="Every drop counts. Join our blood donation camps and help save lives in your community."
      image={bloodImg}
      purpose="Blood Donation"
    />

    {/* What We Do */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader title="What We Do" subtitle="Our blood donation program is a lifeline for thousands. Here's how we make it happen." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {whatWeDo.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-card rounded-xl p-6 border border-border shadow-warm hover:shadow-warm-lg transition-all">
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                <item.icon className="text-destructive" size={24} />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Upcoming Camps */}
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <SectionHeader title="Upcoming Camps" subtitle="Find a camp near you and register to donate blood." />
        <div className="max-w-3xl mx-auto space-y-4">
          {upcomingCamps.map((camp, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-xl p-6 border border-border shadow-warm flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-2 text-sm font-medium text-foreground"><Calendar size={16} className="text-primary" /> {camp.date}</span>
                <span className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin size={16} /> {camp.location}</span>
                <span className="flex items-center gap-2 text-sm text-muted-foreground"><Phone size={16} /> {camp.contact}</span>
              </div>
              <DonateButton purpose="Blood Donation" size="sm" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Register Form */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader title="Register as Donor" subtitle="Fill in the form to register as a blood donor and receive notifications about upcoming camps." />
        <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto bg-card rounded-2xl p-8 border border-border shadow-warm-lg" onSubmit={(e) => e.preventDefault()}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">First Name *</label>
              <input className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring outline-none" placeholder="Enter first name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Last Name *</label>
              <input className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring outline-none" placeholder="Enter last name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Phone *</label>
              <input className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring outline-none" placeholder="Phone number" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Blood Group *</label>
              <select className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground focus:ring-2 focus:ring-ring outline-none">
                <option>Select blood group</option>
                <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Email</label>
              <input className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring outline-none" placeholder="Email address" />
            </div>
          </div>
          <button type="submit" className="mt-6 w-full bg-gradient-gold text-primary-foreground py-3 rounded-lg font-semibold shadow-warm hover:shadow-warm-lg transition-all">
            Register as Donor
          </button>
        </motion.form>
      </div>
    </section>

    <Footer />
  </div>
);

export default BloodDonation;
