import React, { ReactNode } from "react";
import {Container} from './styles'

type Props = {
  children: ReactNode;
}


const Content  = ({children} : Props) => {
  return(
    <Container>
     {children}
    </Container>
  )
}

export default Content;
