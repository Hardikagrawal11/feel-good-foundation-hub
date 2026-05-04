import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { CreditCard, Building2, Download, CheckCircle, Heart, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import jsPDF from "jspdf";

const DonatePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  const purpose = searchParams.get("purpose") || "General Donation";
  const [method, setMethod] = useState<"card" | "bank">("card");
  const [step, setStep] = useState<"form" | "receipt">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [amount, setAmount] = useState("");

  // Auto-redirect if user tries to access this page directly without login
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/signin");
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  const receiptData = {
    id: `FGF-${Date.now().toString(36).toUpperCase()}`,
    date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    name: user?.fullName || "Valued Donor",
    email: user?.primaryEmailAddress?.emailAddress || "",
    amount,
    purpose,
  };

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    setIsSubmitting(true);

    try {
      // Replace with your actual backend URL
      const response = await fetch("http://localhost:5000/api/campaigns/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName: receiptData.name,
          email: receiptData.email,
          amount,
          purpose,
          transactionId: receiptData.id,
          paymentMethod: method
        }),
      });

      if (response.ok) {
        setStep("receipt");
      } else {
        // For local testing, we proceed to receipt even if backend is offline
        setStep("receipt");
      }
    } catch (error) {
      console.error("Backend offline, showing receipt locally...");
      setStep("receipt");
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadReceipt = () => {
    const doc = new jsPDF();
    doc.setFillColor(103, 112, 59);
    doc.rect(0, 0, 210, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("Feel Good Foundation", 105, 25, { align: "center" });
    
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(16);
    doc.text("Donation Receipt", 105, 55, { align: "center" });
    doc.line(20, 62, 190, 62);

    const details = [
      ["Donor Name:", receiptData.name],
      ["Donor Email:", receiptData.email],
      ["Transaction ID:", receiptData.id],
      ["Date:", receiptData.date],
      ["Purpose:", receiptData.purpose],
      ["Amount:", `INR ${receiptData.amount}.00`],
    ];

    let y = 75;
    details.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.text(label, 25, y);
      doc.setFont("helvetica", "normal");
      doc.text(value, 75, y);
      y += 12;
    });

    doc.setFontSize(10);
    doc.text("Thank you for your kindness! This is an auto-generated receipt.", 105, y + 20, { align: "center" });
    doc.save(`Receipt_${receiptData.id}.pdf`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-20">
        <div className="container mx-auto px-4">
          {step === "form" ? (
            <div className="max-w-md mx-auto">
              <SectionHeader title="Complete Donation" subtitle={`Supporting: ${purpose}`} />
              <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleDonate} className="bg-card p-8 rounded-2xl border border-border shadow-lg">
                <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Signed in as</p>
                  <p className="font-bold text-foreground">{user?.fullName}</p>
                  <p className="text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Amount (₹)</label>
                  <input required value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className="w-full bg-background border border-input rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary" placeholder="Enter amount" />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  <button type="button" onClick={() => setMethod("card")} className={`py-3 rounded-lg border text-sm font-bold transition-all ${method === "card" ? "bg-primary text-white border-primary" : "border-border"}`}>Card</button>
                  <button type="button" onClick={() => setMethod("bank")} className={`py-3 rounded-lg border text-sm font-bold transition-all ${method === "bank" ? "bg-primary text-white border-primary" : "border-border"}`}>UPI/Bank</button>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-gold text-primary-foreground py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <><Heart size={18} /> Donate ₹{amount || "0"}</>}
                </button>
              </motion.form>
            </div>
          ) : (
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="max-w-md mx-auto text-center">
              <CheckCircle className="mx-auto text-olive mb-4" size={64} />
              <h2 className="text-3xl font-bold mb-6">Thank You, {user?.firstName}!</h2>
              <div className="bg-card p-6 rounded-xl border border-border shadow-md text-left mb-6">
                <p className="text-sm text-muted-foreground mb-1">Receipt ID</p>
                <p className="font-mono font-bold mb-4">{receiptData.id}</p>
                <p className="text-sm text-muted-foreground mb-1">Amount</p>
                <p className="font-bold text-xl text-primary">₹{amount}</p>
              </div>
              <button onClick={downloadReceipt} className="w-full bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                <Download size={18} /> Download PDF
              </button>
            </motion.div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DonatePage;