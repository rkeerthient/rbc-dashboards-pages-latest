import { Transition, Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone-esm";
import Assets from "./Assets";
type PhotoUploadProps = {
  value: (newUrls: string | string[]) => void;
  isOpen: (value: boolean) => void;
  multiple: boolean;
};

const PhotoUpload = ({ value, isOpen, multiple }: PhotoUploadProps) => {
  const [showAsset, setShowAsset] = useState(false);
  const [files, setFiles] = useState<
    (File & { preview: string }) | (File & { preview: string })[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadedUrls, setUploadedUrl] = useState<string[]>([]);
  const { open } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    noClick: true,
    multiple: multiple,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) =>
        (Array.isArray(prevFiles) ? prevFiles : [prevFiles]).concat(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        )
      );
    },
  });

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const imgBBUrls = await Promise.all(
        (Array.isArray(files) ? files : [files]).map(async (item) => {
          const formData = new FormData();
          formData.append("image", item);

          const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.YEXT_PUBLIC_IMGBB_KEY}`,
            {
              method: "POST",
              body: formData,
            }
          );

          const responseData = await response.json();

          if (!response.ok) {
            console.error(
              "Error uploading image:",
              response.statusText,
              responseData
            );
            throw new Error("Image upload failed");
          }

          return responseData.data.display_url;
        })
      );

      setUploadedUrl(multiple ? imgBBUrls : imgBBUrls[0]);
    } catch (error: any) {
      console.error("Error uploading images:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cleanup = async () => {
      await handleSave();
      if (Array.isArray(files)) {
        files.forEach((file) => URL.revokeObjectURL(file.preview));
      } else {
        URL.revokeObjectURL(files.preview);
      }
    };
    cleanup();
  }, [files]);

  return (
    <div className="w-full bg-white text-[#374151] p-4">
      <div className="flex flex-col gap-4 m-4">
        <div className="text-xl flex items-center">Add photos</div>
        <div className="bg-containerBG">
          <div className="flex flex-col p-8 items-center justify-end gap-4">
            <div>
              <img
                src="https://www.yextstatic.com/s/merrill/public/images/multi-content-selector/drag-drop-empty-cart.svg"
                alt=""
              />
            </div>
            <div className="font-bold m-1 cursor-none">Drop Photos Here</div>
            <div className="flex flex-row gap-4 justify-center">
              <button
                onClick={open}
                className="bg-fieldBlurBorder text-sm px-4 border rounded-[3px] h-8 flex items-center"
              >
                Upload Photos
              </button>

              <div className="bg-fieldBlurBorder text-sm px-4 border rounded-[3px] h-8 flex items-center">
                Enter URLs
              </div>
              <div
                className="bg-fieldBlurBorder text-sm px-4 border rounded-[3px] h-8 flex items-center"
                onClick={() => setShowAsset(true)}
              >
                Select Assets
              </div>
            </div>
          </div>
          <div className="pl-1 pb-1 text-xs flex flex-row gap-2">
            <div>File Formats : JPG, PNG, WEBP, GIF (Static Only)</div>
            <div>Max File Size: 5mb</div>
            <div>Max File Count: 497</div>
          </div>
        </div>
        {files && files.length >= 1 && (
          <div className="max-h-[300px] overflow-auto flex flex-col items-center gap-4">
            <div className="text-xl flex items-center justify-start mr-auto">
              Photos
            </div>
            <div className="grid grid-cols-4 gap-1 w-[95%]">
              {files && files.length >= 1 ? (
                files.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="relative m-1 w-[150px] border flex justify-center items-center   max-h-full h-[150px]"
                    >
                      {isLoading && (
                        <div
                          className="absolute mx-auto h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                          role="status"
                        ></div>
                      )}
                      <img
                        src={item.preview}
                        onLoad={() => {
                          URL.revokeObjectURL(item.preview);
                        }}
                      />
                    </div>
                  );
                })
              ) : (
                <>
                  {files.length == 1 && (
                    <div className="relative m-1 w-[150px] border flex justify-center items-center   max-h-full h-[150px]">
                      {isLoading && (
                        <div
                          className="absolute mx-auto h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                          role="status"
                        ></div>
                      )}
                      <img
                        src={files.preview}
                        onLoad={() => {
                          URL.revokeObjectURL(files.preview);
                        }}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
        {!files.length && uploadedUrls && (
          <div className="relative m-1 w-[150px] border flex justify-center items-center   max-h-full h-[150px]">
            <img src={uploadedUrls[0]} />
          </div>
        )}
        <div className="flex justify-end gap-6">
          <div
            onClick={() => {
              value([]);
              setFiles([]);
              isOpen(false);
            }}
            className="h-8 flex items-center bg-active rounded-md px-4 py-0 text-white text-sm"
          >
            Cancel
          </div>

          <div
            className={`h-8 flex items-center bg-active rounded-md px-4 py-0 text-white text-sm ${
              isLoading
                ? `bg-disabled pointer-events-none`
                : `bg-active hover:cursor-pointer`
            }`}
            onClick={() => {
              value(uploadedUrls);
              isOpen(false);
            }}
          >
            Continue
          </div>
        </div>
      </div>
      <Transition.Root show={showAsset} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowAsset}>
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
                        setShowAsset(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <Assets
                      value={(newUrls: any) => setUploadedUrl(newUrls)}
                      isOpen={(val: boolean) => setShowAsset(val)}
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

export default PhotoUpload;
