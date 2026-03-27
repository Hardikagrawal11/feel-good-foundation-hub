import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import BloodDonation from "./pages/BloodDonation.tsx";
import WomenSafety from "./pages/WomenSafety.tsx";
import SanitaryAwareness from "./pages/SanitaryAwareness.tsx";
import ChildOldageHelp from "./pages/ChildOldageHelp.tsx";
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
          <Route path="/women-safety" element={<WomenSafety />} />
          <Route path="/sanitary-awareness" element={<SanitaryAwareness />} />
          <Route path="/child-oldage-help" element={<ChildOldageHelp />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
