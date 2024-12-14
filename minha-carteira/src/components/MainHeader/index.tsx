import React, {useMemo} from "react";
import {Container, Profile,Welcome , UserName} from './styles'
import emojis from "../../utils/emojis";
import { Toggle } from "../Toggle";

const MainHeader : React.FC = () => {

  //gerar um emoji aleatorio
  const emoji = useMemo(() => {
    const indice = Math.floor(Math.random() * emojis.length)
    return emojis[indice]
  }, [])


  return(
    <Container>
     <Toggle/>

     <Profile>
      <Welcome>Olaá, {emoji}</Welcome>
      <UserName>Tiago Sousa</UserName>
     </Profile>
    </Container>
  )
}

export default MainHeader;
