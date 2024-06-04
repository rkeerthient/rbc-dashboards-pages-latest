import { LexicalRichText } from "@yext/pages-components";
import * as React from "react";
import { useEffect, useState } from "react";
import { FcCancel } from "react-icons/fc";
import { FiCheck, FiRefreshCw } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { dashboardNumbersReducer } from "../../redux/dashboardDataSlice";
import { RootState } from "../../redux/store";
import { SuggestionsRoot } from "./Suggestions";
export type Address = {
  line1: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
};

type DBBanner = {
  name?: string;
  address?: Address;
  openTime?: string;
  children?: React.ReactNode;
  headshot: any;
  _site?: any;
  color: string;
  styleSheetRef: string;
  setCurrentTab: (item: string) => void;
  slug: string;
};

const DBBanner = (props: DBBanner) => {
  const dashboardNumbers = (state: RootState) =>
    state.dashboardSlice.dashboardNumbers;
  const _dashboardNumbers = useSelector(dashboardNumbers);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { name, children, headshot } = props;

  useEffect(() => {
    const entityId = `32311308`;
    let suggestionStatusCount: any = {};
    setIsLoaded(false);
    const getSuggestions = async () => {
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
      } finally {
        setIsLoaded(true);
      }
    };
    getSuggestions();
  }, []);

  return (
    <>
      <div
        style={{ background: "white" }}
        className="  p-4 flex items-center justify-center flex-row space-x-20 w-full"
      >
        <div className="flex items-center flex-row  gap-4">
          <div>
            {headshot && (
              <img src={headshot.image.url} className="w-72 h-auto"></img>
            )}
          </div>
          <div className="w-3/5 flex flex-col gap-4">
            <div className="text-3xl font-bold">
              Welcome, {name?.split("-")[0]}!
            </div>
            <div>
              {props._site.c_dashboardHeroDescription && (
                <LexicalRichText
                  serializedAST={JSON.stringify(
                    props._site.c_dashboardHeroDescription.json
                  )}
                />
              )}
            </div>
            <div className="flex gap-4">
              <div className="bg-slate-200 px-4 py-2 rounded-md text-gray-800 font-semibold text-xs ">
                {props.name?.split("-")[0]}
              </div>
              <div className="bg-slate-200 px-4 py-2 rounded-md text-gray-800 font-semibold text-xs">
                <a
                  href="https://tightly-rough-tuna.pgsdemo.com/advisor/32311308"
                  target="_blank"
                >
                  Preview page
                </a>
                {/* <Portal
                  open={open}
                  setOpen={setOpen}
                  data={data}
                  styleSheetRef={styleSheetRef}
                ></Portal> */}
              </div>
              <a
                href="https://www.yext.com/s/4189325/yextsites/145670/editor#templateId=financialProfessional&layoutId=advisorPage&entityId=32311308&view=EDIT"
                className="bg-slate-200 px-4 py-2 rounded-md text-gray-800 font-semibold text-xs"
                target="_blank"
              >
                Edit Page
              </a>
            </div>
          </div>

          <div className="bg- shadow-lg text-center text-gray-800 m-auto flex justify-center items-center w-2/5 py-8 mx-auto">
            <div className="flex flex-col gap-4 w-full px-4">
              <div className="text-xl font-semibold">Approval Requests </div>
              {!isLoaded ? (
                <div className="animate-pulse flex flex-col gap-4 w-full px-4">
                  <div className="w-full grid grid-cols-4 justify-between">
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <div className="h-2 w-2 bg-slate-700 rounded"></div>
                      <div className="h-2 w-14 bg-slate-700 rounded"> </div>
                      <FiRefreshCw className="h-3 w-3 text-orange-500" />
                    </div>
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <div className="h-2 w-2 bg-slate-700 rounded"> </div>
                      <div className="h-2 w-14 bg-slate-700 rounded"> </div>
                      <FiCheck className="h-3 w-3 text-green-500" />
                    </div>
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <div className="h-2 w-2 bg-slate-700 rounded"> </div>
                      <div className="h-2 w-14 bg-slate-700 rounded"> </div>
                      <GrFormClose className="h-3 w-3 text-red-500" />
                    </div>
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <div className="h-2 w-2 bg-slate-700 rounded"> </div>
                      <div className="h-2 w-14 bg-slate-700 rounded"> </div>
                      <FcCancel className="h-3 w-3 text-gray-800" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full grid grid-cols-4 justify-between">
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <div className="text-xl">{_dashboardNumbers.pending}</div>
                    <div className="text-sm">Pending</div>
                    <FiRefreshCw className="h-3 w-3 text-orange-500" />
                  </div>
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <div className="text-xl">{_dashboardNumbers.approved}</div>
                    <div className="text-sm">Approved</div>
                    <FiCheck className="h-3 w-3 text-green-500" />
                  </div>
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <div className="text-xl">{_dashboardNumbers.rejected}</div>
                    <div className="text-sm">Rejected</div>
                    <GrFormClose className="h-3 w-3 text-red-500" />
                  </div>
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <div className="text-xl">{_dashboardNumbers.cancelled}</div>
                    <div className="text-sm">Cancelled</div>
                    <FcCancel className="h-3 w-3 text-gray-800" />
                  </div>
                </div>
              )}
              <div
                className="bg-gray-700 px-4 py-2 mx-auto rounded-md text-gray-50 text-sm w-fit hover:cursor-pointer"
                onClick={() => props.setCurrentTab("tabs")}
              >
                View All Approval Requests
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default DBBanner;
