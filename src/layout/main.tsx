import { TemplateRenderProps } from "@yext/pages/*";
import * as React from "react";
import { TemplateDataProvider } from "../common/useTemplateData";
import { MyContextProvider } from "../components/Context/MyContext";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import EntityPicker from "../components/EntityPicker";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "../components/my-site/ui/toast/toaster";

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <EntityPicker />
        <Provider store={store}>
          <TemplateDataProvider value={props.data}>
            {children}
          </TemplateDataProvider>
        </Provider>
      </QueryClientProvider>
      <Toaster />
    </>
  );
};

export { Main };
