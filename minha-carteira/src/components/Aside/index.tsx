import React from "react";
import {Container, Header, LogImg, MenuContainer, MenuItemLink, Title, MenuItemButton} from './styles'
import logoImg from '../../assets/logo.svg'
import {MdDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp } from 'react-icons/md'

import { useAuth } from "../../hooks/auth";

const Aside : React.FC = () => {

  const {signOut} = useAuth()


  return(
    <Container menuIsOpen={true}>
      <Header>
        <LogImg src={logoImg} alt='logoDaMinhaCarteira' />
        <Title>Carteira</Title>
      </Header>

      <MenuContainer>
        <MenuItemLink href="/">
          <MdDashboard/>
          Dashboard
        </MenuItemLink>

        <MenuItemLink href="/list/entry-balance">
          <MdArrowUpward/>
          Entradas
        </MenuItemLink>

        <MenuItemLink href="/list/exit-balance">
          <MdArrowDownward/>
          Saídas
        </MenuItemLink>

        <MenuItemButton onClick={signOut}>
          <MdExitToApp/>
          Sair
        </MenuItemButton>

      </MenuContainer>
    </Container>
  )
}

export default Aside;
