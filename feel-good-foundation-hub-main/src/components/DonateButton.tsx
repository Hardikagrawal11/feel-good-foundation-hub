import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

interface DonateButtonProps {
  purpose: string;
  size?: "sm" | "md" | "lg";
}

const DonateButton = ({ purpose, size = "md" }: DonateButtonProps) => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isSignedIn) {
      // If user isn't signed in, send them to the sign-in page first
      navigate("/signin");
    } else {
      // If signed in, go directly to the donation form
      navigate(`/donate?purpose=${encodeURIComponent(purpose)}`);
    }
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-10 py-4 text-lg",
  };

  return (
    <button
      onClick={handleClick}
      className={`${sizeClasses[size]} bg-primary text-white rounded-full font-bold shadow-md hover:bg-primary/90 transition-all active:scale-95`}
    >
      Donate Now
    </button>
  );
};

export default DonateButton;