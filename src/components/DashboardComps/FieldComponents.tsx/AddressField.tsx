import { useState, ChangeEvent } from "react";
import * as React from "react";
import Actions from "../common/Actions";

interface AddressProps {
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
}

interface AddressFieldProps {
  initialValue: AddressProps;
  fieldId: string;
}

const AddressField = ({ initialValue, fieldId }: AddressFieldProps) => {
  const fieldsToInclude: (keyof AddressProps)[] = [
    "line1",
    "line2",
    "city",
    "region",
    "postalCode",
    "countryCode",
  ];

  // Initialize state with only the desired fields
  const filteredInitialValue: AddressProps = fieldsToInclude.reduce(
    (acc, field) => {
      acc[field] = initialValue[field] || "";
      return acc;
    },
    {} as AddressProps
  );
  const [value, setValue] = useState<any>(filteredInitialValue);
  const [isEditable, setIsEditable] = useState(false);
  const isContentEdited = value !== initialValue;

  const handleClick = () => {
    setIsEditable(true);
  };

  const handleChange =
    (field: keyof AddressProps) => (event: ChangeEvent<HTMLInputElement>) => {
      setValue({
        ...value,
        [field]: event.target.value,
      });
    };

  return (
    <div
      className={`w-full px-4 py-3 ${
        isEditable ? `bg-containerBG` : `bg-transparent`
      }`}
    >
      {isEditable ? (
        <>
          <div className="flex gap-4 flex-col py-6 px-4">
            <div className="flex flex-col gap-2">
              <div>Line 1</div>
              <input
                className="border w-full p-1"
                type="text"
                value={value.line1 || ""}
                onChange={handleChange("line1")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>Line 2</div>
              <input
                className="border w-full p-1"
                type="text"
                value={value.line2 || ""}
                onChange={handleChange("line2")}
              />
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col gap-2">
                <div>City</div>
                <input
                  className="border w-full p-1"
                  type="text"
                  value={value.city || ""}
                  onChange={handleChange("city")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div>Region</div>
                <input
                  className="border w-full p-1"
                  type="text"
                  value={value.region || ""}
                  onChange={handleChange("region")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div>Postal Code</div>
                <input
                  className="border w-full p-1"
                  type="text"
                  value={value.postalCode || ""}
                  onChange={handleChange("postalCode")}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div onClick={handleClick} className="hover:cursor-pointer">
          {value ? (
            <div className="flex flex-col py-6 px-4 ">
              <div>{value.line1}</div>
              <div>
                {value.city}, {value.region} {value.postalCode}
              </div>
            </div>
          ) : (
            "Click to add"
          )}
        </div>
      )}

      {/* <div onClick={handleFin}>Clic we</div> */}

      {isEditable && (
        <Actions
          initialValue={initialValue}
          isContentEdited={isContentEdited}
          setIsEditable={(e) => setIsEditable(e)}
          setValue={(e) => setValue(e)}
          saveBody={{ [fieldId as string]: value }}
        />
      )}
    </div>
  );
};

export default AddressField;
