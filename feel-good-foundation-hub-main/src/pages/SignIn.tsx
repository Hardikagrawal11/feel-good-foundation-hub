import { SignIn } from "@clerk/clerk-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center pt-32 pb-20">
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-primary hover:bg-primary/90 text-sm normal-case',
            },
          }}
          // If they came here via the Donate button, they should go to Donate.
          // If they came via the Navbar, they go to Admin (handled by Navbar forceRedirect).
          signUpForceRedirectUrl="/admin-portal"
          fallbackRedirectUrl="/donate"
        />
      </div>
      <Footer />
    </div>
  );
};

export default SignInPage;