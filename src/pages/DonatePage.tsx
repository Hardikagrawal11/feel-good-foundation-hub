import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, Building2, Download, CheckCircle, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import jsPDF from "jspdf";

const DonatePage = () => {
  const [searchParams] = useSearchParams();
  const purpose = searchParams.get("purpose") || "General";
  const [method, setMethod] = useState<"card" | "bank">("card");
  const [step, setStep] = useState<"form" | "receipt">("form");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const receiptData = {
    id: `FGF-${Date.now().toString(36).toUpperCase()}`,
    date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    name,
    email,
    amount,
    purpose,
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && amount) setStep("receipt");
  };

  const downloadReceipt = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Feel Good Foundation", 105, 25, { align: "center" });
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Donation Receipt", 105, 35, { align: "center" });
    doc.line(20, 42, 190, 42);

    const lines = [
      ["Transaction ID:", receiptData.id],
      ["Date:", receiptData.date],
      ["Donor Name:", receiptData.name],
      ["Email:", receiptData.email || "N/A"],
      ["Amount:", `₹${receiptData.amount}`],
      ["Purpose:", receiptData.purpose],
      ["Payment Method:", method === "card" ? "Credit/Debit Card" : "Bank Transfer"],
    ];

    let y = 55;
    lines.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(label, 25, y);
      doc.setFont("helvetica", "normal");
      doc.text(value, 80, y);
      y += 10;
    });

    doc.line(20, y + 5, 190, y + 5);
    doc.setFontSize(10);
    doc.text("Thank you for your generous contribution!", 105, y + 15, { align: "center" });
    doc.text("Feel Good Foundation | info@feelgoodfoundation.org", 105, y + 22, { align: "center" });

    doc.save(`FGF-Receipt-${receiptData.id}.pdf`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-20">
        <div className="container mx-auto px-4">
          {step === "form" ? (
            <>
              <SectionHeader title="Make a Donation" subtitle={`Your generous contribution to "${purpose}" helps us create lasting impact.`} />
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleDonate}
                className="max-w-lg mx-auto bg-card rounded-2xl p-8 border border-border shadow-warm-lg"
              >
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring outline-none" placeholder="Your full name" />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring outline-none" placeholder="Your email" />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-1">Amount (₹) *</label>
                  <input value={amount} onChange={(e) => setAmount(e.target.value)} required type="number" min="1" className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring outline-none" placeholder="Enter amount" />
                  <div className="flex gap-2 mt-2">
                    {["500", "1000", "2500", "5000"].map((a) => (
                      <button key={a} type="button" onClick={() => setAmount(a)} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${amount === a ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary"}`}>
                        ₹{a}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-3">Payment Method</label>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setMethod("card")} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-all ${method === "card" ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary"}`}>
                      <CreditCard size={18} /> Credit Card
                    </button>
                    <button type="button" onClick={() => setMethod("bank")} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-all ${method === "bank" ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary"}`}>
                      <Building2 size={18} /> Bank Transfer
                    </button>
                  </div>
                </div>

                {method === "card" && (
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Card Number</label>
                      <input className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring outline-none" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Expiry</label>
                        <input className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring outline-none" placeholder="MM/YY" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">CVV</label>
                        <input className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring outline-none" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}

                {method === "bank" && (
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Account Holder</label>
                      <input className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring outline-none" placeholder="Account holder name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Bank Name</label>
                      <input className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring outline-none" placeholder="Bank name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">IFSC Code</label>
                      <input className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring outline-none" placeholder="IFSC code" />
                    </div>
                  </div>
                )}

                <button type="submit" className="w-full bg-gradient-gold text-primary-foreground py-3 rounded-lg font-semibold shadow-warm hover:shadow-warm-lg transition-all flex items-center justify-center gap-2">
                  <Heart size={18} /> Donate ₹{amount || "0"}
                </button>
              </motion.form>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto text-center">
              <CheckCircle className="mx-auto mb-4 text-olive" size={64} />
              <h2 className="font-heading text-3xl font-bold text-foreground mb-2">Thank You!</h2>
              <p className="text-muted-foreground mb-8">Your donation has been received. Here's your auto-generated receipt.</p>

              <div className="bg-card rounded-2xl p-8 border border-border shadow-warm-lg text-left mb-6">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4 text-center">Donation Receipt</h3>
                <div className="w-16 h-0.5 bg-gradient-gold mx-auto rounded-full mb-6" />
                <div className="space-y-3">
                  {[
                    ["Transaction ID", receiptData.id],
                    ["Date", receiptData.date],
                    ["Donor", receiptData.name],
                    ["Amount", `₹${receiptData.amount}`],
                    ["Purpose", receiptData.purpose],
                    ["Method", method === "card" ? "Credit/Debit Card" : "Bank Transfer"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={downloadReceipt} className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-3 rounded-lg font-semibold shadow-warm hover:shadow-warm-lg transition-all">
                <Download size={18} /> Download Receipt (PDF)
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
