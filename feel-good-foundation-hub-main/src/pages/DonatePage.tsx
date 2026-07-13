import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { CreditCard, Building2, Download, CheckCircle, Heart, Loader2, AlertCircle } from "lucide-react";

import Footer from "@/components/Footer";
import jsPDF from "jspdf";

const DonatePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <Heart size={48} className="text-primary mb-4" />
        <h2 className="text-2xl font-bold">Sign in to Donate</h2>
        <p className="text-muted-foreground mt-2">Please sign in to complete your donation.</p>
        <button onClick={() => navigate("/")} className="mt-6 bg-primary text-white px-6 py-2 rounded-lg">Back to Home</button>
      </div>
    );
  }

  const purpose = searchParams.get("purpose") || "General Donation";
  const [step, setStep] = useState<"form" | "receipt">("form");
  const [amount, setAmount] = useState("");

  const downloadReceipt = () => {
    const doc = new jsPDF();
    doc.setFillColor(103, 112, 59);
    doc.rect(0, 0, 210, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.text("Feel Good Foundation - Official Receipt", 105, 25, { align: "center" });
    doc.setTextColor(0, 0, 0);
    doc.text(`Donor: ${user?.fullName}`, 20, 60);
    doc.text(`Amount: INR ${amount}`, 20, 75);
    doc.text(`Purpose: ${purpose}`, 20, 90);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 105);
    doc.save("Donation_Receipt.pdf");
  };

  return (
    <div className="min-h-screen bg-background">

      <section className="py-24 container mx-auto px-4">
         {step === "form" ? (
           <form onSubmit={(e) => { e.preventDefault(); setStep("receipt"); }} className="max-w-md mx-auto bg-card p-8 rounded-2xl border shadow-lg">
             <h2 className="text-2xl font-bold mb-6 text-center">Complete Donation</h2>
             <input required type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border p-3 rounded-lg mb-6" placeholder="Enter amount (₹)" />
             <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold">Donate Now</button>
           </form>
         ) : (
           <div className="text-center max-w-md mx-auto">
             <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
             <h2 className="text-3xl font-bold">Thank You!</h2>
             <button onClick={downloadReceipt} className="mt-8 flex items-center justify-center gap-2 w-full bg-primary text-white py-3 rounded-xl"><Download size={18}/> Download Receipt</button>
           </div>
         )}
      </section>
      <Footer />
    </div>
  );
};
export default DonatePage;