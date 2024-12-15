import React from "react";
import {Container, Controllers, TitleContainer} from './styles'

const ContentHeader : React.FC = () => {
  return(
    <Container>
     <TitleContainer>
      <h1>Titulo</h1>
     </TitleContainer>

     <Controllers>
      <button>Boatao A</button>
      <button>Boatao B</button>
     </Controllers>
    </Container>
  )
}

export default ContentHeader;
