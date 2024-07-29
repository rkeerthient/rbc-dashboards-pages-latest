import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";
import { PageEntity, SiteEntity, YextResponse } from "../../../types/yext";
import { getEntity } from "./site/[id]/page";
import { getEntities } from "./site/[id]";

export default async function sharedPages(
  request: PagesHttpRequest
): Promise<PagesHttpResponse> {
  const { method, queryParams } = request;

  const { siteId } = queryParams;

  switch (method) {
    case "GET":
      // 1. Get the corporate site entity
      const siteResponse = await getEntity<SiteEntity>("site");
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

      const pageEntitiesResponse = await getEntities<PageEntity>(filterString);
      const pageEntities = pageEntitiesResponse?.response.entities || [];

      if (siteId) {
        console.log("siteId", siteId);
        // 3. Fetch the site entity
        const advisorSiteResponse = await getEntity<SiteEntity>(siteId);
        const advisorSite = advisorSiteResponse?.response;

        if (!advisorSite) {
          return {
            body: "Site entity not found",
            headers: {},
            statusCode: 400,
          };
        }

        // 3. Get the page entities for the site header
        const advisorPageIds = advisorSite.c_header.flatMap((item) =>
          item.page ? item.page : []
        );
        const advisorFilterString = JSON.stringify({
          entityId: { $in: advisorPageIds },
        });

        const advisorPageEntitiesResponse =
          await getEntities<PageEntity>(advisorFilterString);
        const advisorPageEntities =
          advisorPageEntitiesResponse?.response.entities || [];

        // 4. Filter out the page entities that are already in the site entity
        const advisorParentPageIds = advisorPageEntities.flatMap(
          (page) => page.c_parentPage || []
        );

        const eligiblePageEntities = pageEntities.filter(
          (page) => !advisorParentPageIds.includes(page.meta.id)
        );

        return {
          body: JSON.stringify(eligiblePageEntities),
          headers: {},
          statusCode: 200,
        };
      } else {
        return {
          body: JSON.stringify(pageEntities),
          headers: {},
          statusCode: 200,
        };
      }
    default:
      return { body: "Method not allowed", headers: {}, statusCode: 405 };
  }
}
