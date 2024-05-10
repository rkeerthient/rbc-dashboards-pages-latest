import * as React from "react";
import { Image } from "@yext/pages-components";
const Footer = ({ _site }: any) => {
  return (
    <>
      {_site.c_deskFooter && (
        <Image image={_site.c_deskFooter} className="w-full"></Image>
      )}

    </>
  );
};

export default Footer;
