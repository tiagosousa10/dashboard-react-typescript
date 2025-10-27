import React, { ReactNode } from "react";
import MainHeader from "../MainHeader";
import Aside from "../Aside";
import Content from "../Content";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="relative bg-background">
      <Aside />

      {/* Main content area */}
      <div className="lg:ml-64 top-0 absolute w-full">
        <MainHeader />
        <Content>{children}</Content>
      </div>
    </div>
  );
};

export default Layout;
