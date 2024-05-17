import * as React from "react";
import Header from "./header";
import Footer from "./footer";
import { isLocal } from "../utils/isLocal";
import { getRuntime } from "@yext/pages/util";
import { useEffect, useState } from "react";
import { useMyContext } from "./Context/MyContext";
import { UserProfile } from "../types/user_profile";
import Toast from "./Toast";

type Props = {
  _site?: any;
  children?: any;
  document?: any;
};

const PageLayout = ({ _site, children, document }: Props) => {
  const runtime = getRuntime();
  const { setUserRole, setData, notification } = useMyContext();
  const [resObject, setResObject] = useState<object>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { fieldKey, type } = notification;

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
      setIsLoading(true);

      const {
        name,
        mainPhone,
        emails,
        c_template,
        c_color,
        c_fonts,
        c_preferredFirstName,
        c_jobTitle,
        c_clientFocuses,
        c_aboutAdvisorShortDescription,
        c_expertiseCommentsRTv2,
        c_hobbiesAndInterests,
        c_teamDescriptionRTv2,
        c_languagesV2,
        c_educationDisplay,
        c_heroBanner,
        c_associatedBlogs,
        c_associatedClientStories,
        c_associatedFAQs,
        c_associatedInsights,
        c_associatedSolutions,
        photoGallery,
        hours,
        address,
        geocodedCoordinate,
        c_designations,
        _site,
        c_organizationsDisplay,
        c_awardsDashboard,
        c_teamName,
        c_teamMembers,
        c_serviceAreas,
        c_fAQs,
        yearsOfExperience,
        c_UpcomingEvents,
      } = document;

      const updatedData = {
        ...(name && { name }),
        ...(mainPhone && { mainPhone }),
        ...(emails && { emails }),
        ...(c_template && { c_template }),
        ...(c_color && { c_color }),
        ...(c_fonts && { c_fonts }),
        ...(c_preferredFirstName && { c_preferredFirstName }),
        ...(c_jobTitle && { c_jobTitle }),
        ...(c_clientFocuses && { c_clientFocuses }),
        ...(c_aboutAdvisorShortDescription && {
          c_aboutAdvisorShortDescription,
        }),
        ...(c_expertiseCommentsRTv2 && { c_expertiseCommentsRTv2 }),
        ...(c_hobbiesAndInterests && { c_hobbiesAndInterests }),
        ...(c_teamDescriptionRTv2 && { c_teamDescriptionRTv2 }),
        ...(c_teamName && { c_teamName }),
        ...(c_fAQs && { c_fAQs }),
        ...(c_languagesV2 && { c_languagesV2 }),
        ...(c_educationDisplay && { c_educationDisplay }),
        ...(c_heroBanner && { c_heroBanner }),
        ...(c_associatedBlogs && { c_associatedBlogs }),
        ...(c_associatedClientStories && { c_associatedClientStories }),
        ...(c_associatedFAQs && { c_associatedFAQs }),
        ...(c_associatedInsights && { c_associatedInsights }),
        ...(c_associatedSolutions && { c_associatedSolutions }),
        ...(photoGallery && { photoGallery }),
        ...(hours && { hours }),
        ...(address && { address }),
        ...(geocodedCoordinate && { geocodedCoordinate }),
        ...(c_designations && { c_designations }),
        ...(c_organizationsDisplay && { c_organizationsDisplay }),
        ...(_site && { _site }),
        ...(c_awardsDashboard && { c_awardsDashboard }),
        ...(c_teamMembers && { c_teamMembers }),
        ...(c_serviceAreas && { c_serviceAreas }),
        ...(yearsOfExperience && { yearsOfExperience }),
        ...(c_UpcomingEvents && { c_UpcomingEvents }),
      };

      setData((prevData) => ({ ...prevData, ...updatedData }));
      setIsLoading(false);
    }
  }, [document]);

  useEffect(() => {
    setIsLoading(true);

    const getUserRole = async () => {
      console.log(`emyrtrf`);

      try {
        if (userId) {
          const response = await fetch(`/api/users/${userId}`);
          const userResp = await response.json();
          const userString: UserProfile = await userResp.response;
          setUserRole(userString);
        }
      } catch (error: any) {
        console.error(`Error fetching user data: ${JSON.stringify(error)}`);
      } finally {
        setIsLoading(false);
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
      {JSON.stringify(notification) !== "{}" && (
        <Toast
          visibility={true}
          fieldKey={fieldKey}
          type={type}
          fieldName={resObject[fieldKey]}
        />
      )}

      <Header _site={_site} />
      {isLoading ? (
        <div
          className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
      ) : (
        children
      )}
      <Footer _site={_site}></Footer>
    </div>
  );
};

export default PageLayout;
