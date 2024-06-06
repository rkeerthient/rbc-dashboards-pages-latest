import * as React from "react";
import { useEffect, useState } from "react";

type NonImgAssetsProps = {
  value: (newUrls: any) => void;
  isOpen: (value: boolean) => void;
  fieldId: string;
  currValue?: any;
  fullData?: any;
  index?: any;
};

interface Asset {
  id: string;
  type: string;
  name: string;
  description: string;
  forEntities: ForEntities;
  usage: Usage[];
  owner: number;
  labels?: string[];
}

interface ForEntities {
  mappingType: string;
}

interface Usage {
  type: string;
  fieldNames?: string[];
}

const NonImgAssets = ({
  value,
  isOpen,
  fieldId,
  currValue,
  fullData,
  index,
}: NonImgAssetsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [assetData, setAssetData] = useState<any[]>([]);
  const [_value, _setValue] = useState<string>("");
  const [_desgValue, _setDesgValue] = useState<Asset | null>(null);

  useEffect(() => {
    getAssets();
  }, []);

  const getNewData = (_desgData: any) => {
    const abbreviation = _desgData.value?.abbreviation || "";
    const name = _desgData.value?.name || "";
    const date = _desgData.value?.date ? new Date(_desgData.value.date) : "";

    const newFullDataItem = {
      textValues: {
        abbreviation,
        name,
      },
      richTextValues: null,
      optionValue: "",
      dateValues: {
        date,
      },
      booleanValue: false,
      multiPickOptions: [],
    };
    if (index >= 0) {
      return [
        ...fullData.slice(0, index),
        newFullDataItem,
        ...fullData.slice(index + 1),
      ];
    } else {
      return fullData;
    }
  };

  const getAssets = async () => {
    setIsLoading(true);
    const url = `/api/getAssets`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      const filteredResp = data.response.assets
        .filter((item: Asset) =>
          fieldId === "c_role"
            ? item.usage?.[0].fieldNames?.includes(fieldId)
            : item.type === "c_designations"
        )
        .map((item: Asset) => ({ ...item }));

      setAssetData(filteredResp);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRadioChange = (name: string) => {
    console.log(name);

    if (fieldId === "c_role") {
      const selectedAsset = assetData.find((asset) => asset.name === name);
      _setValue(selectedAsset);
    } else {
      const selectedAsset = assetData.find((asset) => asset.name === name);
      if (selectedAsset) {
        _setDesgValue(selectedAsset);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <div className="w-full h-[80vh]">
          <div className="flex gap-4 h-[70vh]">
            <div className="flex flex-col gap-6 w-1/3 p-12 h-5/6 overflow-scroll">
              {assetData.map((item, index) => (
                <div className="flex items-center mb-4" key={index}>
                  <input
                    id={`${index}`}
                    type="radio"
                    value={item.name}
                    name="default-radio"
                    onChange={() => handleRadioChange(item.name)}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor={`${index}`}
                    className="ml-3 block text-sm font-medium leading-6 text-gray-900 "
                  >
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
            {_value && (
              <div className="border-l-4 border-gray-400 pl-4 pt-12 h-5/6 space-y-4">
                <div className="space-y-2">
                  <span className="font-bold">Role</span> <br />
                  {_value.value}
                </div>
              </div>
            )}
            {_desgValue && (
              <div className="border-l-4 border-gray-400 pl-4 pt-12 h-5/6 space-y-4">
                <div className="space-y-2">
                  <span className="font-bold">Abbreviation</span> <br />
                  {_desgValue.value.abbreviation}
                </div>
                <div className="space-y-2">
                  <span className="font-bold">Date</span>
                  <br />
                  {_desgValue.value.date}
                </div>
                <div className="space-y-2">
                  <span className="font-bold">Name</span>
                  <br />
                  {_desgValue.value.name}
                </div>
              </div>
            )}
          </div>
          <div className="flex mt-6 gap-3 justify-end px-4">
            <div
              onClick={() => {
                _value && value(_value.value);
                _desgValue && value(getNewData(_desgValue));
                isOpen(false);
              }}
              className={`h-8 flex items-center rounded-md px-4 py-0 text-white text-sm ${
                isLoading
                  ? "bg-gray-500 pointer-events-none"
                  : "bg-blue-600 hover:cursor-pointer"
              }`}
            >
              Continue
            </div>
            <button
              onClick={() => {
                value(fullData);
                isOpen(false);
              }}
              className="text-xs text-blue-700 hover:text-blue-900"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NonImgAssets;
