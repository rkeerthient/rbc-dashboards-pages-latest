import * as React from "react";
import { C_taskGroups, Tasks } from "../../types/dashboard_entity";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Subtasks from "./Subtasks";

const TasksSection = ({ tasks, document }: any) => {
  return (
    <>
      {tasks && (
        <div className="flex flex-col gap-4 ">
          {tasks.map((item: C_taskGroups, index: number) => (
            <div className="border" key={index}>
              <Disclosure className="border-4">
                {({ open }) => (
                  <>
                    <DisclosureButton
                      style={{ backgroundColor: `white` }}
                      className={`flex w-full justify-start px-4 py-2 text-left text-sm font-medium  `}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-4 text-xl">
                          <div>{item.name}</div>
                          <ChevronDownIcon
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-7 w-7  `}
                          />
                        </div>
                        <div className="text-sm">{item.description}</div>
                      </div>
                    </DisclosureButton>
                    <DisclosurePanel className="px-4 pt-4 pb-2 text-sm bg-white text-gray-500">
                      <>
                        {item.tasks?.map((subItem: Tasks, subIndex: any) => (
                          <div key={subIndex} className="border-t border-b">
                            <Subtasks subItem={subItem} document={document} />
                          </div>
                        ))}
                      </>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TasksSection;
