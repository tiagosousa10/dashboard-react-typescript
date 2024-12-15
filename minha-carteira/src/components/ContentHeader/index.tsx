import React, { ReactNode } from "react";
import {Container, Controllers, TitleContainer} from './styles'

interface IContentHeaderProps  {
  title:string,
  lineColor: string,
  children:ReactNode

}

const ContentHeader = ({title,lineColor,children} : IContentHeaderProps) => {



  return(
    <Container >
     <TitleContainer lineColor={lineColor}>
      <h1>{title}</h1>
     </TitleContainer>

     <Controllers>
      {children}
     </Controllers>
    </Container>
  )
}

export default ContentHeader;
