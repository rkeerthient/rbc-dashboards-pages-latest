import { TemplateRenderProps } from "@yext/pages/*";
import * as React from "react";
import { TemplateDataProvider } from "../common/useTemplateData";
import { MyContextProvider } from "../components/Context/MyContext";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import EntityPicker from "../components/EntityPicker";
import { useState } from "react";

declare global {
  interface Window {
    YEXT_AUTH: { visitor: { externalId: string } };
  }
}

interface MainProps {
  data?: TemplateRenderProps<any>;
  children?: React.ReactNode;
}

const Main = (props: MainProps) => {
  return (
    <MyContextProvider>
      <MainInternal {...props} />
    </MyContextProvider>
  );
};

const MainInternal = (props: MainProps) => {
  const { children } = props;
  return (
    <>
      <EntityPicker />
      <div className="my-12"></div>
      <Provider store={store}>
        <TemplateDataProvider value={props.data}>
          {children}
        </TemplateDataProvider>
      </Provider>
    </>
  );
};

export { Main };
