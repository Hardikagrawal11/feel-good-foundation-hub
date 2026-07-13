import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Heart, LogOut, Loader2, Shield, Users, CreditCard, Trophy, Star, Zap } from "lucide-react";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

const Profile = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [joinedCampaigns, setJoinedCampaigns] = useState<any[]>([]);
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [volunteerLoading, setVolunteerLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    skills: "",
    availability: "Weekends",
    bloodGroup: "",
    dob: "",
    idProof: ""
  });

  const userEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase() || "";
  const userName = user?.fullName || "User";

  // Fetch campaigns the user has joined
  const fetchMyCampaigns = async () => {
    try {
      const response = await fetch(`${API_URL}/campaigns`);
      const data = await response.json();
      const myCampaigns = data.filter((camp: any) =>
        camp.participants?.map((p: string) => p.toLowerCase()).includes(userEmail)
      );
      setJoinedCampaigns(myCampaigns);
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
    }
  };

  // Check volunteer status
  const fetchVolunteerStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/volunteers/${encodeURIComponent(userEmail)}`);
      const data = await response.json();
      setIsVolunteer(data.isVolunteer);
    } catch (error) {
      console.error("Failed to check volunteer status:", error);
    }
  };

  useEffect(() => {
    if (isLoaded && userEmail) {
      Promise.all([fetchMyCampaigns(), fetchVolunteerStatus()]).finally(() => setLoading(false));
    }
  }, [isLoaded, userEmail]);

  // Leave a campaign
  const handleLeave = async (campaignId: string) => {
    try {
      await fetch(`${API_URL}/campaigns/${campaignId}/leave`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });
      fetchMyCampaigns();
    } catch (error) {
      console.error("Failed to leave campaign:", error);
    }
  };

  // Toggle permanent volunteer status
  const handleVolunteerToggle = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setVolunteerLoading(true);

    try {
      if (isVolunteer) {
        if (!window.confirm("Are you sure you want to stop being a permanent volunteer?")) {
          setVolunteerLoading(false);
          return;
        }
        const response = await fetch(`${API_URL}/volunteers`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: userName, email: userEmail, action: "leave" }),
        });
        const data = await response.json();
        if (data.success) setIsVolunteer(false);
      } else {
        const response = await fetch(`${API_URL}/volunteers`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: userName, email: userEmail, ...formData }),
        });
        const data = await response.json();
        if (data.success) {
          setIsVolunteer(true);
          setShowForm(false);
        }
      }
    } catch (error) {
      console.error("Failed to toggle volunteer status:", error);
    } finally {
      setVolunteerLoading(false);
    }
  };

  // Score Calculation
  const impactScore = (joinedCampaigns.length * 50) + (isVolunteer ? 500 : 0);
  
  // Tier Calculation
  let tier = "Bronze";
  let nextTierThreshold = 200;
  let progress = (impactScore / nextTierThreshold) * 100;
  let TierIcon = Star;
  let tierColor = "text-amber-700 bg-amber-100";

  if (impactScore >= 1500) {
    tier = "Diamond";
    nextTierThreshold = 1500;
    progress = 100;
    TierIcon = Trophy;
    tierColor = "text-cyan-600 bg-cyan-100";
  } else if (impactScore >= 700) {
    tier = "Gold";
    nextTierThreshold = 1500;
    progress = ((impactScore - 700) / (1500 - 700)) * 100;
    TierIcon = Trophy;
    tierColor = "text-yellow-600 bg-yellow-100";
  } else if (impactScore >= 200) {
    tier = "Silver";
    nextTierThreshold = 700;
    progress = ((impactScore - 200) / (700 - 200)) * 100;
    TierIcon = Shield;
    tierColor = "text-slate-600 bg-slate-200";
  }

  if (!isLoaded) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          {/* Profile Header & Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-8 rounded-[2.5rem] border shadow-xl mb-10 overflow-hidden relative"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left relative z-10">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background shadow-lg">
                  {user?.imageUrl ? (
                    <img src={user.imageUrl} alt={userName} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User size={40} className="text-primary" />
                  )}
                </div>
                {/* Badge Icon */}
                <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md border-2 border-background ${tierColor}`}>
                  <TierIcon size={14} />
                </div>
              </div>

              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                  <div>
                    <h1 className="text-3xl font-heading font-bold">{userName}</h1>
                    <p className="text-muted-foreground mt-1">{userEmail}</p>
                  </div>
                  
                  {/* Big Score Display */}
                  <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10 shrink-0">
                    <div className="flex items-center gap-2 text-primary mb-1 justify-center md:justify-start">
                      <Zap size={18} className="fill-primary" />
                      <span className="text-xs font-black uppercase tracking-widest">Impact Score</span>
                    </div>
                    <p className="text-4xl font-black text-foreground">{impactScore} <span className="text-base font-medium text-muted-foreground">pts</span></p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className={tierColor.split(' ')[0]}>{tier} Tier</span>
                    <span className="text-muted-foreground">{tier !== "Diamond" ? `${nextTierThreshold} pts to next tier` : "Max Tier Reached!"}</span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-primary rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-white/20 w-full animate-pulse" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mini Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-border/50">
              <div className="text-center p-4 bg-muted/30 rounded-2xl">
                <p className="text-3xl font-black text-foreground">{joinedCampaigns.length}</p>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-1">Active Campaigns</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-2xl">
                <p className="text-3xl font-black text-foreground">{isVolunteer ? "Yes" : "No"}</p>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-1">Permanent Volunteer</p>
              </div>
            </div>
          </motion.div>

          {/* Permanent Volunteer Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-6 rounded-2xl border shadow-md mb-10 ${isVolunteer ? "bg-green-50 border-green-200" : "bg-card"}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isVolunteer ? "bg-green-100" : "bg-primary/10"}`}>
                  <Shield size={24} className={isVolunteer ? "text-green-600" : "text-primary"} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{isVolunteer ? "Permanent Volunteer ✨" : "Become a Permanent Volunteer"}</h3>
                  <p className="text-muted-foreground text-sm">
                    {isVolunteer
                      ? "Thank you for your commitment! You're making a lasting difference."
                      : "Join our core team and get priority access to all campaigns and events."}
                  </p>
                </div>
              </div>
              <button
                onClick={() => isVolunteer ? handleVolunteerToggle() : setShowForm(!showForm)}
                disabled={volunteerLoading}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                  isVolunteer
                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                {volunteerLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : isVolunteer ? (
                  "Leave Role"
                ) : showForm ? (
                  "Cancel"
                ) : (
                  "Join Now"
                )}
              </button>
            </div>

            {/* Registration Form */}
            <AnimatePresence>
              {!isVolunteer && showForm && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-6 pt-6 border-t"
                  onSubmit={handleVolunteerToggle}
                >
                  <h4 className="font-bold mb-4">Complete your registration</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <input required type="text" placeholder="Phone Number" className="bg-muted/50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary text-sm" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    <input required type="text" placeholder="Blood Group (e.g., O+, A-)" className="bg-muted/50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary text-sm" value={formData.bloodGroup} onChange={e => setFormData({...formData, bloodGroup: e.target.value})} />
                    
                    <div className="flex flex-col">
                      <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1 mb-1">Date of Birth</label>
                      <input required type="date" className="bg-muted/50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary text-sm text-muted-foreground w-full" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
                    </div>
                    
                    <div className="flex flex-col">
                       <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1 mb-1">ID Proof</label>
                       <input required type="text" placeholder="Aadhar/PAN No." className="bg-muted/50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary text-sm h-[46px]" value={formData.idProof} onChange={e => setFormData({...formData, idProof: e.target.value})} />
                    </div>

                    <input required type="text" placeholder="Skills / Profession (e.g. Doctor, Teaching)" className="bg-muted/50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary text-sm sm:col-span-2" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} />
                    <input required type="text" placeholder="Full Address" className="bg-muted/50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary text-sm sm:col-span-2" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                    
                    <div className="sm:col-span-2">
                      <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1 mb-1">Availability</label>
                      <select className="w-full bg-muted/50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary text-sm font-medium" value={formData.availability} onChange={e => setFormData({...formData, availability: e.target.value})}>
                        <option value="Weekends">Weekends Only</option>
                        <option value="Weekdays">Weekdays</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Flexible">Flexible / On-call</option>
                      </select>
                    </div>
                  </div>
                  
                  <button type="submit" disabled={volunteerLoading} className="w-full bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                    {volunteerLoading ? <Loader2 size={18} className="animate-spin" /> : "Submit Application"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Donate Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="p-6 rounded-2xl border shadow-md mb-10 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CreditCard size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Make a Donation</h3>
                  <p className="text-muted-foreground text-sm">
                    Support our campaigns and help make a lasting difference in the community.
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/donate?purpose=General Donation")}
                className="px-6 py-3 rounded-xl font-bold text-sm bg-primary text-white hover:bg-primary/90 transition-all active:scale-95"
              >
                Donate Now
              </button>
            </div>
          </motion.div>

          {/* Active Campaigns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-3">
              <Heart size={24} className="text-primary" />
              My Active Campaigns
              <span className="text-muted-foreground text-base font-normal">({joinedCampaigns.length})</span>
            </h2>

            {joinedCampaigns.length === 0 ? (
              <div className="bg-card p-10 rounded-2xl border text-center">
                <Users size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground font-medium">You haven't joined any campaigns yet.</p>
                <p className="text-muted-foreground/60 text-sm mt-1">Visit any campaign page and click "JOIN CAMP" to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {joinedCampaigns.map((camp) => (
                  <div
                    key={camp._id}
                    className="bg-card p-5 rounded-2xl border shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex-grow min-w-0">
                      <h3 className="font-bold truncate">{camp.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
                          {camp.domain}
                        </span>
                        <span className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full flex items-center gap-1">
                          <Users size={10} /> {camp.participants?.length || 0}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm mt-2 line-clamp-1">{camp.description}</p>
                    </div>
                    <button
                      onClick={() => handleLeave(camp._id)}
                      className="shrink-0 p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                      title="Leave campaign"
                    >
                      <LogOut size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
