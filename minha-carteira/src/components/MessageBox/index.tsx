import React from "react";
import {Container} from './styles'
import happyImg from '../../assets/sad.svg'

interface IMessageBoxProps {
   title:string,
   description:string,
   footerText:string,
   icon:string
}

const MessageBox  = ({title,description,footerText,icon} : IMessageBoxProps) => {
  return(
    <Container>
      <header>
         <h1>
            {title} 
            <img src={icon} alt={title} />
        </h1>
        <p>{description}</p>
      </header>
      
      <footer>
         <span>{footerText}</span>
      </footer>
    </Container>
  )
}

export default MessageBox;
