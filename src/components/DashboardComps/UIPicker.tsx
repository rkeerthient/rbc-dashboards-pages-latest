import * as React from "react";
import { useEffect, useState } from "react";
import { Root } from "../../types/fieldSchema";
import DateField from "./FieldComponents.tsx/DateField";
import PicklistField from "./FieldComponents.tsx/PicklistField";
import TextField from "./FieldComponents.tsx/TextField";
import MultiPicklistField from "./FieldComponents.tsx/MultiPicklistField";
import StructTypeField from "../StructTypeField";
import Slider from "./FieldComponents.tsx/Slider";
import TextBoxList from "./ListsUI/TextboxList";
import TextArea from "./FieldComponents.tsx/TextAreaField";
import EntityField from "./FieldComponents.tsx/EntityField";
import PhotoField from "./FieldComponents.tsx/PhotoField";
import PhotoGalleryField from "./FieldComponents.tsx/PhotoGalleryField";
import ColorPickerField from "./FieldComponents.tsx/ColorPickerField";
import EntityAddOrDeleteField from "./FieldComponents.tsx/EntityAddOrDeleteField";
import { useMyContext } from "../Context/MyContext";
import BlogsAddOrDelete from "./FieldComponents.tsx/BlogsAddOrDelete";
import HoursField from "./HoursField";
import AddressField from "./FieldComponents.tsx/AddressField";
import LinkedEntities from "./LinkedEntities";
import TextBoxContainer from "./FieldComponents.tsx/TextBoxContainer";

interface UIPickerProps {
  fieldName: string;
  subItemField: string;
  initialValue?: string;
  isSlider?: boolean;
  minText?: string;
  maxText?: string;
  readonly: boolean;
}

