import * as React from "react";
import { useState } from "react";
import TextBoxContainer from "./DashboardComps/FieldComponents.tsx/TextBoxContainer";

interface StructTypeFieldProps {
  initialValue?: any[] | undefined; // Changed to any[] to handle an array of any structured objects
  structType: Root; // Assuming Root structure holds all necessary definitions
  fieldId: string;
}

export interface Root {
  property: Property[];
}

export interface Property {
  name: string;
  displayName: string;
  isRequired: boolean;
  typeId: string;
  type: Type;
}

export interface Type {
  stringType?: StringType;
  dateType?: DateType;
  listType?: ListType; // Assuming lists might be used based on your example
  optionType?: OptionType; // Assuming options might be used based on your example
}

export interface StringType {
  stereotype: string;
  maxLength: number;
}

export interface DateType {}

export interface ListType {
  typeId: string;
  maxLength: number;
  optionType?: OptionType;
}

export interface OptionType {
  option: Option[];
}

export interface Option {
  displayName: string;
  textValue: string;
}

const StructTypeField = ({
  initialValue,
  fieldId,
  structType,
}: StructTypeFieldProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [initValues, setInitValues] = useState<any[]>(initialValue || []);

  const booleanData = [
    {
      displayName: "Yes",
      textValue: true,
    },
    {
      displayName: "No",
      textValue: false,
    },
  ];

  const handleClick = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  const handleStructChange = (val: any[]) => {
    setInitValues(val);
  };

  const handleEdit = (val: boolean) => {
    setIsEditMode(val);
  };

  return (
    <div className="flex flex-col gap-3">
      {isEditMode ? (
        <TextBoxContainer
          fieldId={fieldId}
          properties={structType.property}
          initialValue={initialValue}
          setInitialValues={handleStructChange}
          editMode={handleEdit}
        />
      ) : (
        <div
          className="flex flex-col gap-2 hover:cursor-pointer"
          onClick={handleClick}
        >
          {initValues?.length >= 1 ? (
            initValues.map((item, index) => (
              <div
                key={index}
                className="flex flex-col text-[#374151] border-l pl-4"
              >
                {structType.property.map((prop, propIndex) => {
                  const value = item[prop.name];
                  return (
                    <div key={propIndex}>
                      <div className="font-bold">{prop.displayName}</div>
                      <div>
                        {prop.typeId === "boolean"
                          ? booleanData.find(
                              (option) => option.textValue === value
                            )?.displayName
                          : prop.typeId === "list" && Array.isArray(value)
                            ? value.join(", ")
                            : value || "No value"}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            <>Click me!</>
          )}
        </div>
      )}
    </div>
  );
};

export default StructTypeField;
