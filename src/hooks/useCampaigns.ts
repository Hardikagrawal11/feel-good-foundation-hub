import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCampaigns = (domain?: string) => {
  return useQuery({
    queryKey: ["campaigns", domain],
    queryFn: async () => {
      let query = supabase
        .from("campaigns")
        .select("*")
        .order("created_at", { ascending: false });

      if (domain) {
        query = query.eq("domain", domain);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
};
