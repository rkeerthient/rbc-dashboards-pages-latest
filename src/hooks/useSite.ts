import { useQuery } from "@tanstack/react-query";
import { Site } from "../types/yext";

const fetchSite = async (siteId?: string): Promise<Site> => {
  const response = await fetch(`/api/site/${siteId}`);
  const data = await response.json();
  return data;
};

const useSite = (siteId?: string) => {
  return useQuery({
    queryKey: ["site", siteId],
    queryFn: () => fetchSite(siteId),
  });
};

export { useSite };
