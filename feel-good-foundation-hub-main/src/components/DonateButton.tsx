import { useNavigate } from "react-router-dom";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";

interface DonateButtonProps {
  purpose: string;
  size?: "sm" | "md" | "lg";
}

const DonateButton = ({ purpose, size = "md" }: DonateButtonProps) => {
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  // Hide donate button for admin
  const isAdmin = user?.primaryEmailAddress?.emailAddress === "feelgoodnagpur@gmail.com";
  if (isAdmin) return null;

  const handleClick = () => {
    if (!isSignedIn) {
      openSignIn({ forceRedirectUrl: `/donate?purpose=${encodeURIComponent(purpose)}` });
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