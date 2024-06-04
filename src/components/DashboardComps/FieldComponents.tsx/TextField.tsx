import { useState, ChangeEvent } from "react";
import * as React from "react";
import Actions from "../common/Actions";
import { createNestedObject } from "../util/nestedObjectUtils";
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
        <>
          <input
            className="border w-full p-1"
            type="text"
            value={value || ""}
            onChange={handleChange}
            readOnly={!isEditable}
          />
        </>
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
    </div>
  );
};

export default TextField;
