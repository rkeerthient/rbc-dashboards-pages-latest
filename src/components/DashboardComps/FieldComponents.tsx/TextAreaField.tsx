import { useState, ChangeEvent } from "react";
import * as React from "react";
import Actions from "../common/Actions";
import { createNestedObject } from "../util/nestedObjectUtils";
interface TextAreaProps {
  initialValue?: string;
  fieldId: string;
  isComplex?: boolean;
}

const TextArea = ({
  initialValue = "",
  fieldId,
  isComplex = false,
}: TextAreaProps) => {
  const [value, setValue] = useState<string>(initialValue);
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
          <textarea
            className="border w-full p-1"
            type="text"
            value={value || ""}
            onChange={handleChange}
            readOnly={!isEditable}
          />
        </>
      ) : (
        <div onClick={handleClick} className="hover:cursor-pointer">
          {value || "Click to add"}
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

export default TextArea;
