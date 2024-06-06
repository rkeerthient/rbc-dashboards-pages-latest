import * as React from "react";
import Header from "./header";
import Footer from "./footer";
import { isLocal } from "../utils/isLocal";
import { getRuntime } from "@yext/pages/util";
import { useEffect, useState } from "react";
import { UserProfile } from "../types/user_profile";
import Toast from "./Toast";
import { useDispatch, useSelector } from "react-redux";
import {
  completionStatusReducer,
  dataReducer,
  userRoleReducer,
} from "../redux/dashboardDataSlice";
import { RootState } from "../redux/store";

type Props = {
  _site?: any;
  children?: any;
  document?: any;
  fields?: string[];
  setParentLoading: (loading: boolean) => void;
};

const PageLayout = ({
  _site,
  children,
  document,
  fields,
  setParentLoading,
}: Props) => {
  const dispatch = useDispatch();
  const runtime = getRuntime();

  const notificationReducer = (state: RootState) =>
    state.dashboardSlice.notification;
  const notificationSelector = useSelector(notificationReducer);

  const [resObject, setResObject] = useState<object>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (fields) {
      let noOfFieldsWithDataCount = 0;
      const fieldsWithNoData: string[] = [];

      fields.forEach((field) => {
        if (document[field] !== undefined) {
          noOfFieldsWithDataCount++;
        } else {
          fieldsWithNoData.push(field);
        }
      });

      dispatch(
        completionStatusReducer({
          fields: fields,
          NoOfFieldsWithDataCount: noOfFieldsWithDataCount,
          FieldsWithNoData: fieldsWithNoData,
          completionPercentage: (noOfFieldsWithDataCount / fields.length) * 100,
        })
      );
    }
  }, [fields]);
  /* 
   Admin user - 3427115575132210579
  Suggestions user - 1568883608704101997
*/

  const userId = isLocal()
    ? "1568883608704101997"
    : runtime.name === "browser" && window?.YEXT_AUTH?.visitor?.externalId
      ? window.YEXT_AUTH.visitor.externalId
      : "";

  useEffect(() => {
    if (document) {
      // setIsLoading(true);

      const {
        name,
        address,
        mainPhone,
        c_role,
        hours,
        c_servicesOffered,
        c_contentGrid,
        c_insights,
        c_hero,
        c_advisorBio,
        c_locator,
        languages,
        yearsOfExperience,
        c_volunteeringDisplay,
        c_preferredName,
        c_clientFocuses,
        c_hobbiesAndInterests,
        c_serviceAreas,
        c_organizations,
        c_education,
        c_designations,
        c_awards,
        emails,
        c_events,
      } = document;
      const updatedData = {
        ...(name && { name }),
        ...(address && { address }),
        ...(mainPhone && { mainPhone }),
        ...(c_role && { c_role }),
        ...(hours && { hours }),
        ...(c_servicesOffered && { c_servicesOffered }),
        ...(c_events && { c_events }),
        ...(c_contentGrid && { c_contentGrid }),
        ...(c_insights && { c_insights }),
        ...(c_hero && { c_hero }),
        ...(c_advisorBio && { c_advisorBio }),
        ...(c_locator && { c_locator }),
        ...(languages && { languages }),
        ...(yearsOfExperience && { yearsOfExperience }),
        ...(c_volunteeringDisplay && { c_volunteeringDisplay }),
        ...(c_preferredName && { c_preferredName }),
        ...(c_clientFocuses && { c_clientFocuses }),
        ...(c_hobbiesAndInterests && { c_hobbiesAndInterests }),
        ...(c_serviceAreas && { c_serviceAreas }),
        ...(c_organizations && { c_organizations }),
        ...(c_education && { c_education }),
        ...(c_designations && { c_designations }),
        ...(c_awards && { c_awards }),
        ...(emails && { emails }),
      };

      dispatch(dataReducer(updatedData));
      // setIsLoading(false);
    }
  }, [document]);

  useEffect(() => {
    setIsLoading(true);
    const getUserRole = async () => {
      try {
        if (userId) {
          const response = await fetch(`/api/users/${userId}`);
          const userResp = await response.json();
          const userString: UserProfile = await userResp.response;
          dispatch(userRoleReducer(userString));
        }
      } catch (error: any) {
        console.error(`Error fetching user data: ${JSON.stringify(error)}`);
      } finally {
        setIsLoading(false);
        setParentLoading(false);
      }
    };
    getUserRole();
  }, [userId]);

  useEffect(() => {
    const resultObject = _site.c_taskGroups.reduce((acc: any, item: any) => {
      if (item.tasks) {
        item.tasks.forEach((task: any) => {
          if (task.field && task.name) {
            acc[task.field] = task.name;
          }
        });
      }
      return acc;
    }, {});
    setResObject(resultObject);
  }, []);
  return (
    <div className="min-h-screen">
      {JSON.stringify(notificationSelector) !== '{"fieldKey":"","type":""}' && (
        <Toast
          visibility={true}
          fieldKey={notificationSelector.fieldKey}
          type={notificationSelector.type}
          fieldName={resObject[notificationSelector.fieldKey]}
        />
      )}

      <Header _site={_site} />
      {!isLoading && children}
      <Footer _site={_site}></Footer>
    </div>
  );
};

export default PageLayout;
