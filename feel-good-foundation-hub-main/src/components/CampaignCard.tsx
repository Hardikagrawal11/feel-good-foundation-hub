import { useNavigate } from "react-router-dom";
import { useAuth, useUser, useClerk } from "@clerk/clerk-react";
import { ArrowRight, Calendar, Users, Check, Loader2, X as XIcon } from "lucide-react";
import { useState } from "react";

interface Campaign {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  domain?: string;
  participants?: string[];
  isEvent?: boolean;
  date?: string;
  time?: string;
  location?: string;
  isLive?: boolean;
}

const DOMAIN_IMAGES: Record<string, string> = {
  "Blood Donation": "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80",
  "Child Welfare": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80",
  "Elder Care": "https://images.unsplash.com/photo-1516383274235-5f42d6c6426d?auto=format&fit=crop&q=80",
  "Food Security": "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80",
  "Community Development": "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80",
  "Differently Abled": "https://images.unsplash.com/photo-1579208570378-8c970854bc23?auto=format&fit=crop&q=80",
  "Women Welfare": "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80",
  "Animal Welfare": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80"
};

const API_URL = "http://localhost:5000/api/campaigns";

const CampaignCard = ({ campaign, onJoinUpdate }: { campaign: Campaign; onJoinUpdate?: () => void }) => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [joining, setJoining] = useState(false);

  const userEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase() || "";
  const isAdmin = userEmail === "vanshikarao.c@gmail.com";
  
  // Support both old string format and new object format for participants
  const hasJoined = campaign.participants?.some(p => {
    if (typeof p === 'string') return p.toLowerCase() === userEmail;
    if ((p as any).email) return (p as any).email.toLowerCase() === userEmail;
    return false;
  }) || false;
  
  const participantCount = campaign.participants?.length || 0;
  
  const isClosed = campaign.isEvent && campaign.isLive === false;

  const [showJoinModal, setShowJoinModal] = useState(false);
  const [isHoveringLeave, setIsHoveringLeave] = useState(false);
  const [formData, setFormData] = useState({ name: user?.fullName || "", phone: "" });

  const handleJoin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isSignedIn) {
      openSignIn({ forceRedirectUrl: window.location.pathname });
      return;
    }

    if (campaign._id === "1") {
      alert("This is a sample campaign for display purposes. Please create real campaigns from the Admin Dashboard to test joining!");
      return;
    }

    // If trying to join (not leave) and modal is not open, open it
    if (!hasJoined && !showJoinModal) {
      setShowJoinModal(true);
      return;
    }

    if (!hasJoined && (!formData.name || !formData.phone)) {
      alert("Please fill in all details to join!");
      return;
    }

    setJoining(true);
    try {
      const endpoint = hasJoined ? "leave" : "join";
      const response = await fetch(`${API_URL}/${campaign._id}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: userEmail,
          name: formData.name,
          phone: formData.phone 
        }),
      });

      if (response.ok && onJoinUpdate) {
        onJoinUpdate();
        setShowJoinModal(false);
        
        // Show success message if they just joined
        if (!hasJoined) {
          alert("Successfully registered! We will send you the details on WhatsApp shortly.");
        }
      } else {
        const errorData = await response.json();
        alert(`Could not process request: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Failed to join/leave campaign:", error);
      alert("Failed to connect to the backend server. Is it running?");
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className="bg-card rounded-[2.5rem] p-6 shadow-xl border border-border hover:shadow-2xl transition-all group">
      <div className="relative h-64 mb-6 overflow-hidden rounded-[2rem]">
        <img 
          src={campaign.imageUrl || (campaign.domain ? DOMAIN_IMAGES[campaign.domain] : undefined) || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c"} 
          alt={campaign.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className={`absolute top-4 left-4 ${isClosed ? "bg-gray-600" : "bg-red-600"} text-white px-4 py-1 rounded-full text-xs font-black uppercase`}>
          {isClosed ? "Closed" : "Live"}
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-gray-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
          <Users size={12} /> {participantCount} Volunteer{participantCount !== 1 ? "s" : ""}
        </div>
      </div>
      
      <h3 className="text-2xl font-heading font-bold mb-2">{campaign.title}</h3>
      <p className="text-muted-foreground italic mb-6 line-clamp-2">"{campaign.description}"</p>
      
      <div className="flex items-center justify-between pt-4 border-t border-dashed">
        <div className="flex flex-col gap-1 text-xs font-bold text-muted-foreground">
          {campaign.isEvent ? (
            <>
              {campaign.date && <div className="flex items-center gap-2"><Calendar size={14} className="text-primary" /> {campaign.date}</div>}
              {campaign.location && <div className="flex items-center gap-2"><span className="text-primary">📍</span> {campaign.location}</div>}
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-primary" /> Ongoing
            </div>
          )}
        </div>
        {isAdmin ? (
          <button 
            onClick={() => navigate(`/admin#${campaign._id}`)}
            className="flex items-center gap-2 font-black text-sm transition-all text-blue-600 hover:gap-3"
          >
            VIEW STATS <ArrowRight size={18} />
          </button>
        ) : (
          <button 
            onClick={handleJoin}
            disabled={joining || (isClosed && !hasJoined)}
            onMouseEnter={() => hasJoined && setIsHoveringLeave(true)}
            onMouseLeave={() => hasJoined && setIsHoveringLeave(false)}
            className={`flex items-center gap-2 font-black text-sm transition-all ${
              hasJoined 
                ? "text-green-600 hover:text-red-600" 
                : isClosed
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-primary hover:gap-3"
            }`}
          >
            {joining ? (
              <><Loader2 size={16} className="animate-spin" /> Processing...</>
            ) : hasJoined ? (
              isHoveringLeave ? <><XIcon size={18} /> LEAVE CAMP</> : <><Check size={18} /> JOINED</>
            ) : isClosed ? (
              <>EVENT CLOSED</>
            ) : (
              <>JOIN CAMP <ArrowRight size={18} /></>
            )}
          </button>
        )}
      </div>

      {/* JOIN FORM MODAL */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-card p-6 md:p-8 rounded-[2rem] shadow-2xl max-w-md w-full border border-border relative">
            <button 
              onClick={() => setShowJoinModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-3">
                <Users size={24} />
              </div>
              <h3 className="text-2xl font-bold font-heading text-center">Join Campaign</h3>
              <p className="text-sm text-muted-foreground text-center mt-1">Please provide your details so we can coordinate with you via WhatsApp.</p>
            </div>

            <form onSubmit={handleJoin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Full Name</label>
                <input 
                  required
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-muted/50 border-none rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-primary font-medium"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">WhatsApp Number</label>
                <div className="flex bg-muted/50 rounded-2xl focus-within:ring-2 focus-within:ring-primary overflow-hidden">
                  <span className="flex items-center justify-center px-4 font-bold text-muted-foreground border-r border-border/50">
                    +91
                  </span>
                  <input 
                    required
                    type="tel"
                    pattern="[0-9]{10}"
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})}
                    className="w-full bg-transparent border-none px-5 py-3 outline-none font-medium"
                    placeholder="10-digit number"
                    maxLength={10}
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={joining}
                className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 mt-2"
              >
                {joining ? <><Loader2 size={18} className="animate-spin" /> Processing...</> : "Confirm Registration"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignCard;