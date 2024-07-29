import * as React from "react";
import { Accordion } from "../accordion";
import { useSite } from "../../hooks/queries/useSite";
import PageAccordionItem from "./PageAccordionItem";
import PageSelector from "./PageSelector";
import { useState } from "react";

interface SiteDashboardProps {
  siteId: string;
}

const SiteDashboard = ({ siteId }: SiteDashboardProps) => {
  const { data: site, isLoading } = useSite(siteId);
  const [pageSelectorOpen, setPageSelectorOpen] = useState(false);

  return (
    <div className="grid grid-cols-2 bg-white p-8 min-h-[700px]">
      <div>Site Preview</div>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 flex justify-between sm:px-6">
          <h2 className="text-lg font-semibold leading-6 text-gray-900">
            Edit Website
          </h2>
          {site && (
            <PageSelector
              site={site}
              open={pageSelectorOpen}
              onOpenChange={setPageSelectorOpen}
            />
          )}
        </div>
        {site && (
          <div className="py-5">
            <Accordion type="multiple" collapsible className="w-full">
              {site.c_header?.map((headerItem) => (
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
