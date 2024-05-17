import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";
const getSuggestions = async (
  request: SitesHttpRequest
): Promise<SitesHttpResponse> => {
  const { queryParams } = request;

  const { entityType, inputString, pageToken, filterIds } = queryParams;
  const api_key = YEXT_PUBLIC_DEV_API_KEY as string;

  const getSuggestionsResponse = await fetch(
    `https://api.yextapis.com/v2/accounts/me/suggestions?v=20230601&api_key=${api_key}&limit=50`
  );

  const resp = await getSuggestionsResponse.json();

  return {
    body: JSON.stringify(resp),
    headers: {},
    statusCode: 200,
  };
};

export default getSuggestions;
