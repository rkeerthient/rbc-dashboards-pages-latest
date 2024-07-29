export interface YextResponse<T> {
  meta: {
    uuid: string;
    errors: string[];
  };
  response: T;
}

export interface YextListResponse<T> {
  meta: {
    uuid: string;
    errors: string[];
  };
  response: {
    entities: T[];
  };
}

export interface PageEntity {
  savedFilters: string[];
  slug: string;
  name: string;
  c_pageTitle: string;
  c_contentBlocks: string[];
  meta: Meta;
  richTextDescriptionV2: RTFType;
  c_pages_layouts?: string[];
  c_parentPage?: string[];
  c_childrenPages?: string[];
}

export interface LayoutEntity {
  name: string;
  meta: Meta;
  c_visualConfiguration: {
    template: string;
    data: Record<string, any>;
  };
}

export interface RTFType {
  json: Record<string, any>;
}

export interface NavItem {
  title?: string;
  page?: string[];
}

export interface SiteEntity {
  name: string;
  meta: Meta;
  c_linkedFinancialProfessional: string[];
  c_header: NavItem[];
}

export interface HeaderPage {
  title: string;
  page: PageEntity[];
}

export interface Site extends Omit<SiteEntity, "c_header"> {
  c_header: HeaderPage[];
}

export interface FinancialProfessionalEntity {
  name: string;
  meta: Meta;
}

interface Meta {
  accountId: string;
  uid: string;
  id: string;
  timestamp: string;
  createdTimestamp: string;
  folderId: string;
  language: string;
  countryCode: string;
  entityType: string;
}
