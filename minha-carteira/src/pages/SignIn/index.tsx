import React from "react";
import {Container, Logo, Form, FormTitle} from './styles'
import logoImg from '../../assets/logo.svg'
import Input from "../../components/Input";


const SignIn = () => {
  return(
   <Container>
    <Logo>
      <img src={logoImg} alt="minha-carteira" /> 
      <h2>Minha Carteira</h2>
    </Logo>

    <Form onSubmit={() => {}}>
      <FormTitle>
        Entrar
      </FormTitle>
      <Input type="email" required placeholder="e-mail" />
      <Input type="password" required placeholder="palavra-passe"/>

      <button type="submit">Acessar</button>
    </Form>
   </Container>
  )
}

export default SignIn;
