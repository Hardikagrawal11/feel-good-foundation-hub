const API_URL = "http://localhost:5000/api/campaigns";

// Function to fetch campaigns from MongoDB
export const fetchCampaigns = async (domain = "") => {
  try {
    const url = domain ? `${API_URL}?domain=${domain}` : API_URL;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return [];
  }
};

// Function for Admin to post a new campaign
export const createCampaign = async (campaignData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(campaignData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating campaign:", error);
    return { success: false, message: "Server connection failed" };
  }
};