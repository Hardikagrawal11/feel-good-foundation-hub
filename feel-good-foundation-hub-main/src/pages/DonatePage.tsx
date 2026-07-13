import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { Download, CheckCircle, Heart, Check, Building2, Calendar } from "lucide-react";

import Footer from "@/components/Footer";
import jsPDF from "jspdf";

const CAMPAIGNS = [
  "General Donation",
  "Blood Donation Support",
  "Animal Welfare Support",
  "Women Welfare Support",
  "Child Education Support",
  "Elder Care Support",
  "Food Security Support",
  "Community Development Support",
  "Differently Abled Support"
];

const PRESET_AMOUNTS = [500, 1000, 2000, 5000];

const DonatePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  const initialPurpose = searchParams.get("purpose") || "General Donation";
  
  const [step, setStep] = useState<"form" | "receipt">("form");
  const [amount, setAmount] = useState("");
  const [selectedPurpose, setSelectedPurpose] = useState(
    CAMPAIGNS.includes(initialPurpose) ? initialPurpose : "General Donation"
  );
  
  // Transaction ID mock
  const [txnId, setTxnId] = useState("");

  useEffect(() => {
    if (step === "receipt" && !txnId) {
      setTxnId(`TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
    }
  }, [step, txnId]);

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

  const handlePresetClick = (val: number) => {
    setAmount(val.toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    setStep("receipt");
  };

  const downloadReceipt = () => {
    const doc = new jsPDF();
    const dateStr = new Date().toLocaleDateString('en-IN');
    
    // Header
    doc.setFillColor(34, 197, 94); // Green brand color
    doc.rect(0, 0, 210, 40, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("DONATION RECEIPT", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Feel Good Foundation", 105, 30, { align: "center" });

    // Body
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Transaction Details", 20, 60);
    
    // Line
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 65, 190, 65);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    
    doc.text("Receipt No:", 20, 80);
    doc.setFont("helvetica", "bold");
    doc.text(txnId, 70, 80);
    
    doc.setFont("helvetica", "normal");
    doc.text("Date:", 20, 95);
    doc.setFont("helvetica", "bold");
    doc.text(dateStr, 70, 95);
    
    doc.setFont("helvetica", "normal");
    doc.text("Donor Name:", 20, 110);
    doc.setFont("helvetica", "bold");
    doc.text(user?.fullName || "Generous Donor", 70, 110);

    doc.setFont("helvetica", "normal");
    doc.text("Purpose:", 20, 125);
    doc.setFont("helvetica", "bold");
    doc.text(selectedPurpose, 70, 125);

    // Amount box
    doc.setFillColor(245, 245, 245);
    doc.rect(20, 140, 170, 30, "F");
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Total Amount Donated:", 30, 158);
    
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(34, 197, 94);
    doc.text(`INR ${amount}`, 130, 159);
    
    // Footer
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("This is a computer-generated receipt and does not require a physical signature.", 105, 260, { align: "center" });
    doc.text("Thank you for your generous support!", 105, 270, { align: "center" });

    doc.save(`FGF_Receipt_${txnId}.pdf`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <section className="flex-grow py-24 container mx-auto px-4 flex items-center justify-center">
         {step === "form" ? (
           <motion.form 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             onSubmit={handleSubmit} 
             className="w-full max-w-lg bg-card p-8 rounded-3xl border border-border shadow-2xl"
           >
             <div className="text-center mb-8">
                <Heart size={40} className="mx-auto text-primary mb-4" />
                <h2 className="text-3xl font-heading font-bold text-foreground">Make a Donation</h2>
                <p className="text-muted-foreground mt-2">Your contribution drives our mission forward.</p>
             </div>

             <div className="space-y-6">
               {/* Campaign Selection */}
               <div>
                 <label className="block text-sm font-bold text-muted-foreground mb-2">Select Campaign</label>
                 <select 
                   value={selectedPurpose} 
                   onChange={(e) => setSelectedPurpose(e.target.value)}
                   className="w-full bg-background border border-border p-3.5 rounded-xl text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
                 >
                   {CAMPAIGNS.map(camp => (
                     <option key={camp} value={camp}>{camp}</option>
                   ))}
                 </select>
               </div>

               {/* Amount */}
               <div>
                 <label className="block text-sm font-bold text-muted-foreground mb-2">Donation Amount (INR)</label>
                 <div className="relative">
                   <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">₹</span>
                   <input 
                     required 
                     type="number" 
                     min="1"
                     value={amount} 
                     onChange={(e) => setAmount(e.target.value)} 
                     className="w-full bg-background border border-border py-3.5 pl-10 pr-4 rounded-xl text-foreground text-lg font-bold focus:ring-2 focus:ring-primary outline-none transition-all" 
                     placeholder="Enter amount" 
                   />
                 </div>
               </div>

               {/* Preset Buttons */}
               <div className="grid grid-cols-4 gap-3">
                 {PRESET_AMOUNTS.map(preset => (
                   <button
                     key={preset}
                     type="button"
                     onClick={() => handlePresetClick(preset)}
                     className={`py-2 rounded-lg font-bold text-sm transition-all border ${
                       amount === preset.toString() 
                         ? "bg-primary text-white border-primary" 
                         : "bg-muted text-muted-foreground border-border hover:border-primary hover:text-primary"
                     }`}
                   >
                     ₹{preset}
                   </button>
                 ))}
               </div>

               <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/30 mt-4">
                 Proceed to Donate
               </button>
             </div>
           </motion.form>
         ) : (
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="w-full max-w-xl"
           >
             {/* Receipt Card */}
             <div className="bg-card rounded-[2rem] border border-border shadow-2xl overflow-hidden relative">
               {/* Header Ribbon */}
               <div className="bg-green-500 p-8 text-center text-white">
                 <CheckCircle className="mx-auto mb-4" size={56} />
                 <h2 className="text-3xl font-bold font-heading">Donation Successful!</h2>
                 <p className="opacity-90 mt-2">Thank you for your generosity, {user?.firstName}.</p>
               </div>

               {/* Receipt Details */}
               <div className="p-8 pb-12 relative">
                 {/* Decorative Dashed Line representing tear-off */}
                 <div className="absolute top-0 left-8 right-8 border-t-2 border-dashed border-border -mt-[1px]"></div>
                 
                 <div className="space-y-6">
                    <div className="flex justify-between items-center pb-6 border-b border-border/50">
                      <div>
                        <p className="text-sm text-muted-foreground font-semibold">Receipt Number</p>
                        <p className="font-mono font-bold text-foreground mt-1">{txnId}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground font-semibold">Date</p>
                        <p className="font-bold text-foreground mt-1 flex items-center gap-1"><Calendar size={14}/> {new Date().toLocaleDateString('en-IN')}</p>
                      </div>
                    </div>

                    <div className="pb-6 border-b border-border/50">
                      <p className="text-sm text-muted-foreground font-semibold mb-1">Supported Campaign</p>
                      <p className="text-xl font-bold text-foreground">{selectedPurpose}</p>
                    </div>

                    <div className="flex justify-between items-end pt-2">
                      <p className="text-sm text-muted-foreground font-semibold">Total Amount</p>
                      <p className="text-4xl font-black text-green-500">₹{amount}</p>
                    </div>
                 </div>
               </div>
             </div>

             {/* Actions */}
             <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button 
                  onClick={downloadReceipt} 
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg"
                >
                  <Download size={20}/> Download PDF Receipt
                </button>
                <button 
                  onClick={() => navigate("/")} 
                  className="flex-1 bg-card border-2 border-border text-foreground py-4 rounded-xl font-bold hover:bg-muted transition-all"
                >
                  Return Home
                </button>
             </div>
           </motion.div>
         )}
      </section>
      <Footer />
    </div>
  );
};

export default DonatePage;