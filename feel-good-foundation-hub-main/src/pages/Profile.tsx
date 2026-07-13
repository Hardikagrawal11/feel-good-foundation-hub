import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { User, Heart, Award, LogOut, Loader2, Shield, Users, CreditCard } from "lucide-react";
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
  const handleVolunteerToggle = async () => {
    setVolunteerLoading(true);
    try {
      const response = await fetch(`${API_URL}/volunteers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: userName, email: userEmail }),
      });
      const data = await response.json();
      if (data.success) {
        setIsVolunteer(data.user.isPermanentVolunteer);
      }
    } catch (error) {
      console.error("Failed to toggle volunteer status:", error);
    } finally {
      setVolunteerLoading(false);
    }
  };

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
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-8 rounded-[2.5rem] border shadow-xl text-center mb-10"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt={userName} className="w-20 h-20 rounded-full object-cover" />
              ) : (
                <User size={36} className="text-primary" />
              )}
            </div>
            <h1 className="text-3xl font-heading font-bold">{userName}</h1>
            <p className="text-muted-foreground mt-1">{userEmail}</p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mt-6">
              <div className="text-center">
                <p className="text-3xl font-black text-primary">{joinedCampaigns.length}</p>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Active Campaigns</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-primary">{isVolunteer ? "✓" : "—"}</p>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Permanent Volunteer</p>
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
                onClick={handleVolunteerToggle}
                disabled={volunteerLoading}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                  isVolunteer
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                {volunteerLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : isVolunteer ? (
                  "Joined ✓"
                ) : (
                  "Join Now"
                )}
              </button>
            </div>
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
