import * as React from "react";
import { useEffect, useState } from "react";
import { Accordion } from "../accordion";
import { useSite } from "../../hooks/queries/useSite";
import PageAccordionItem from "./PageAccordionItem";
import PageSelector from "./PageSelector";
import { DndNavigation } from "./DndNavigation";
import { HeaderPage } from "../../types/yext";
import { useUpdateSiteNav } from "../../hooks/mutations/useUpdateSiteNav";
import { Plus } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useUpdateSiteTheme } from "../../hooks/mutations/useUpdateSiteTheme";
import { cn } from "../../utils/cn";

interface SiteDashboardProps {
  siteId: string;
}

const SiteDashboard = ({ siteId }: SiteDashboardProps) => {
  const {
    data: site,
    isLoading: isSiteLoading,
    isFetching: isSiteFetching,
  } = useSite(siteId);
  const [pageSelectorOpen, setPageSelectorOpen] = useState(false);
  const [isDndMode, setIsDndMode] = useState(false);
  const [headerItems, setHeaderItems] = useState<HeaderPage[]>([]);
  const [isMutating, setIsMutating] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<"1" | "2">("1");

  const updateSiteNavMutation = useUpdateSiteNav();
  const updateSiteThemeMutation = useUpdateSiteTheme();

  useEffect(() => {
    if (site) {
      if (site.c_header) {
        setHeaderItems(site.c_header);
      }
      if (site.c_theme) {
        setSelectedTheme(site.c_theme);
      }
    }
  }, [site]);

  const handleOrderChange = (newItems: HeaderPage[]) => {
    setHeaderItems(newItems);
  };

  const handleThemeSelect = (theme: "1" | "2") => {
    setSelectedTheme(theme);
    // setShowThemeSaveButton(theme !== site?.c_theme);
  };

  const handleThemeSave = async () => {
    setIsMutating(true);
    try {
      await updateSiteThemeMutation.mutateAsync({
        siteId,
        req: { themeId: selectedTheme },
      });
    } finally {
      setIsMutating(false);
    }
  };

  const handleSectionNameChange = async (oldName: string, newName: string) => {
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

    setIsMutating(true);
    try {
      await updateSiteNavMutation.mutateAsync({
        siteId,
        req: { headers },
      });
    } finally {
      setIsMutating(false);
    }
  };

  const handleAddSection = async () => {
    const newSection: HeaderPage = {
      title: `New Section ${headerItems.length + 1}`,
      page: [],
    };
    const headers = [...headerItems, newSection].map((item) => ({
      title: item.title,
      page: item.page ? item.page?.map((page) => page.meta.id) : [],
    }));

    setIsMutating(true);
    try {
      await updateSiteNavMutation.mutateAsync({
        siteId,
        req: { headers },
      });
    } finally {
      setIsMutating(false);
    }
  };

  const handleSave = async () => {
    setIsDndMode(false);
    const headers = headerItems.map((item) => ({
      title: item.title,
      page: item.page ? item.page?.map((page) => page.meta.id) : [],
    }));

    setIsMutating(true);
    try {
      await updateSiteNavMutation.mutateAsync({
        siteId,
        req: { headers },
      });
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <div className="grid grid-cols-2 bg-white p-8 min-h-[700px] relative">
      <div className="divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 flex justify-between items-center sm:px-6">
          <h2 className="text-lg font-semibold leading-6 text-gray-900">
            Edit Website Theme
          </h2>
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleThemeSave}
              disabled={isMutating || selectedTheme === site?.c_theme}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Theme Changes
            </Button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-around items-center mb-4">
            <div
              className={cn(
                "cursor-pointer border-4",
                selectedTheme === "1" ? " border-blue-500" : ""
              )}
              onClick={() => handleThemeSelect("1")}
            >
              <img
                src="https://a.mktgcdn.com/p/1R0ZcUrEDn_k4wLbOz5JkV6IVVjS9niiIfwIurBEZHE/2558x2204.png"
                alt="Theme 1"
                className="w-64 h-30 object-cover"
              />
              <p className="text-center mt-2">Theme 1</p>
            </div>
            <div
              className={cn(
                "cursor-pointer border-4",
                selectedTheme === "2" ? " border-blue-500" : ""
              )}
              onClick={() => handleThemeSelect("2")}
            >
              <img
                src="https://a.mktgcdn.com/p/5LJpwvNzLsAv26yNEdXnGBuS8G7rmMQjSWrNAi5qnfs/2552x2088.png"
                alt="Theme 2"
                className="w-64 h-30 object-cover"
              />
              <p className="text-center mt-2">Theme 2</p>
            </div>
          </div>
        </div>
      </div>
      <div className="divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 flex justify-between items-center sm:px-6">
          <h2 className="text-lg font-semibold leading-6 text-gray-900">
            Edit Website
          </h2>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => (isDndMode ? handleSave() : setIsDndMode(true))}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isDndMode ? "Save" : "Edit Navigation"}
            </Button>
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
                      siteDomain={site.c_siteDomain}
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
      {(isMutating || isSiteLoading || isSiteFetching) && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <Loader2 className="h-32 w-32 animate-spin text-blue-500" />
        </div>
      )}
    </div>
  );
};

export default SiteDashboard;
