import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";
import {
  FinancialProfessionalEntity,
  LayoutEntity,
  PageEntity,
  SiteEntity,
  YextResponse,
} from "../../../../../types/yext";

export default async function page(
  request: PagesHttpRequest
): Promise<PagesHttpResponse> {
  const { method, pathParams, body } = request;
  const siteEntityId = pathParams.id;
  if (!siteEntityId) {
    return { body: "Missing entity id", headers: {}, statusCode: 400 };
  }

  const reqBody = JSON.parse(body);
  const parentPageId = reqBody.parentPageId;

  switch (method) {
    case "POST":
      try {
        if (!siteEntityId) {
          return {
            body: "Missing site entity id",
            headers: {},
            statusCode: 400,
          };
        }
        if (!parentPageId) {
          return {
            body: "Missing parent page id",
            headers: {},
            statusCode: 400,
          };
        }
        // 1. Check if Site exists
        const site = await getEntity<SiteEntity>(siteEntityId);

        if (!site) {
          return { body: "Site not found", headers: {}, statusCode: 400 };
        }

        // 2. Check if the page already exists
        const exists = await checkIfPageExists(siteEntityId, parentPageId);

        if (exists) {
          return { body: "Page already exists", headers: {}, statusCode: 400 };
        }

        // 3. Fetch the parent page
        const parentPage = await getEntity<PageEntity>(parentPageId);

        if (!parentPage) {
          return {
            body: "Parent page not found",
            headers: {},
            statusCode: 400,
          };
        }

        // 4. Fetch the related Financial Professional entity
        if (
          !site.response.c_linkedFinancialProfessional ||
          site.response.c_linkedFinancialProfessional.length === 0
        ) {
          return {
            body: "No linked Financial Professional found",
            headers: {},
            statusCode: 500,
          };
        }
        const financialProfessional =
          await getEntity<FinancialProfessionalEntity>(
            site.response.c_linkedFinancialProfessional[0]
          );
        if (!financialProfessional) {
          return {
            body: "Financial Professional not found",
            headers: {},
            statusCode: 500,
          };
        }

        // Steps 5 & 6 are required because the current VE UI does not support
        // setting the layout on the base entity at the moment but this will change in the future

        // 5. Fetch the Layout Entity for the Parent Page
        if (
          !parentPage.response.c_pages_layouts ||
          parentPage.response.c_pages_layouts.length === 0
        ) {
          return {
            body: "Parent page has no layout",
            headers: {},
            statusCode: 500,
          };
        }

        const layout = await getEntity<LayoutEntity>(
          parentPage.response.c_pages_layouts[0]
        );
        if (!layout) {
          return { body: "Layout not found", headers: {}, statusCode: 500 };
        }

        // 6. Create a new Layout Entity
        const layoutRequest = buildNewLayoutRequest(
          site.response,
          financialProfessional.response,
          layout?.response
        );
        console.log("Layout Request: ", layoutRequest);

        const { response: newLayout } = await createEntity<LayoutEntity>(
          "ce_pagesLayout",
          layoutRequest
        );

        // 7. Create a new Page Entity
        const pageRequest = buildNewPageRequest(
          site.response,
          financialProfessional.response,
          parentPage.response,
          newLayout
        );

        const response = await createEntity<PageEntity>("ce_page", pageRequest);

        return {
          body: JSON.stringify(response),
          headers: {},
          statusCode: 201,
        };
      } catch (error) {
        console.error(error);
        return { body: "Internal Server Error", headers: {}, statusCode: 500 };
      }

    default:
      return { body: "Method not allowed", headers: {}, statusCode: 405 };
  }
}

// site page ids in the form {siteEntityId}_{pageId}
const checkIfPageExists = async (
  siteEntityId: string,
  parentPageId: string
) => {
  const pageId = siteEntityId + "_" + parentPageId;

  console.log("Checking if page exists with id: ", pageId);
  const page = await getEntity<PageEntity>(pageId);

  if (page) {
    return true;
  } else {
    return false;
  }
};

const buildNewLayoutRequest = (
  site: SiteEntity,
  financialProfessional: FinancialProfessionalEntity,
  parentLayout: LayoutEntity
) => {
  const id = idify(financialProfessional.name) + "_" + parentLayout.meta.id;
  const name =
    financialProfessional.name + " | " + parentLayout.name + " Layout";
  const c_visualConfiguration = parentLayout.c_visualConfiguration;

  const newLayout = {
    name,
    meta: {
      id,
      folderId: site.meta.folderId,
    },
    c_visualConfiguration,
  };

  return newLayout;
};

const buildNewPageRequest = (
  site: SiteEntity,
  financialProfessional: FinancialProfessionalEntity,
  parentPage: PageEntity,
  newLayout: LayoutEntity
) => {
  const id = idify(financialProfessional.name) + "_" + parentPage.meta.id;
  const slug =
    slugify(financialProfessional.name) + "/" + slugify(parentPage.meta.id);
  const name = financialProfessional.name + " | " + parentPage.name + " Page";

  const newPage = {
    ...parentPage,
    name,
    slug,
    meta: {
      id,
      folderId: site.meta.folderId,
    },
    // body content will come from the parent page
    richTextDescriptionV2: null,
    c_pages_layouts: [newLayout.meta.id],
    c_parentPage: [parentPage.meta.id],
    c_linkedSites: [site.meta.id],
    c_childrenPages: [],
  };

  return newPage;
};

const idify = (str: string) => {
  return str.replace(/\s/g, "_").toLowerCase();
};

const slugify = (str: string) => {
  return str.replace(/[\s_]/g, "-").toLowerCase();
};

// <------ API Utils ------>
const getEntity = async <T>(
  entityId: string
): Promise<YextResponse<T> | null> => {
  const mgmtApiResp = await fetch(
    `https://api.yextapis.com/v2/accounts/me/entities/${entityId}?api_key=${YEXT_PUBLIC_API_KEY}&v=20230901`
  );

  const resp = await mgmtApiResp.json();

  if (mgmtApiResp.status === 404) {
    return null;
  }

  return resp;
};

// const updateEntity = async (
//   entityId?: string,
//   entityBody?: Record<string, any>
// ): Promise<PagesHttpResponse> => {
//   if (!entityId) {
//     return { body: "Missing entity id", headers: {}, statusCode: 400 };
//   } else if (!entityBody) {
//     return { body: "Missing entity body", headers: {}, statusCode: 400 };
//   }

//   const mgmtApiResp = await fetch(` `, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(entityBody),
//   });

//   const resp = await mgmtApiResp.json();
// };

const createEntity = async <T>(
  entityType: string,
  entityBody: Record<string, any>
): Promise<YextResponse<T>> => {
  const mgmtApiResp = await fetch(
    `https://api.yextapis.com/v2/accounts/me/entities?api_key=${YEXT_PUBLIC_API_KEY}&v=20230901&entityType=${entityType}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entityBody),
    }
  );

  const resp = await mgmtApiResp.json();

  return resp;
};
