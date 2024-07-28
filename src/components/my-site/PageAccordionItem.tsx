import * as React from "react";
import { HeaderPage } from "../../types/yext";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion";

interface PageAccordionItemProps {
  page: HeaderPage;
}

const PageAccordionItem = (props: PageAccordionItemProps) => {
  const { page } = props;
  return (
    <AccordionItem className="border-y" value={page.title}>
      <AccordionTrigger>
        <div className="px-4">{page.title}</div>
      </AccordionTrigger>
      <AccordionContent>
        <ul role="list" className="divide-y divide-gray-100">
          {page.page.map((page) => (
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
