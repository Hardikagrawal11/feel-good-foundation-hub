import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Droplets, Shield, GraduationCap, Heart, Users, Utensils, Building, ArrowRight, PawPrint } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ImpactStats from "@/components/ImpactStats";
import DomainCard from "@/components/DomainCard";
import SocialHandles from "@/components/SocialHandles";
import DonateButton from "@/components/DonateButton";
import SectionHeader from "@/components/SectionHeader";

// Image Imports
import heroBg from "@/assets/hero-bg.jpg";
import bloodImg from "@/assets/blood-donation.jpg";
import womenImg from "@/assets/women-safety.jpg";
import childImg from "@/assets/child-education.jpg";
import elderImg from "@/assets/child-oldage.jpg";
import foodImg from "@/assets/food-security.jpg";
import abledImg from "@/assets/differently-abled.jpg";
import communityImg from "@/assets/community-dev.jpg";
import animalImg from "@/assets/animal-welfare.jpg"; 

const Index = () => {
  const { isHindi } = useLanguage();

  const domains = [
    { 
      title: isHindi ? "रक्तदान शिविर" : "Blood Donation Camp", 
      description: isHindi ? "नियमित रक्तदान शिविरों का आयोजन।" : "Organizing regular blood donation camps to ensure life-saving blood supply.", 
      image: bloodImg, 
      path: "/campaigns/blood-donation", // Updated path
      icon: Droplets 
    },
    { 
      title: isHindi ? "महिला एवं बालिका कल्याण" : "Women & Girls Welfare", 
      description: isHindi ? "सुरक्षा, स्वच्छता और आत्मरक्षा प्रशिक्षण के माध्यम से महिलाओं का सशक्तिकरण।" : "Empowering women through safety, hygiene awareness, and support networks.", 
      image: womenImg, 
      path: "/campaigns/women-welfare", // Updated path
      icon: Shield 
    },
    { 
      title: isHindi ? "बाल कल्याण और शिक्षा" : "Child Welfare & Education", 
      description: isHindi ? "वंचित बच्चों के लिए शिक्षा और पुनर्वास कार्यक्रम।" : "Education access and developmental programs for underprivileged children.", 
      image: childImg, 
      path: "/campaigns/child-welfare", // Updated path
      icon: GraduationCap 
    },
    { 
      title: isHindi ? "पशु कल्याण" : "Animal Welfare", 
      description: isHindi ? "बेसहारा जानवरों का बचाव और चिकित्सा सहायता।" : "Rescuing strays and providing medical aid to our voiceless friends.", 
      image: animalImg, 
      path: "/campaigns/animal-welfare", // Updated path
      icon: PawPrint 
    },
    { 
      title: isHindi ? "बुजुर्गों की देखभाल" : "Elder Care", 
      description: isHindi ? "वरिष्ठ नागरिकों को सहायता और साथ प्रदान करना।" : "Providing compassionate care and support to senior citizens.", 
      image: elderImg, 
      path: "/campaigns/elder-care", // Updated path
      icon: Heart 
    },
    { 
      title: isHindi ? "दिव्यांग सहायता" : "Differently Abled Support", 
      description: isHindi ? "दिव्यांगों के लिए समावेशी कार्यक्रम और संसाधन।" : "Providing inclusive programs and resources for the physically challenged.", 
      image: abledImg, 
      path: "/campaigns/differently-abled", // Updated path
      icon: Users 
    },
    { 
      title: isHindi ? "खाद्य सुरक्षा" : "Food Security", 
      description: isHindi ? "सामुदायिक भोजन वितरण के माध्यम से भूख से लड़ना।" : "Fighting hunger through community food distribution drives.", 
      image: foodImg, 
      path: "/campaigns/food-security", // Updated path
      icon: Utensils 
    },
    { 
      title: isHindi ? "सामुदायिक विकास" : "Community Development", 
      description: isHindi ? "बुनियादी ढांचे और कौशल निर्माण के माध्यम से समुदायों को मजबूत करना।" : "Building stronger communities through infrastructure and skill-building.", 
      image: communityImg, 
      path: "/campaigns/community-development", // Updated path
      icon: Building 
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[85vh] flex items-center overflow-hidden">
        <img src={heroBg} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative z-10 container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl text-white">
            <h1 className="font-heading text-3xl md:text-6xl font-bold mb-6">
              {isHindi ? "फील गुड फाउंडेशन: सेवा और करुणा" : "Feel Good Foundation: Compassion in Action"}
            </h1>
            <p className="text-white/90 text-lg mb-8">
              {isHindi 
                ? "रक्तदान, महिला कल्याण और शिक्षा के माध्यम से समाज की सेवा।" 
                : "Serving the community through blood donation, welfare, and education."}
            </p>
            <div className="flex gap-4">
              <DonateButton size="lg" />
              <Link to="/about" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-lg border border-white/20">
                {isHindi ? "और जानें" : "Learn More"} <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ImpactStats />

      {/* Domains Grid */}
      <section id="campaigns" className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title={isHindi ? "हमारे कार्यक्षेत्र" : "Our Domains"} 
            subtitle={isHindi ? "हम इन क्षेत्रों में काम करते हैं।" : "We work across these key areas."} 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {domains.map((domain, i) => (
              <DomainCard key={domain.path} {...domain} index={i} />
            ))}
          </div>
        </div>
      </section>

      <SocialHandles />
    </div>
  );
};

export default Index;