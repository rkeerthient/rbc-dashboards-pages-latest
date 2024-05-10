import * as React from "react";
import Cta from "../components/cta";
import { Image } from "@yext/pages-components";
type Link = {
  label: string;
  url: string;
};

const links: Link[] = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "About",
    url: "/turtlehead-tacos",
  },
];

const Header = ({ _site }: any) => {
 
 

  return (
    <>
      <div className="">
        <nav className=" flex items-center justify-between">
          {_site.c_deskHeader && (
            <Image image={_site.c_deskHeader} className="w-full"></Image>
          )} 
        </nav>
      </div>
    </>
  );
};

export default Header;
