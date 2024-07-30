import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";
import { updateEntity } from "./page";

export default async function theme(
  request: PagesHttpRequest
): Promise<PagesHttpResponse> {
  const { method, pathParams, body } = request;
  const siteEntityId = pathParams.id;
  if (!siteEntityId) {
    return { body: "Missing entity id", headers: {}, statusCode: 400 };
  }

  const reqBody = JSON.parse(body);

  console.log("method", method);

  switch (method) {
    case "PUT":
      const themeId = reqBody.themeId;
      try {
        if (!siteEntityId) {
          return {
            body: "Missing site entity id",
            headers: {},
            statusCode: 400,
          };
        }
        if (!themeId) {
          return {
            body: "Missing theme",
            headers: {},
            statusCode: 400,
          };
        }

        // 1. Update the site entity with the new theme
        const themeReq = {
          c_theme: themeId,
        };
        await updateEntity(siteEntityId, themeReq);

        return { body: "", headers: {}, statusCode: 200 };
      } catch (error) {
        console.error(error);
        return { body: "Internal Server Error", headers: {}, statusCode: 500 };
      }

    default:
      return { body: "Method not allowed", headers: {}, statusCode: 405 };
  }
}
