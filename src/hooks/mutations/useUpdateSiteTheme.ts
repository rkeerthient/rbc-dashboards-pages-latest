import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../../components/my-site/ui/toast/use-toast";

interface ReqBody {
  themeId: "1" | "2";
}

interface UpdateSiteThemeVariables {
  siteId: string;
  req: ReqBody;
}

const updateSiteNav = async ({
  siteId,
  req,
}: UpdateSiteThemeVariables): Promise<void> => {
  const response = await fetch(`/api/site/${siteId}/theme`, {
    method: "PUT",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to update site");
  }
};

const useUpdateSiteTheme = () => {
  const queryClient = useQueryClient();

  const updateSiteMutation = useMutation({
    mutationKey: ["updateSite"],
    mutationFn: async (variables: UpdateSiteThemeVariables) => {
      await updateSiteNav(variables);
      return variables;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Updated Theme!",
        variant: "default",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update site. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: async (data) => {
      // if (data) {
      //   await queryClient.invalidateQueries({
      //     queryKey: ["site", data.siteId],
      //   });
      //   await queryClient.invalidateQueries({
      //     queryKey: ["shared-pages", data.siteId],
      //   });
      // }
    },
  });

  return updateSiteMutation;
};

export { useUpdateSiteTheme };
