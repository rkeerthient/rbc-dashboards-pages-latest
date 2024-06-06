import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import * as React from "react";
import { ChangeEvent, useState } from "react";
import Actions from "../common/Actions";
import { createNestedObject } from "../util/nestedObjectUtils";
import NonImgAssets from "./NonImgAssets";
interface TextFieldProps {
  initialValue?: string;
  fieldId: string;
  isComplex?: boolean;
}

const TextField = ({
  initialValue = "",
  fieldId,
  isComplex = false,
}: TextFieldProps) => {
  const [value, setValue] = useState<any>(initialValue);
  const [isEditable, setIsEditable] = useState(false);
  const isContentEdited = value !== initialValue;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setIsEditable(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div
      className={`w-full px-4 py-3 ${
        isEditable ? `bg-containerBG` : `bg-transparent`
      }`}
    >
      {isEditable ? (
        <div className="flex gap-2 items-center">
          <input
            className="border w-full p-1"
            type="text"
            value={value || ""}
            onChange={handleChange}
            readOnly={!isEditable}
          />
          {fieldId === "c_role" && (
            <div className="w-6 h-6 bg-gray-300 flex items-center justify-center">
              <PlusIcon className="w-4 h-4" onClick={() => setOpen(true)}>
                Open
              </PlusIcon>
            </div>
          )}
        </div>
      ) : (
        <div onClick={handleClick} className="hover:cursor-pointer p-2">
          {fieldId === "mainPhone"
            ? value
                .replace("+1", "")
                .replace(/\D+/g, "")
                .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
            : value || "Click to add"}
        </div>
      )}
      {isEditable && (
        <Actions
          initialValue={initialValue}
          isContentEdited={isContentEdited}
          setIsEditable={(e) => setIsEditable(e)}
          setValue={(e) => setValue(e)}
          saveBody={
            isComplex
              ? createNestedObject(fieldId, value, isComplex)
              : { [fieldId as string]: value }
          }
        />
      )}
      <Transition.Root show={open} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-full overflow-y-auto">
            <div className="flex min-h-full items-end justify-center text-center sm:items-center ">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="w-2/4 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setValue(initialValue);
                        setOpen(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <NonImgAssets
                      fieldId="c_role"
                      value={(val: any) => setValue(val)}
                      isOpen={(val: boolean) => setOpen(val)}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default TextField;
