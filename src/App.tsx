import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import BloodDonation from "./pages/BloodDonation.tsx";
import WomenWelfare from "./pages/WomenWelfare.tsx";
import ChildWelfare from "./pages/ChildWelfare.tsx";
import ElderCare from "./pages/ElderCare.tsx";
import DifferentlyAbled from "./pages/DifferentlyAbled.tsx";
import FoodSecurity from "./pages/FoodSecurity.tsx";
import CommunityDevelopment from "./pages/CommunityDevelopment.tsx";
import DonatePage from "./pages/DonatePage.tsx";
import SignIn from "./pages/SignIn.tsx";
import About from "./pages/About.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/blood-donation" element={<BloodDonation />} />
          <Route path="/women-welfare" element={<WomenWelfare />} />
          <Route path="/child-welfare" element={<ChildWelfare />} />
          <Route path="/elder-care" element={<ElderCare />} />
          <Route path="/differently-abled" element={<DifferentlyAbled />} />
          <Route path="/food-security" element={<FoodSecurity />} />
          <Route path="/community-development" element={<CommunityDevelopment />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