const UIPicker = ({
  fieldName,
  subItemField,
  initialValue,
  isSlider = false,
  minText,
  maxText,
  readonly,
}: UIPickerProps) => {
  const [mainFieldSchema, setMainFieldSchema] = useState<Root | undefined>();
  const [subFieldSchema, setSubFieldSchema] = useState<Root | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const { userRole } = useMyContext();

  useEffect(() => {
    let isMounted = true;

    const getFieldConfig = async (fieldId: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/getFields/${fieldId}`);

        if (!isMounted) {
          return;
        }

        const mainJson: Root = await response.json();
        setMainFieldSchema(mainJson);

        if (
          mainJson.response.type.listType &&
          mainJson.response.type.listType.typeId.includes("c_")
        ) {
          const listTypeResponse = await fetch(
            `/api/getFieldTypes/${mainJson.response.type.listType.typeId}`
          );
          if (!isMounted) {
            return;
          }
          const subJson: Root = await listTypeResponse.json();
          setSubFieldSchema(subJson);
        }
      } catch (error) {
        console.error(
          `Failed to fetch field configuration for ${fieldId}:`,
          error
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    ![
      "hours",
      "name",
      "mainPhone",
      "address",
      "c_contentGrid",
      "c_advisorBio.bio",
      "c_locator",
      "laguages",
      "yearsOfExperience",
      "c_hero.email",
      "c_contentCarousel.events",
      "c_advisorBio.headshot",
      "c_contentCarousel.services",
      "c_advisorBio.email",
      "c_insights.blogs",
      "c_hero.backgroundImage",
      "emails",
    ].includes(subItemField) && getFieldConfig(subItemField);
    return () => {
      isMounted = false;
    };
  }, [subItemField]);

  return (
    <>
      {
        <>
          {isLoading && (
            <div className="px-4 py-3 ">
              <div
                className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
            </div>
          )}
          {(() => {
            switch (subItemField) {
              case "hours":
                return (
                  <HoursField initialValue={initialValue} fieldId="hours" />
                );
              case "name":
                return (
                  <TextField initialValue={initialValue} fieldId={"name"} />
                );
              case "emails":
                return (
                  <TextBoxList initialValue={initialValue} fieldId={"emails"} />
                );
              case "mainPhone":
                return (
                  <TextField
                    initialValue={initialValue}
                    fieldId={"mainPhone"}
                  />
                );

              case "address":
                return (
                  <AddressField
                    initialValue={initialValue}
                    fieldId={"address"}
                  />
                );
              case "c_contentCarousel.services":
                return (
                  <LinkedEntities
                    initialValue={initialValue.services}
                    fieldId={"c_contentCarousel.services"}
                    linkedEntityType={"ce_service"}
                  />
                );
              case "c_contentCarousel.events":
                return (
                  <LinkedEntities
                    initialValue={initialValue.events}
                    fieldId={"c_contentCarousel.events"}
                    linkedEntityType={"event"}
                  />
                );
              case "c_contentGrid.financialProfessionals":
                return (
                  <LinkedEntities
                    initialValue={initialValue.financialProfessionals}
                    fieldId={"c_contentGrid.financialProfessionals"}
                    linkedEntityType={"financialProfessional"}
                  />
                );
              case "c_insights.blogs":
                return (
                  <LinkedEntities
                    initialValue={initialValue.blogs}
                    fieldId={"c_insights.blogs"}
                    linkedEntityType={"ce_blog"}
                  />
                );
              case "c_advisorBio.headshot":
                return (
                  <PhotoField
                    isMulti={false}
                    initialValue={initialValue.headshot}
                    fieldId={"c_advisorBio.headshot"}
                    isComplex={true}
                  />
                );
              case "c_advisorBio.bio":
                return (
                  <TextArea
                    fieldId={"c_advisorBio.bio"}
                    initialValue={initialValue.bio}
                    isComplex={true}
                  />
                );
              case "c_advisorBio.email":
                return (
                  <TextField
                    fieldId={"c_locator.email"}
                    initialValue={initialValue.email}
                    isComplex={true}
                  />
                );
              case "c_locator.description":
                return (
                  <TextArea
                    fieldId={"c_locator.description"}
                    initialValue={initialValue.description}
                    isComplex={true}
                  />
                );
              case "c_locator.email":
                return (
                  <TextField
                    fieldId={"c_locator.email"}
                    initialValue={initialValue.email}
                    isComplex={true}
                  />
                );
              case "c_hero.backgroundImage":
                return (
                  <PhotoField
                    isMulti={false}
                    initialValue={initialValue.image}
                    fieldId={"c_hero.image"}
                    isComplex={true}
                  />
                );
              case "c_hero.email":
                return (
                  <TextField
                    fieldId={"c_hero.email"}
                    initialValue={initialValue.email}
                    isComplex={true}
                  />
                );
              case "laguages":
                return (
                  <TextBoxList
                    fieldId={"languages"}
                    initialValue={initialValue}
                  />
                );
              case "yearsOfExperience":
                return (
                  <TextBoxList
                    fieldId={"yearsOfExperience"}
                    initialValue={initialValue}
                  />
                );
              default:
                return null;
            }
          })()}
          {!isLoading &&
            mainFieldSchema &&
            (() => {
              switch (mainFieldSchema.response.typeId) {
                case "option":
                  return (
                    <PicklistField
                      fieldId={mainFieldSchema.response.$id}
                      initialValue={initialValue}
                      options={mainFieldSchema.response.type.optionType.option}
                    />
                  );
                case "boolean":
                  return (
                    <PicklistField
                      fieldId={mainFieldSchema.response.$id}
                      initialValue={initialValue}
                      options={[
                        {
                          displayName: "Yes",
                          textValue: true,
                        },
                        {
                          displayName: "No",
                          textValue: false,
                        },
                      ]}
                    />
                  );
                case "string":
                  return (
                    <>
                      {subItemField === "c_color" ? (
                        <ColorPickerField
                          initialValue={initialValue}
                          fieldId={mainFieldSchema.response.$id}
                        />
                      ) : mainFieldSchema.response.type.stringType
                          .stereotype === "SIMPLE" ? (
                        <TextField
                          initialValue={initialValue}
                          fieldId={mainFieldSchema.response.$id}
                        />
                      ) : (
                        <TextArea
                          initialValue={initialValue}
                          fieldId={mainFieldSchema.response.$id}
                        />
                      )}
                    </>
                  );

                case "date":
                  return (
                    <DateField
                      initialValue={initialValue}
                      fieldId={mainFieldSchema.response.$id}
                    />
                  );
                case "decimal":
                  return isSlider ? (
                    <Slider
                      fieldId={mainFieldSchema.response.$id}
                      value={initialValue}
                      highLabel={maxText}
                      lowLabel={minText}
                    />
                  ) : (
                    <TextField
                      initialValue={initialValue}
                      fieldId={mainFieldSchema.response.$id}
                    />
                  );

                case "image":
                  return (
                    <PhotoField
                      isMulti={false}
                      initialValue={initialValue}
                      fieldId={mainFieldSchema.response.$id}
                    />
                  );
                case "list":
                  return mainFieldSchema.response.type.listType.typeId ===
                    "option" ? (
                    <MultiPicklistField
                      initialValue={initialValue}
                      options={
                        mainFieldSchema.response.type.listType.type.optionType
                          .option
                      }
                      fieldId={mainFieldSchema.response.$id}
                    />
                  ) : mainFieldSchema.response.type.listType.typeId ===
                    "string" ? (
                    <TextBoxList
                      fieldId={mainFieldSchema.response.$id}
                      initialValue={initialValue}
                    />
                  ) : mainFieldSchema.response.type.listType.typeId ===
                    "image" ? (
                    <PhotoGalleryField
                      isMulti={true}
                      initialValue={initialValue}
                      fieldId={mainFieldSchema.response.$id}
                    />
                  ) : mainFieldSchema.response.type.listType.typeId ===
                    "entityReference" ? (
                    ["Upcoming Events", "Related Insights"].includes(
                      fieldName
                    ) ? (
                      <EntityAddOrDeleteField
                        initialValue={initialValue}
                        fieldId={mainFieldSchema.response.$id}
                      />
                    ) : userRole && userRole.acl[0].roleId !== "19718" ? (
                      <EntityField
                        initialValue={initialValue}
                        fieldId={mainFieldSchema.response.$id}
                      />
                    ) : (
                      <BlogsAddOrDelete
                        initialValue={initialValue}
                        fieldId={mainFieldSchema.response.$id}
                      />
                    )
                  ) : (
                    subFieldSchema &&
                    subFieldSchema.response.type.structType && (
                      <StructTypeField
                        initialValue={initialValue}
                        fieldId={mainFieldSchema.response.$id}
                        structType={subFieldSchema.response.type.structType}
                      />
                    )
                  );
                default:
                  return null;
              }
            })()}
        </>
      }
    </>
  );
};

export default UIPicker;
