import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Admin = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    domain: "Blood donation camp",
    imageUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("http://localhost:5000/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          adminEmail: user?.primaryEmailAddress?.emailAddress
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: "success", msg: result.message });
        setFormData({ title: "", description: "", domain: "Blood donation camp", imageUrl: "" });
      } else {
        setStatus({ type: "error", msg: result.message });
      }
    } catch (error) {
      setStatus({ type: "error", msg: "Connectivity Error: Check if backend is running." });
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-20 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-10">
            <LayoutDashboard className="text-primary" size={32} />
            <h1 className="text-4xl font-heading font-bold italic tracking-tight underline decoration-primary/20">Admin Hub</h1>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card p-10 rounded-[3rem] border shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Initiative Title</label>
                <input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full bg-muted/50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary font-bold text-lg" placeholder="e.g. Nagpur Blood Drive" />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Category (Target Page)</label>
                <select value={formData.domain} onChange={(e) => setFormData({ ...formData, domain: e.target.value })} className="w-full bg-muted/50 border-none rounded-2xl px-6 py-4 outline-none font-bold">
                  <option value="Blood donation camp">Blood Donation Drives</option>
                  <option value="Child and old age help">Child & Elder Care</option>
                  <option value="Women safety">Women Welfare</option>
                  <option value="Food Security">Food Security</option>
                  <option value="Community Development">Community Development</option>
                  <option value="Differently Abled Support">Differently Abled Support</option>
                  <option value="Women sanitary awareness">Sanitary Awareness</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Mission Description</label>
                <textarea required rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full bg-muted/50 border-none rounded-2xl px-6 py-4 outline-none italic leading-relaxed" placeholder="Describe the mission details..." />
              </div>

              <AnimatePresence>
                {status && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-5 rounded-2xl flex items-center gap-4 ${status.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                    {status.type === "success" ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                    <span className="text-sm font-bold tracking-tight">{status.msg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button type="submit" disabled={loading} className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3">
                {loading ? <Loader2 className="animate-spin" /> : <><Send size={22} /> Publish Initiative</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;