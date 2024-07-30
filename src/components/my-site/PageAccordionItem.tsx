import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { HeaderPage } from "../../types/yext";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion";
import { Pencil, Check, X } from "lucide-react";

interface PageAccordionItemProps {
  page: HeaderPage;
  handleSectionNameChange: (oldName: string, newName: string) => void;
  handlePageDelete: (sectionName: string) => void;
}

const PageAccordionItem = ({
  page,
  handleSectionNameChange,
}: PageAccordionItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(page.title);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleSave = () => {
    handleSectionNameChange(page.title, newName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewName(page.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <AccordionItem className="" value={page.title}>
      {!isEditing ? (
        <AccordionTrigger
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="px-4 flex items-center w-full">
            <span>{page.title}</span>
            {isHovered && (
              <button onClick={handleEditClick} className="ml-2">
                <Pencil size={16} />
              </button>
            )}
          </div>
        </AccordionTrigger>
      ) : (
        <div className="flex items-center p-4">
          <input
            ref={inputRef}
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="mr-2 px-1 border rounded flex-grow"
          />
          <button onClick={handleSave} className="mr-1">
            <Check size={16} />
          </button>
          <button onClick={handleCancel}>
            <X size={16} />
          </button>
        </div>
      )}
      <AccordionContent>
        <ul role="list" className="divide-y divide-gray-100">
          {page.page?.map((page) => (
            <li
              key={page.meta.id}
              className="flex items-center justify-between gap-x-6 py-2 px-2"
            >
              <div className="min-w-0 pl-8">
                <div className="flex items-start gap-x-3">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {page.c_pageTitle}
                  </p>
                </div>
              </div>
              <div className="flex flex-none items-center gap-x-4">
                <a
                  href={page.slug}
                  className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                >
                  Go To Page
                  <span className="sr-only">, {page.c_pageTitle}</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PageAccordionItem;
