import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NavItem, Site } from "../../types/yext";

interface ReqBody {
  headers: NavItem[];
}

interface UpdateSiteVariables {
  siteId: string;
  req: ReqBody;
}

const updateSite = async ({
  siteId,
  req,
}: UpdateSiteVariables): Promise<Site> => {
  const response = await fetch(`/api/site/${siteId}`, {
    method: "PUT",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const useUpdateSite = () => {
  const queryClient = useQueryClient();

  const updateSiteMutation = useMutation({
    mutationKey: ["updateSite"],
    mutationFn: async (variables: UpdateSiteVariables) => {
      await updateSite(variables);
      return variables.siteId;
    },
    onSettled: async (siteId) => {
      await queryClient.invalidateQueries({
        queryKey: ["site", siteId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["shared-pages", siteId],
      });
    },
  });

  return updateSiteMutation;
};

export { useUpdateSite };
