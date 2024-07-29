import * as React from "react";
import { useState } from "react";
import { Accordion } from "../accordion";
import { useSite } from "../../hooks/queries/useSite";
import PageAccordionItem from "./PageAccordionItem";
import PageSelector from "./PageSelector";
import { DndNavigation } from "./DndNavigation";
import { HeaderPage } from "../../types/yext";

interface SiteDashboardProps {
  siteId: string;
}

const SiteDashboard = ({ siteId }: SiteDashboardProps) => {
  const { data: site, isLoading } = useSite(siteId);
  const [pageSelectorOpen, setPageSelectorOpen] = useState(false);
  const [isDndMode, setIsDndMode] = useState(false);
  const [headerItems, setHeaderItems] = useState<HeaderPage[]>([]);

  React.useEffect(() => {
    if (site && site.c_header) {
      setHeaderItems(site.c_header);
    }
  }, [site]);

  const handleOrderChange = (newItems: HeaderPage[]) => {
    setHeaderItems(newItems);
  };

  const handleSave = () => {
    setIsDndMode(false);
    console.log("New structure:", headerItems);
    // Here you would typically send the new structure to your backend
  };

  return (
    <div className="grid grid-cols-2 bg-white p-8 min-h-[700px]">
      <div>Site Preview</div>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 flex justify-between items-center sm:px-6">
          <h2 className="text-lg font-semibold leading-6 text-gray-900">
            Edit Website
          </h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => (isDndMode ? handleSave() : setIsDndMode(true))}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isDndMode ? "Save" : "Edit Navigation"}
            </button>
            {site && (
              <PageSelector
                site={site}
                open={pageSelectorOpen}
                onOpenChange={setPageSelectorOpen}
              />
            )}
          </div>
        </div>
        {site && (
          <div className="py-5">
            {isDndMode ? (
              <DndNavigation
                items={headerItems}
                onOrderChange={handleOrderChange}
              />
            ) : (
              <Accordion type="multiple" collapsible className="w-full">
                {headerItems.map((headerItem) => (
                  <PageAccordionItem key={headerItem.title} page={headerItem} />
                ))}
              </Accordion>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteDashboard;
