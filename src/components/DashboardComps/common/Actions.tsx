import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  completionStatusReducer,
  dashboardNumbersReducer,
  dataReducer,
  notificationsReducer,
} from "../../../redux/dashboardDataSlice";
import { SelectedDays, days } from "../HoursField";
import { SuggestionsRoot } from "../Suggestions";
type Action_Props = {
  initialValue: any;
  isContentEdited: boolean;
  setIsEditable: (isEditable: boolean) => void;
  setValue: (value: any) => void;
  saveBody: any;
};
const Actions = ({
  initialValue,
  isContentEdited,
  setIsEditable,
  setValue,
  saveBody,
}: Action_Props) => {
  const dispatch = useDispatch();

  const dataStatus = useSelector(
    (state: RootState) => state.dashboardSlice.data
  );
  const userStatus = useSelector(
    (state: RootState) => state.dashboardSlice.userRole
  );
  const completionStatus = useSelector(
    (state: RootState) => state.dashboardSlice.completionStatus
  );

  const updateValue = (
    propertyName: string,
    newValue: any,
    updateType?: string
  ) => {
    console.log(updateType);

    if (updateType) {
      if (completionStatus.FieldsWithNoData.includes(propertyName)) {
        const newCompletionStatus = { ...completionStatus };

        newCompletionStatus.FieldsWithNoData =
          newCompletionStatus.FieldsWithNoData.filter(
            (field) => field !== propertyName
          );
        newCompletionStatus.completionPercentage = Math.abs(
          (newCompletionStatus.FieldsWithNoData.length /
            newCompletionStatus.fields.length) *
            100 -
            100
        );
        dispatch(completionStatusReducer(newCompletionStatus));
      }
      dispatch(
        dataReducer({
          ...dataStatus,
          [propertyName]: newValue,
        })
      );
    } else {
      getSuggestions();
    }
  };

  const getSuggestions = async () => {
    const entityId = `${import.meta.env.YEXT_PUBLIC_ENTITY_ID}`;
    let suggestionStatusCount: any = {};
    try {
      const _res = await fetch(`/api/getSuggestions/${entityId}`);
      const mainJson: any = await _res.json();
      const suggestions: SuggestionsRoot[] =
        await mainJson.response.suggestions;

      suggestions.forEach((suggestion) => {
        const status = suggestion.status;
        if (!suggestionStatusCount[status]) {
          suggestionStatusCount[status] = 0;
        }
        suggestionStatusCount[status]++;
      });
      let currData = {
        pending: suggestionStatusCount.PENDING || 0,
        approved: suggestionStatusCount.APPROVED || 0,
        rejected: suggestionStatusCount.REJECTED || 0,
        cancelled: suggestionStatusCount.CANCELLED || 0,
      };
      dispatch(dashboardNumbersReducer(currData));
    } catch (error) {
      console.error(
        `Failed to fetch field configuration for ${entityId}:`,
        error
      );
    }
  };
  const handleSave = async () => {
    console.log(saveBody);

    try {
      const requestBody = encodeURIComponent(JSON.stringify(saveBody));
      const _userRole = userStatus?.acl?.[0]?.roleId ?? "1";
      const response = await fetch(
        `/api/putFields/${import.meta.env.YEXT_PUBLIC_ENTITY_ID}?body=${requestBody}${`&userRole=${_userRole}`}`
      );

      const res = await response.json();

      if (!res.meta.errors.length) {
        res.operationType === "Update"
          ? dispatch(
              notificationsReducer({
                fieldKey: `${Object.keys(saveBody)[0]}`,
                type: `Update`,
              })
            )
          : dispatch(
              notificationsReducer({
                fieldKey: `${Object.keys(saveBody)[0]}`,
                type: `Suggestion`,
              })
            );
        updateValue(
          Object.keys(saveBody)[0],
          saveBody[Object.keys(saveBody)[0]],
          res.operationType
        );
      }
    } catch (error) {
      console.error(
        `Failed to fetch field configuration for ${JSON.stringify(error)}:`,
        error
      );
    }
    setIsEditable(false);
  };
  const initialSelectedDays: SelectedDays = days.reduce(
    (acc: any, day: any) => {
      const dayData = initialValue[day.toLowerCase()] || { openIntervals: [] };
      JSON.stringify(initialValue) === "{}" || initialValue === undefined
        ? (acc[day] = {
            selectedType: "Closed",
            openIntervals: [],
          })
        : (acc[day] = {
            selectedType: dayData.isClosed
              ? "Closed"
              : dayData.openIntervals.length > 1
                ? "Split"
                : dayData.openIntervals.length > 0 &&
                    dayData.openIntervals[0].start === "00:00" &&
                    dayData.openIntervals[0].end === "23:59"
                  ? "24 Hours"
                  : "Open",
            openIntervals: dayData.openIntervals,
          });
      return acc;
    },
    {}
  );
  const handleCancel = () => {
    setValue(initialValue);
    setIsEditable(false);
  };

  return (
    <div className="flex w-full gap-2 text-xs pt-2 font-bold">
      <button
        onClick={handleSave}
        disabled={!isContentEdited}
        className={`w-fit flex justify-center h-8 py-1 font-normal px-4 rounded-s text-xs border items-center ${
          !isContentEdited
            ? `border-fieldAndBorderBGGrayColor bg-disabled text-disabledColor pointer-events-none`
            : `border-fieldAndBorderBGGrayColor bg-active text-white`
        }`}
      >
        Save for 1 Profile
      </button>
      <button onClick={handleCancel} className={`text-xs text-linkColor`}>
        Cancel
      </button>
    </div>
  );
};

export default Actions;
