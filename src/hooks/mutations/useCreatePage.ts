import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ReqBody {
  navSection: string;
  parentPageId: string;
}

interface CreatePageVariables {
  siteId: string;
  req: ReqBody;
}

const createPage = async ({
  siteId,
  req,
}: CreatePageVariables): Promise<void> => {
  await fetch(`/api/site/${siteId}/page`, {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useCreatePage = () => {
  const queryClient = useQueryClient();

  const createPageMutation = useMutation({
    mutationKey: ["createPage"],
    mutationFn: async (variables: CreatePageVariables) => {
      await createPage(variables);
      return variables;
    },
    onSettled: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["site", data?.siteId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["shared-pages", data?.siteId],
      });
    },
  });

  return createPageMutation;
};

export { useCreatePage };
