export interface NestedObject {
  [key: string]: any;
}
export const createNestedObject = (
  fieldId: string,
  value: any,
  isComplex: boolean,
  isPhoto: boolean = false
): NestedObject => {
  if (isComplex) {
    const keys = fieldId.split(".");
    let currentObject: NestedObject = {};
    let nestedObject: NestedObject = currentObject;

    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        currentObject[key] = isPhoto ? { image: { url: value } } : value;
      } else {
        currentObject[key] = {};
        currentObject = currentObject[key];
      }
    });
    return nestedObject;
  } else {
    return { [fieldId]: { url: value } };
  }
};
