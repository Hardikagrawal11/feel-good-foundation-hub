import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Phone } from "lucide-react";
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

const BloodDonation = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageBanner
      title="Blood Donation Camp"
      subtitle="Every drop counts. Join our blood donation camps and help save lives in your community."
      image={bloodImg}
      purpose="Blood Donation"
    />

    {/* Upcoming Camps */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader title="Upcoming Camps" subtitle="Find a camp near you and register to donate blood." />
        <div className="max-w-3xl mx-auto space-y-4">
          {upcomingCamps.map((camp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border shadow-warm flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between"
            >
              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Calendar size={16} className="text-primary" /> {camp.date}
                </span>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={16} /> {camp.location}
                </span>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone size={16} /> {camp.contact}
                </span>
              </div>
              <DonateButton purpose="Blood Donation" size="sm" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Register as Donor */}
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <SectionHeader title="Register as Donor" subtitle="Fill in the form to register as a blood donor and receive notifications about upcoming camps." />
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-card rounded-2xl p-8 border border-border shadow-warm-lg"
          onSubmit={(e) => e.preventDefault()}
        >
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
