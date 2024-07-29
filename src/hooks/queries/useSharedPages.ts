import { useQuery } from "@tanstack/react-query";
import { PageEntity, Site } from "../../types/yext";

const fetchSharedPages = async (siteId?: string): Promise<PageEntity[]> => {
  let reqUrl = "/api/shared-pages";
  if (siteId) {
    reqUrl += `?siteId=${siteId}`;
  }
  const response = await fetch(reqUrl);
  const data = await response.json();
  return data;
};

const useSharedPages = (siteId?: string) => {
  return useQuery({
    queryKey: ["shared-pages", siteId],
    queryFn: () => fetchSharedPages(siteId),
    enabled: !!siteId,
  });
};

export { useSharedPages };
