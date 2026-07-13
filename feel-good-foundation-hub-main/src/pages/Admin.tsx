import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Send, CheckCircle2, AlertCircle, Loader2, Pencil, Trash2, X, Users, ChevronDown, ChevronUp } from "lucide-react";

import Footer from "@/components/Footer";

const API_URL = "http://localhost:5000/api/campaigns";

const Admin = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedCampaign, setExpandedCampaign] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    domain: "Blood Donation",
    imageUrl: "",
  });

  const adminEmail = user?.primaryEmailAddress?.emailAddress;

  // Fetch all campaigns on load
  const fetchAllCampaigns = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCampaigns(Array.isArray(data) ? data : []);
    } catch {
      setCampaigns([]);
    }
  };

  useEffect(() => {
    if (isLoaded) fetchAllCampaigns();
  }, [isLoaded]);

  // Create or Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const isEdit = !!editingId;
      const url = isEdit ? `${API_URL}/${editingId}` : API_URL;
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, adminEmail }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: "success", msg: result.message });
        setFormData({ title: "", description: "", domain: "Blood Donation", imageUrl: "" });
        setEditingId(null);
        fetchAllCampaigns();
      } else {
        setStatus({ type: "error", msg: result.message });
      }
    } catch (error) {
      setStatus({ type: "error", msg: "Connectivity Error: Check if backend is running." });
    } finally {
      setLoading(false);
    }
  };

  // Edit — fill form with campaign data
  const handleEdit = (campaign: any) => {
    setEditingId(campaign._id);
    setFormData({
      title: campaign.title,
      description: campaign.description,
      domain: campaign.domain,
      imageUrl: campaign.imageUrl || "",
    });
    setStatus(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ title: "", description: "", domain: "Blood Donation", imageUrl: "" });
    setStatus(null);
  };

  // Delete with confirmation
  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete campaign "${title}"? This cannot be undone.`)) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminEmail }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: "success", msg: result.message });
        if (editingId === id) handleCancelEdit();
        fetchAllCampaigns();
      } else {
        setStatus({ type: "error", msg: result.message });
      }
    } catch {
      setStatus({ type: "error", msg: "Connectivity Error: Check if backend is running." });
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-background font-sans">

      <div className="container mx-auto px-4 pt-32 pb-20 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-10">
            <LayoutDashboard className="text-primary" size={32} />
            <h1 className="text-4xl font-heading font-bold italic tracking-tight underline decoration-primary/20">Admin Hub</h1>
          </div>

          {/* --- CAMPAIGN FORM --- */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card p-10 rounded-[3rem] border shadow-2xl">
            {editingId && (
              <div className="flex items-center justify-between mb-6 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3">
                <span className="text-sm font-bold text-amber-700">✏️ Editing campaign — modify fields and save</span>
                <button onClick={handleCancelEdit} className="text-amber-600 hover:text-amber-800 transition-colors">
                  <X size={18} />
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Initiative Title</label>
                <input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full bg-muted/50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary font-bold text-lg" placeholder="e.g. Nagpur Blood Drive" />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Category (Target Page)</label>
                <select value={formData.domain} onChange={(e) => setFormData({ ...formData, domain: e.target.value })} className="w-full bg-muted/50 border-none rounded-2xl px-6 py-4 outline-none font-bold">
                  <option value="Blood Donation">Blood Donation Drives</option>
                  <option value="Child Welfare">Child Welfare</option>
                  <option value="Elder Care">Elder Care</option>
                  <option value="Food Security">Food Security</option>
                  <option value="Community Development">Community Development</option>
                  <option value="Differently Abled">Differently Abled Support</option>
                  <option value="Women Welfare">Women Welfare</option>
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

              <button type="submit" disabled={loading} className={`w-full text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 ${editingId ? "bg-amber-500 shadow-amber-500/20" : "bg-primary shadow-primary/20"}`}>
                {loading ? <Loader2 className="animate-spin" /> : editingId ? <><Pencil size={22} /> Update Initiative</> : <><Send size={22} /> Publish Initiative</>}
              </button>
            </form>
          </motion.div>

          {/* --- MANAGE EXISTING CAMPAIGNS --- */}
          {campaigns.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-heading font-bold mb-8 tracking-tight">
                📋 Manage Campaigns <span className="text-muted-foreground text-base font-normal">({campaigns.length})</span>
              </h2>

              <div className="space-y-4">
                {campaigns.map((camp) => (
                  <motion.div
                    key={camp._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-card p-6 rounded-2xl border shadow-md text-left flex items-start gap-4 ${editingId === camp._id ? "ring-2 ring-amber-400" : ""}`}
                  >
                    <div className="flex-grow min-w-0">
                      <h3 className="font-bold text-lg truncate">{camp.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="inline-block text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
                          {camp.domain}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                          <Users size={12} /> {camp.participants?.length || 0} Volunteer{(camp.participants?.length || 0) !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{camp.description}</p>
                      <p className="text-muted-foreground/50 text-xs mt-2">
                        {new Date(camp.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </p>

                      {/* Expandable volunteer list */}
                      {camp.participants?.length > 0 && (
                        <div className="mt-3">
                          <button
                            onClick={() => setExpandedCampaign(expandedCampaign === camp._id ? null : camp._id)}
                            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                          >
                            {expandedCampaign === camp._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            {expandedCampaign === camp._id ? "Hide" : "View"} Volunteer List
                          </button>
                          {expandedCampaign === camp._id && (
                            <div className="mt-2 bg-blue-50/50 rounded-xl p-3 space-y-1">
                              {camp.participants.map((email: string, i: number) => (
                                <p key={i} className="text-xs text-gray-600 font-medium">
                                  {i + 1}. {email}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 shrink-0 pt-1">
                      <button
                        onClick={() => handleEdit(camp)}
                        className="p-2.5 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
                        title="Edit campaign"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(camp._id, camp.title)}
                        className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        title="Delete campaign"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;