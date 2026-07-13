import { useNavigate } from "react-router-dom";
import { useAuth, useUser, useClerk } from "@clerk/clerk-react";
import { ArrowRight, Calendar, Users, Check, Loader2 } from "lucide-react";
import { useState } from "react";

interface Campaign {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  participants?: string[];
}

const API_URL = "http://localhost:5000/api/campaigns";

const CampaignCard = ({ campaign, onJoinUpdate }: { campaign: Campaign; onJoinUpdate?: () => void }) => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [joining, setJoining] = useState(false);

  const userEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase() || "";
  const hasJoined = campaign.participants?.map(p => p.toLowerCase()).includes(userEmail) || false;
  const participantCount = campaign.participants?.length || 0;

  const handleJoin = async () => {
    if (!isSignedIn) {
      openSignIn({ forceRedirectUrl: window.location.pathname });
      return;
    }

    setJoining(true);
    try {
      const endpoint = hasJoined ? "leave" : "join";
      const response = await fetch(`${API_URL}/${campaign._id}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });

      if (response.ok && onJoinUpdate) {
        onJoinUpdate();
      }
    } catch (error) {
      console.error("Failed to join/leave campaign:", error);
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all group">
      <div className="relative h-64 mb-6 overflow-hidden rounded-[2rem]">
        <img 
          src={campaign.imageUrl || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c"} 
          alt={campaign.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase">Live</div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-gray-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
          <Users size={12} /> {participantCount} Volunteer{participantCount !== 1 ? "s" : ""}
        </div>
      </div>
      
      <h3 className="text-2xl font-heading font-bold mb-2">{campaign.title}</h3>
      <p className="text-muted-foreground italic mb-6 line-clamp-2">"{campaign.description}"</p>
      
      <div className="flex items-center justify-between pt-4 border-t border-dashed">
        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
          <Calendar size={14} className="text-primary" />
          {new Date().toLocaleDateString('en-GB')}
        </div>
        <button 
          onClick={handleJoin}
          disabled={joining}
          className={`flex items-center gap-2 font-black text-sm transition-all ${
            hasJoined 
              ? "text-green-600 hover:text-red-500" 
              : "text-primary hover:gap-3"
          }`}
        >
          {joining ? (
            <><Loader2 size={16} className="animate-spin" /> Processing...</>
          ) : hasJoined ? (
            <><Check size={18} /> JOINED</>
          ) : (
            <>JOIN CAMP <ArrowRight size={18} /></>
          )}
        </button>
      </div>
    </div>
  );
};

export default CampaignCard;