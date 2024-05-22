import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Address,
  C_awards,
  C_clientFocuses,
  C_education,
  C_hero,
  C_locator,
  C_serviceAreas,
  Hours,
} from "../types/financial_professionals";
import { UserProfile } from "../types/user_profile";

interface MyContextData {
  name: string;
  address: Address;
  mainPhone: string;
  c_role: string;
  hours: Hours;
  c_contentCarousel: any[];
  c_contentGrid: any[];
  c_insights: any[];
  c_hero: C_hero;
  c_advisorBio: string;
  c_locator: C_locator;
  languages: string[];
  yearsOfExperience: string;
  c_volunteeringDisplay: string[];
  c_preferredName: string;
  c_clientFocuses: C_clientFocuses[];
  c_hobbiesAndInterests: any[];
  c_serviceAreas: C_serviceAreas[];
  c_organizations: string[];
  c_education: C_education[];
  c_designations: string[];
  c_awards: C_awards[];
  emails: string[];
}

interface NotificationType {
  type: "updated" | "created" | "undefined";
}
interface NotificationDetails {
  fieldKey: string;
  type: string;
}

interface CompletionStatus {
  NoOfFieldsWithDataCount: number;
  FieldsWithNoData: string[];
  completionPercentage: number;
}

export interface DashboardNumbers {
  pending: number;
  approved: number;
  rejected: number;
  cancelled: number;
}

export interface MyState {
  userRole: UserProfile;
  data: MyContextData;
  notification: NotificationDetails;
  completionStatus: CompletionStatus;
  dashboardNumbers: DashboardNumbers;
}

const initialState: MyState = {
  notification: {
    fieldKey: "",
    type: "",
  },
  userRole: {
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    acl: [],
  },
  data: {
    name: "",
    address: {},
    mainPhone: "",
    c_role: "",
    hours: {},
    c_contentCarousel: [],
    c_contentGrid: [],
    c_insights: [],
    c_hero: {},
    c_advisorBio: "",
    c_locator: {},
    languages: [],
    yearsOfExperience: "",
    c_volunteeringDisplay: [],
    c_preferredName: "",
    c_clientFocuses: [],
    c_hobbiesAndInterests: [],
    c_serviceAreas: [],
    c_organizations: [],
    c_education: [],
    c_designations: [],
    c_awards: [],
    emails: [],
  },

  completionStatus: {
    NoOfFieldsWithDataCount: 0,
    FieldsWithNoData: [],
    completionPercentage: 0,
  },
  dashboardNumbers: {
    pending: 0,
    approved: 0,
    rejected: 0,
    cancelled: 0,
  },
};

const mySlice = createSlice({
  name: "mySlice",
  initialState,
  reducers: {
    userRoleReducer: (state, action: PayloadAction<UserProfile>) => {
      state.userRole = action.payload;
    },
    dataReducer: (state, action: PayloadAction<MyContextData>) => {
      console.log(JSON.stringify(action.payload));

      state.data = action.payload;
    },
    notificationsReducer: (
      state,
      action: PayloadAction<NotificationDetails>
    ) => {
      state.notification = action.payload;
    },
    completionStatusReducer: (
      state,
      action: PayloadAction<CompletionStatus>
    ) => {
      state.completionStatus = action.payload;
    },
    dashboardNumbersReducer: (
      state,
      action: PayloadAction<DashboardNumbers>
    ) => {
      state.dashboardNumbers = action.payload;
    },
  },
});

export const {
  userRoleReducer,
  dataReducer,
  notificationsReducer,
  completionStatusReducer,
  dashboardNumbersReducer,
} = mySlice.actions;
export default mySlice.reducer;
