import { TemplateRenderProps } from "@yext/pages/*";
import * as React from "react";
import { TemplateDataProvider } from "../common/useTemplateData";
import { MyContextProvider } from "../components/Context/MyContext";
import { Provider } from "react-redux";
import { store } from "../redux/store";

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
    <Provider store={store}>
      <TemplateDataProvider value={props.data}>{children}</TemplateDataProvider>
    </Provider>
  );
};

export { Main };
