import { useMutation, useQuery } from "@tanstack/react-query";
import { Site } from "../../types/yext";

interface ReqBody {
  navSection: string;
  parentPageId: string;
}

const createPage = async (siteId: string, req: ReqBody): Promise<Site> => {
  const response = await fetch(`/api/site/${siteId}/page`, {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const useCreatePage = (siteId: string, req: ReqBody) => {
  return useMutation({
    mutationKey: ["createPage"],
    mutationFn: () => createPage(siteId, req),
  });
};

export { useCreatePage };
