import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";
import { getEntity } from "./[id]/page";
import {
  SiteEntity,
  YextListResponse,
  YextResponse,
} from "../../../../types/yext";

export default async function site(
  request: PagesHttpRequest
): Promise<PagesHttpResponse> {
  const { method, pathParams } = request;
  const siteEntityId = pathParams.id;
  if (!siteEntityId) {
    return { body: "Missing entity id", headers: {}, statusCode: 400 };
  }

  switch (method) {
    case "GET":
      // 1. Get the site entity
      const siteResponse = await getEntity<SiteEntity>(siteEntityId);
      const site = siteResponse?.response;

      if (!site) {
        return { body: "Site not found", headers: {}, statusCode: 400 };
      }

      // 2. Get the page entities for the site header
      const pageIds: string[] = site.c_header
        .flatMap((item: any) => (item.page ? item.page : []))
        .filter(Boolean);
      const filterString = JSON.stringify({
        entityId: { $in: pageIds },
      });

      const pageEntitiesResponse = await getEntities<any>(filterString);
      const pageEntities = pageEntitiesResponse?.response?.entities || [];

      // Create a map of pageId to page entity
      const pageEntitiesMap = new Map(
        pageEntities.map((entity: any) => [entity.meta.id, entity])
      );

      // Replace the page ids with the actual page entities in the site response
      const updatedHeader = site.c_header.map((item: any) => {
        if (item.page) {
          const pages = item.page
            .map((pageId: string) => pageEntitiesMap.get(pageId))
            .filter(Boolean);
          return { ...item, page: pages };
        }
        return item;
      });

      const updatedSiteResponse = {
        ...site,
        c_header: updatedHeader,
      };

      return {
        body: JSON.stringify(updatedSiteResponse),
        headers: {},
        statusCode: 200,
      };
    default:
      return { body: "Method not allowed", headers: {}, statusCode: 405 };
  }
}

// <------ API Utils ------>
export const getEntities = async <T>(
  filterString?: string,
  entityType?: string
): Promise<YextListResponse<T> | null> => {
  let reqStr = `https://api.yextapis.com/v2/accounts/me/entities?api_key=${YEXT_PUBLIC_API_KEY}&v=20230901`;
  if (filterString) {
    reqStr += `&filter=${filterString}`;
  }
  if (entityType) {
    reqStr += `&entityType=${entityType}`;
  }

  const mgmtApiResp = await fetch(reqStr);

  const resp = await mgmtApiResp.json();

  if (mgmtApiResp.status === 404) {
    return null;
  }

  return resp;
};
