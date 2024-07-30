import * as React from "react";
import { useEffect, useState } from "react";
import { Accordion } from "../accordion";
import { useSite } from "../../hooks/queries/useSite";
import PageAccordionItem from "./PageAccordionItem";
import PageSelector from "./PageSelector";
import { DndNavigation } from "./DndNavigation";
import { HeaderPage } from "../../types/yext";
import { useUpdateSite } from "../../hooks/mutations/useUpdateSite";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";

interface SiteDashboardProps {
  siteId: string;
}

const SiteDashboard = ({ siteId }: SiteDashboardProps) => {
  const { data: site, isLoading } = useSite(siteId);
  const [pageSelectorOpen, setPageSelectorOpen] = useState(false);
  const [isDndMode, setIsDndMode] = useState(false);
  const [headerItems, setHeaderItems] = useState<HeaderPage[]>([]);

  const updateSiteMutation = useUpdateSite();

  useEffect(() => {
    if (site && site.c_header) {
      setHeaderItems(site.c_header);
    }
  }, [site]);

  const handleOrderChange = (newItems: HeaderPage[]) => {
    setHeaderItems(newItems);
  };

  const handleSectionNameChange = (oldName: string, newName: string) => {
    const headers = headerItems
      .map((item) => {
        if (item.title === oldName) {
          return { ...item, title: newName };
        }
        return item;
      })
      .map((item) => ({
        title: item.title,
        page: item.page ? item.page?.map((page) => page.meta.id) : [],
      }));

    updateSiteMutation.mutate({
      siteId,
      req: { headers },
    });
  };

  const handleAddSection = () => {
    const newSection: HeaderPage = {
      title: `New Section ${headerItems.length + 1}`,
      page: [],
    };
    const headers = [...headerItems, newSection].map((item) => ({
      title: item.title,
      page: item.page ? item.page?.map((page) => page.meta.id) : [],
    }));
    updateSiteMutation.mutate({
      siteId,
      req: {
        headers,
      },
    });
  };

  const handleSave = () => {
    setIsDndMode(false);
    console.log("New structure:", headerItems);
    const headers = headerItems.map((item) => ({
      title: item.title,
      page: item.page.map((page) => page.meta.id),
    }));
    console.log("New headers:", headers);
    updateSiteMutation.mutate({
      siteId,
      req: { headers },
    });
  };

  return (
    <div className="grid grid-cols-2 bg-white p-8 min-h-[700px]">
      <div>Site Preview</div>
      <div className=" divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
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
          <>
            <div className="py-5">
              {isDndMode ? (
                <DndNavigation
                  items={headerItems}
                  onOrderChange={handleOrderChange}
                />
              ) : (
                <Accordion type="multiple" collapsible className="w-full">
                  {headerItems.map((headerItem) => (
                    <PageAccordionItem
                      key={headerItem.title}
                      page={headerItem}
                      handleSectionNameChange={handleSectionNameChange}
                    />
                  ))}
                </Accordion>
              )}
            </div>
            {!isDndMode && (
              <div className="px-4 mb-4">
                <Button
                  variant={"outline"}
                  onClick={handleAddSection}
                  className="flex items-center justify-center w-full py-2 px-4"
                >
                  <Plus size={20} className="mr-2" />
                  Add New Section
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SiteDashboard;
