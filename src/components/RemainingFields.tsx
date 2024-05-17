import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const RemainingFields = ({ site }: any) => {
  const completionStatusReducer = (state: RootState) =>
    state.dashboardSlice.completionStatus;
  const _fieldsWthNoData = useSelector(
    completionStatusReducer
  ).FieldsWithNoData;

  return (
    <>
      {_fieldsWthNoData.length >= 1 && (
        <div className="flex flex-col gap-4 border p-5  bg-white">
          <div className="font-bold text-gray-900">
            Remaining Incomplete Fields
          </div>
          <div className="text-gray-900 flex flex-col">
            {_fieldsWthNoData.map((item, index: any) => (
              <div key={index}>
                {
                  site.c_taskGroups
                    .find((taskGroup) =>
                      taskGroup.tasks.some((task) => task.field === item)
                    )
                    .tasks.find((task) => task.field === item).name
                }
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RemainingFields;
