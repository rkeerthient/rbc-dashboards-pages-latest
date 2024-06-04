import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import * as React from "react";
import { useEffect, useState } from "react";

interface pickerProps {
  name: string;
  entityId: string;
}

const entityPicker: pickerProps[] = [
  { name: "Aaron Kingston", entityId: "32311308" },
  { name: "A. Harrison Peatriss, Jr.", entityId: "32311549" },
  { name: "Aaron Foster", entityId: "32312981" },
  { name: "Aaron H. Weierbach", entityId: "32312754" },
];

export default function EntityPicker() {
  const [selected, setSelected] = useState<pickerProps | null>(null);

  useEffect(() => {
    if (window !== undefined) {
      const url = window.location.href;
      if (url.includes("advisor")) {
        const entityId = url.split("/").pop();
        const selectedItem = entityPicker.find(
          (item) => item.entityId === entityId
        );
        setSelected(selectedItem);
      }
    }
  }, []);

  return (
    <div className="fixed top-2 right-24 w-52 text-right">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 bg-whitepy-1.5 px-3 text-sm/6 font-semibold text-black border  border-black focus:outline-none  ">
          {selected?.name}
          <ChevronDownIcon className="size-4 fill-black/60" />
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom=" scale-95"
          enterTo=" scale-100"
          leave="transition ease-in duration-100"
          leaveFrom=" scale-100"
          leaveTo=" scale-95"
        >
          <MenuItems
            anchor="bottom end"
            className="w-52 origin-top-right rounded-xl border border-black  bg-white  p-1 text-sm/6 text-black  [--anchor-gap:var(--spacing-1)] focus:outline-none"
          >
            {entityPicker.map((item, index) => (
              <MenuItem key={index}>
                <button
                  onClick={() =>
                    (window.location.href = `https://durably-yielding-marmoset.pgsdemo.com/advisor/${item.entityId}`)
                  }
                  className="group flex w-full items-center gap-2  y-1.5 px-3 data-[focus]:bg-black/10 "
                >
                  {item.name}
                </button>
              </MenuItem>
            ))}
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}
