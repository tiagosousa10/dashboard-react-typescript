import React, {useMemo} from "react";
import {Container, Profile,Welcome , UserName} from './styles'
import emojis from "../../utils/emojis";


const MainHeader : React.FC = () => {

  const emoji = useMemo(() => {
    const indice = Math.floor(Math.random() * emojis.length)
    return emojis[indice]
  }, [])


  return(
    <Container>
     <h1>Toogle</h1>

     <Profile>
      <Welcome>Olaá, {emoji}</Welcome>
      <UserName>Tiago Sousa</UserName>
     </Profile>
    </Container>
  )
}

export default MainHeader;
