import React, { ReactNode } from "react";
import { Grid } from "./styles";

import MainHeader from "../MainHeader";
import Aside from "../Aside";
import Content from "../Content";

type Props = {
  children: ReactNode;
}


const Layout = ({children} : Props) => {
  return(
    <Grid>
      <MainHeader/>
      <Aside/>
      <Content>
        {children}
      </Content>
    </Grid>
  )
}

export default Layout;
