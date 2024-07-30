import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NavItem, Site } from "../../types/yext";
import { toast } from "../../components/my-site/ui/toast/use-toast";

interface ReqBody {
  headers: NavItem[];
}

interface UpdateSiteVariables {
  siteId: string;
  req: ReqBody;
  updateType?:
    | "addPage"
    | "removePage"
    | "addSection"
    | "removeSection"
    | "reorderNav";
  toastMessage?: string;
}

const updateSiteNav = async ({
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
  if (!response.ok) {
    throw new Error("Failed to update site");
  }
  const data = await response.json();
  return data;
};

const useUpdateSiteNav = () => {
  const queryClient = useQueryClient();

  const updateSiteMutation = useMutation({
    mutationKey: ["updateSite"],
    mutationFn: async (variables: UpdateSiteVariables) => {
      await updateSiteNav(variables);
      return variables;
    },
    onSuccess: (data) => {
      const { updateType, toastMessage } = data;
      let message = toastMessage || "Site updated successfully";

      if (!toastMessage) {
        switch (updateType) {
          case "addPage":
            message = "Page added successfully";
            break;
          case "removePage":
            message = "Page removed successfully";
            break;
          case "addSection":
            message = "Section added successfully";
            break;
          case "removeSection":
            message = "Section removed successfully";
            break;
          case "reorderNav":
            message = "Navigation reordered successfully";
            break;
        }
      }

      toast({
        title: "Success",
        description: message,
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update site. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: async (data) => {
      if (data) {
        await queryClient.invalidateQueries({
          queryKey: ["site", data.siteId],
        });
        await queryClient.invalidateQueries({
          queryKey: ["shared-pages", data.siteId],
        });
      }
    },
  });

  return updateSiteMutation;
};

export { useUpdateSiteNav };
