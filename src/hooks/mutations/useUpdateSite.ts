import { useMutation, useQuery } from "@tanstack/react-query";
import { Site } from "../../types/yext";

interface ReqBody {
  navSection: string;
  parentPageId: string;
}

// TODO: update serverless and client code to use the new API
const updateSite = async (siteId: string, req: ReqBody): Promise<Site> => {
  const response = await fetch(`/api/site/${siteId}/page`, {
    method: "PUT",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const useUpdateSite = (siteId: string, req: ReqBody) => {
  return useMutation({
    mutationKey: ["updateSite"],
    mutationFn: () => updateSite(siteId, req),
  });
};

export { useUpdateSite };
