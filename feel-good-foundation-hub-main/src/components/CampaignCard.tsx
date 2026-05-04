import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { ArrowRight, Calendar } from "lucide-react";

interface Campaign {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  const handleJoin = () => {
    if (!isSignedIn) {
      // Redirect to your Clerk Sign-In route
      navigate("/sign-in");
    } else {
      // Redirect to your Donation/Payment route
      navigate("/donate");
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
          className="flex items-center gap-2 text-primary font-black text-sm hover:gap-3 transition-all"
        >
          JOIN CAMP <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default CampaignCard;