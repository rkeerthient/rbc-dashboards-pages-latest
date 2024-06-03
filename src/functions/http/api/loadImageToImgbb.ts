import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";
const loadImageToImgbb = async (
  request: PagesHttpRequest
): Promise<PagesHttpResponse> => {
  const { queryParams } = request;

  const { formData } = queryParams;

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.YEXT_PUBLIC_IMGBB_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );
  const resp = await response.json();

  return {
    body: JSON.stringify(resp),
    headers: {},
    statusCode: 200,
  };
};

export default loadImageToImgbb;
