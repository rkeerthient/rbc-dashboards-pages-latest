import * as React from "react";
import { Accordion } from "../accordion";
import { useSite } from "../../hooks/queries/useSite";
import PageAccordionItem from "./PageAccordionItem";

interface SiteDashboardProps {
  siteId: string;
}

const SiteDashboard = ({ siteId }: SiteDashboardProps) => {
  const { data: site, isLoading } = useSite(siteId);

  console.log(siteId);

  console.log(site);
  return (
    <div className="grid grid-cols-2 bg-white p-8 min-h-[700px]">
      <div>Site Preview</div>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-semibold leading-6 text-gray-900">
            Edit Website
          </h2>
        </div>
        {site && (
          <div className="py-5">
            <Accordion type="multiple" collapsible className="w-full">
              {site.c_header.map((headerItem) => (
                <PageAccordionItem page={headerItem} />
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteDashboard;
