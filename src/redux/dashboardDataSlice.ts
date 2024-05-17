import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coordinate } from "@yext/pages-components";
import { ComplexImage, Hours } from "@yext/types";
import {
  Address,
  C_awards,
  C_designations,
  C_education,
} from "../types/financial_professionals";
import { UserProfile } from "../types/user_profile";

interface MyContextData {
  name: string;
  mainPhone: string;
  emails: string;
  c_template: string;
  c_color: string;
  c_fonts: string;
  photoGallery: ComplexImage[];
  c_preferredFirstName: string;
  c_jobTitle: string;
  c_clientFocuses: string[];
  c_aboutAdvisorShortDescription: string;
  c_expertiseCommentsRTv2: string;
  c_hobbiesAndInterests: string[];
  c_teamDescriptionRTv2: any;
  c_languagesV2: string[];
  c_educationDisplay: C_education[];
  c_heroBanner: string;
  c_associatedBlogs: any[];
  c_associatedClientStories: any[];
  c_UpcomingEvents: any[];
  c_associatedFAQs: any[];
  c_associatedInsights: any[];
  c_associatedSolutions: any[];
  c_fAQs: any[];
  hours: Hours;
  address: Address;
  geocodedCoordinate: Coordinate;
  _site: any;
  c_designations: C_designations[];
  c_organizationsDisplay: string[];
  c_awardsDashboard: C_awards[];
  c_teamName: string;
  c_teamMembers: any[];
  c_serviceAreas: any[];
  yearsOfExperience: string;
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

export interface MyState {
  userRole: UserProfile;
  data: MyContextData;
  notification: NotificationDetails;
  completionStatus: CompletionStatus;
}

const initialState: MyState = {
  userRole: {
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    acl: [],
  },
  data: {
    name: "",
    mainPhone: "",
    emails: "",
    c_template: "",
    c_color: "",
    c_fonts: "",
    c_preferredFirstName: "",
    c_jobTitle: "",
    c_clientFocuses: [],
    c_aboutAdvisorShortDescription: "",
    c_expertiseCommentsRTv2: "",
    c_hobbiesAndInterests: [],
    c_teamDescriptionRTv2: undefined,
    c_languagesV2: [],
    c_educationDisplay: [],
    c_heroBanner: "",
    c_associatedBlogs: [],
    c_associatedClientStories: [],
    c_associatedFAQs: [],
    c_associatedInsights: [],
    c_associatedSolutions: [],
    c_fAQs: [],
    photoGallery: [],
    c_UpcomingEvents: [],
    hours: {} as Hours,
    address: {} as Address,
    geocodedCoordinate: {
      latitude: 0,
      longitude: 0,
    },
    _site: {},
    c_organizationsDisplay: [],
    c_designations: [],
    c_awardsDashboard: [],
    c_teamName: "",
    c_teamMembers: [],
    c_serviceAreas: [],
    yearsOfExperience: "",
  },
  notification: {
    fieldKey: "",
    type: "",
  },
  completionStatus: {
    NoOfFieldsWithDataCount: 0,
    FieldsWithNoData: [],
    completionPercentage: 0,
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
  },
});

export const {
  userRoleReducer,
  dataReducer,
  notificationsReducer,
  completionStatusReducer,
} = mySlice.actions;
export default mySlice.reducer;
