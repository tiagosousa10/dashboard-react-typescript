import React, { useMemo } from "react"
import { Container } from "./styles"

import dolarImg from '../../assets/dollar.svg'
import arrowUpImg from '../../assets/arrow-up.svg'
import arrowDownImg from '../../assets/arrow-down.svg'
import CountUp from "react-countup"


interface IWalletBoxProps {
   title:string,
   amount:number,
   footerLabel:string,
   icon: 'dolar' | 'arrowUp' | 'arrowDown' ,
   color:string
}

const WalletBox = ({title,amount,footerLabel,icon,color} : IWalletBoxProps) => {

   const iconSelected = useMemo(() => {
      switch (icon) {
         case 'dolar':
            return dolarImg;
         case 'arrowUp':
            return arrowUpImg; 
         case 'arrowDown':
            return arrowDownImg;           
         default:
            return undefined ;
      }
   },[icon])


   return(
      <Container color={color}>
         <span>  {title} </span>
         <h1> 
            <CountUp  end={amount} prefix="€ " separator="." decimal="," decimals={2}  /> </h1>
         <small> {footerLabel} </small>
         <img src={iconSelected} alt={title} /> 
      </Container>
   )
}


export default WalletBox;
