import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Send, CheckCircle2, AlertCircle, Loader2, Pencil, Trash2, X, Users, ChevronDown, ChevronUp, Star, Calendar, Clock, MapPin, Power, MessageCircle } from "lucide-react";

import Footer from "@/components/Footer";

const API_URL = "http://localhost:5000/api/campaigns";
const API_URL_VOLUNTEERS = "http://localhost:5000/api/volunteers";

const Admin = () => {
  const { user, isLoaded } = useUser();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loadingVolunteers, setLoadingVolunteers] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedCampaign, setExpandedCampaign] = useState<string | null>(
    location.hash ? location.hash.substring(1) : null
  );
  const [expandedVolunteer, setExpandedVolunteer] = useState<string | null>(null);
  const [campaignToDelete, setCampaignToDelete] = useState<{ id: string; title: string } | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    domain: "Blood Donation",
    imageUrl: "",
    isEvent: false,
    date: "",
    time: "",
    location: "",
    isLive: true,
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

  // Fetch permanent volunteers
  const fetchVolunteers = async () => {
    setLoadingVolunteers(true);
    try {
      const response = await fetch(API_URL_VOLUNTEERS);
      const data = await response.json();
      setVolunteers(Array.isArray(data) ? data : []);
    } catch {
      setVolunteers([]);
    } finally {
      setLoadingVolunteers(false);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      fetchAllCampaigns();
      fetchVolunteers();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (location.hash && campaigns.length > 0) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }
  }, [location.hash, campaigns]);

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
        setFormData({ title: "", description: "", domain: "Blood Donation", imageUrl: "", isEvent: false, date: "", time: "", location: "", isLive: true });
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
      isEvent: campaign.isEvent || false,
      date: campaign.date || "",
      time: campaign.time || "",
      location: campaign.location || "",
      isLive: campaign.isLive !== undefined ? campaign.isLive : true,
    });
    setStatus(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ title: "", description: "", domain: "Blood Donation", imageUrl: "", isEvent: false, date: "", time: "", location: "", isLive: true });
    setStatus(null);
  };

  // Delete with confirmation
  const confirmDelete = async () => {
    if (!campaignToDelete) return;

    try {
      const response = await fetch(`${API_URL}/${campaignToDelete.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminEmail }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: "success", msg: result.message });
        if (editingId === campaignToDelete.id) handleCancelEdit();
        fetchAllCampaigns();
      } else {
        setStatus({ type: "error", msg: result.message });
      }
    } catch {
      setStatus({ type: "error", msg: "Connectivity Error: Check if backend is running." });
    } finally {
      setCampaignToDelete(null);
    }
  };

  const handleMessageVolunteer = (volunteerPhone: string, volunteerName: string, campaign: any) => {
    if (!volunteerPhone || volunteerPhone === 'No Phone') {
      alert("This volunteer did not provide a phone number.");
      return;
    }
    
    const details = campaign.isEvent 
      ? `Date: ${campaign.date || 'TBD'}, Time: ${campaign.time || 'TBD'}, Location: ${campaign.location || 'TBD'}`
      : `Ongoing Campaign`;
      
    const text = `Hi ${volunteerName}, thank you for joining the *${campaign.title}* with Feel Good Foundation! Here are the details you'll need: ${details}. We look forward to seeing you!`;
    
    window.open(`https://wa.me/91${volunteerPhone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleToggleLive = async (campaign: any) => {
    try {
      const response = await fetch(`${API_URL}/${campaign._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...campaign, isLive: !campaign.isLive, adminEmail }),
      });
      if (response.ok) fetchAllCampaigns();
    } catch (error) {
      console.error("Failed to toggle live status");
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
                  <option value="Animal Welfare">Animal Welfare</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Image URL (Optional)</label>
                <input value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} className="w-full bg-muted/50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary font-bold text-sm" placeholder="e.g. https://images.unsplash.com/..." />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Mission Description</label>
                <textarea required rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full bg-muted/50 border-none rounded-2xl px-6 py-4 outline-none italic leading-relaxed" placeholder="Describe the mission details..." />
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-2xl border">
                <input type="checkbox" id="isEvent" checked={formData.isEvent} onChange={(e) => setFormData({ ...formData, isEvent: e.target.checked })} className="w-5 h-5 accent-primary" />
                <label htmlFor="isEvent" className="font-bold text-sm cursor-pointer">Is this a specific event? (requires Date/Time/Location)</label>
              </div>

              <AnimatePresence>
                {formData.isEvent && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-6 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Date</label>
                        <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full bg-muted/50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary font-bold text-sm text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Time</label>
                        <input value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="w-full bg-muted/50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary font-bold text-sm" placeholder="e.g. 10:00 AM - 2:00 PM" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Location</label>
                      <input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full bg-muted/50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary font-bold text-sm" placeholder="e.g. Community Hall, Wardha Road, Nagpur" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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
                    id={camp._id}
                    key={camp._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-card p-6 rounded-2xl border shadow-md text-left flex items-start gap-4 ${editingId === camp._id ? "ring-2 ring-amber-400" : ""} ${expandedCampaign === camp._id ? "ring-2 ring-blue-400" : ""}`}
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
                        {camp.isEvent && (
                          <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${camp.isLive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                            <Power size={12} /> {camp.isLive ? 'LIVE' : 'CLOSED'}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{camp.description}</p>
                      
                      {camp.isEvent && (
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs font-medium text-muted-foreground/80">
                          {camp.date && <span className="flex items-center gap-1"><Calendar size={12} /> {camp.date}</span>}
                          {camp.time && <span className="flex items-center gap-1"><Clock size={12} /> {camp.time}</span>}
                          {camp.location && <span className="flex items-center gap-1"><MapPin size={12} /> {camp.location}</span>}
                        </div>
                      )}
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
                            <div className="mt-2 bg-blue-50/50 rounded-xl p-3 space-y-2">
                              {camp.participants.map((p: any, i: number) => {
                                // Handle both old string format and new object format
                                const isOldFormat = typeof p === 'string';
                                const name = isOldFormat ? 'Unknown Name' : p.name;
                                const email = isOldFormat ? p : p.email;
                                const phone = isOldFormat ? 'No Phone' : p.phone;
                                
                                return (
                                  <div key={i} className="text-xs text-gray-700 font-medium p-3 bg-white/80 rounded-xl border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                                    <div className="flex flex-col">
                                      <span className="font-bold text-gray-900 text-sm">{i + 1}. {name}</span>
                                      <span className="text-gray-500">{email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg font-bold text-xs">
                                        {phone !== 'No Phone' ? `+91 ${phone}` : phone}
                                      </div>
                                      {phone !== 'No Phone' && (
                                        <button
                                          onClick={() => handleMessageVolunteer(phone, name, camp)}
                                          className="p-1.5 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors shadow-sm"
                                          title="Message on WhatsApp"
                                        >
                                          <MessageCircle size={16} />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 shrink-0 pt-1">
                      {camp.isEvent && (
                        <button
                          onClick={() => handleToggleLive(camp)}
                          className={`p-2.5 rounded-xl transition-colors ${camp.isLive ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-green-50 text-green-600 hover:bg-green-100"}`}
                          title={camp.isLive ? "Turn Off Event" : "Make Event Live"}
                        >
                          <Power size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleEdit(camp)}
                        className="p-2.5 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
                        title="Edit campaign"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setCampaignToDelete({ id: camp._id, title: camp.title })}
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

          {/* --- MANAGE PERMANENT VOLUNTEERS --- */}
          <div className="mt-16">
            <h2 className="text-2xl font-heading font-bold mb-8 tracking-tight flex items-center justify-center gap-2">
              <Star className="text-amber-500 fill-amber-500" size={28} />
              Permanent Volunteers <span className="text-muted-foreground text-base font-normal">({volunteers.length})</span>
            </h2>

            {loadingVolunteers ? (
              <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" size={32} /></div>
            ) : volunteers.length === 0 ? (
              <div className="bg-card p-10 rounded-2xl border text-center">
                <Users size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground font-medium">No permanent volunteers yet.</p>
              </div>
            ) : (
              <div className="space-y-4 text-left">
                {volunteers.map((vol) => (
                  <motion.div
                    key={vol._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card p-6 rounded-2xl border shadow-md flex flex-col gap-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-lg flex items-center gap-2">
                          {vol.name} <Star size={16} className="text-amber-500 fill-amber-500" />
                        </h3>
                        <p className="text-muted-foreground text-sm">{vol.email}</p>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2 shrink-0">
                        <div className="text-xs font-bold text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full flex items-center justify-center w-max">
                          Joined: {new Date(vol.joinedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </div>
                        <button
                          onClick={() => setExpandedVolunteer(expandedVolunteer === vol._id ? null : vol._id)}
                          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center sm:justify-end gap-1 transition-colors mt-1"
                        >
                          {expandedVolunteer === vol._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          {expandedVolunteer === vol._id ? "Hide Details" : "View Details"}
                        </button>
                      </div>
                    </div>

                    {expandedVolunteer === vol._id && (
                      <div className="mt-2 pt-4 border-t border-muted-foreground/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div><span className="font-bold text-muted-foreground">Phone:</span> {vol.phone || "N/A"}</div>
                        <div><span className="font-bold text-muted-foreground">Blood Group:</span> {vol.bloodGroup || "N/A"}</div>
                        <div><span className="font-bold text-muted-foreground">DOB:</span> {vol.dob || "N/A"}</div>
                        <div><span className="font-bold text-muted-foreground">ID Proof:</span> {vol.idProof || "N/A"}</div>
                        <div><span className="font-bold text-muted-foreground">Availability:</span> {vol.availability || "N/A"}</div>
                        <div><span className="font-bold text-muted-foreground">Skills:</span> {vol.skills || "N/A"}</div>
                        <div className="sm:col-span-2"><span className="font-bold text-muted-foreground">Address:</span> {vol.address || "N/A"}</div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
      <Footer />

      {/* --- CUSTOM DELETE CONFIRMATION MODAL --- */}
      <AnimatePresence>
        {campaignToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card p-6 md:p-8 rounded-[2rem] shadow-2xl max-w-md w-full border border-border"
            >
              <div className="flex items-center gap-4 mb-4 text-red-600">
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertCircle size={28} />
                </div>
                <h3 className="text-xl font-bold">Confirm Deletion</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Are you sure you want to permanently delete the campaign <strong className="text-foreground">"{campaignToDelete.title}"</strong>? This action cannot be undone.
              </p>
              <div className="flex items-center gap-3 justify-end">
                <button
                  onClick={() => setCampaignToDelete(null)}
                  className="px-5 py-2.5 rounded-xl font-bold text-sm bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-5 py-2.5 rounded-xl font-bold text-sm bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Yes, Delete it
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;