import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Droplet, PawPrint, Shield, GraduationCap, Heart, Users, Utensils, Building } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import DonateButton from "@/components/DonateButton";
import CampaignCard from "@/components/CampaignCard"; 
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@clerk/clerk-react";

const CampaignsPage = () => {
  const { domainId } = useParams(); // Gets 'blood-donation', 'animal-welfare', etc.
  const { isHindi } = useLanguage();
  const { user, isSignedIn } = useUser();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.primaryEmailAddress?.emailAddress === "vanshikarao.c@gmail.com";

  // 1. Dynamic Page Content based on URL
  const pageConfigs = {
    "blood-donation": {
      title: isHindi ? "रक्तदान" : "Blood Donation",
      icon: <Droplet className="text-red-600" />,
      color: "red",
      dbName: "Blood Donation"
    },
    "animal-welfare": {
      title: isHindi ? "पशु कल्याण" : "Animal Welfare",
      icon: <PawPrint className="text-orange-600" />,
      color: "orange",
      dbName: "Animal Welfare"
    },
    "women-welfare": {
      title: isHindi ? "महिला कल्याण" : "Women Welfare",
      icon: <Shield className="text-pink-600" />,
      color: "pink",
      dbName: "Women Welfare"
    },
    "child-welfare": {
      title: isHindi ? "बाल शिक्षा" : "Child Education",
      icon: <GraduationCap className="text-blue-600" />,
      color: "blue",
      dbName: "Child Welfare"
    },
    "elder-care": {
      title: isHindi ? "बुजुर्गों की देखभाल" : "Elder Care",
      icon: <Heart className="text-purple-600" />,
      color: "purple",
      dbName: "Elder Care"
    },
    "food-security": {
      title: isHindi ? "खाद्य सुरक्षा" : "Food Security",
      icon: <Utensils className="text-green-600" />,
      color: "green",
      dbName: "Food Security"
    },
    "community-development": {
      title: isHindi ? "सामुदायिक विकास" : "Community Development",
      icon: <Building className="text-teal-600" />,
      color: "teal",
      dbName: "Community Development"
    },
    "differently-abled": {
      title: isHindi ? "दिव्यांग सहायता" : "Differently Abled",
      icon: <Users className="text-indigo-600" />,
      color: "indigo",
      dbName: "Differently Abled"
    }
  };

  const current = pageConfigs[domainId] || pageConfigs["blood-donation"];

  // 2. Backup Data for each domain
  const backupData = [
    {
      _id: "1",
      title: `${current.title} Drive - Nagpur`,
      description: `Active ${current.title} program for community support.`,
      domain: current.dbName,
      date: "2026-06-20",
      location: "Nagpur City Center",
      image: `https://source.unsplash.com/featured/?${domainId}`
    }
  ];

  const fetchCampaigns = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/campaigns?domain=${current.dbName}`);
      const data = await response.json();
      setCampaigns(data);
    } catch (error) {
      setCampaigns(backupData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [domainId, isHindi]);

  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className={`py-24 bg-${current.color}-50/30 text-center`}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-center mb-6">
            <div className={`p-4 bg-white rounded-full shadow-lg`}>
              {current.icon}
            </div>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 italic">
            {current.title} <span className={`text-${current.color}-600`}>{isHindi ? "अभियान" : "Drives"}</span>
          </h1>
          <DonateButton purpose={`${current.title} Support`} size="lg" />
        </div>
      </section>

      {/* ACTIVE CAMPAIGNS */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader title={isHindi ? "सक्रिय अभियान" : "Active Campaigns"} subtitle={`${current.title} ${isHindi ? "के वर्तमान कार्यक्रम" : "live programs"}`} />
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {campaigns.map((camp) => <CampaignCard key={camp._id} campaign={camp} onJoinUpdate={fetchCampaigns} />)}
            </div>
          )}
        </div>
      </section>

      {/* VOLUNTEER SECTION */}
      {isSignedIn && !isAdmin && (
        <section className="container mx-auto px-4 pb-20">
          <div className={`bg-${current.color}-50 border-2 border-${current.color}-100 p-10 rounded-[3rem] text-center`}>
            <h2 className="text-3xl font-bold mb-4">{isHindi ? "स्वयंसेवक बनें" : "Become a Volunteer"}</h2>
            <button className={`bg-${current.color}-600 text-white px-10 py-4 rounded-2xl font-bold`}>
              {isHindi ? "अभी जुड़ें" : "Join Now"}
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default CampaignsPage;