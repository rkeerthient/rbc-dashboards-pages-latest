import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";
const getAssets = async (
  request: SitesHttpRequest
): Promise<SitesHttpResponse> => {
  const api_key = YEXT_PUBLIC_DEV_API_KEY as string;
 

  const getFieldsResponse = await fetch(
    `https://api.yextapis.com/v2/accounts/me/assets?v=20230601&api_key=${api_key}&limit=50`
  );

  const resp = await getFieldsResponse.json();

  return {
    body: JSON.stringify(resp),
    headers: {},
    statusCode: 200,
  };
};

export default getAssets;
