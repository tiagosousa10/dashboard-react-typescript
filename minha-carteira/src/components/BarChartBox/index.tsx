import React from "react"
import { Container , SideLeft, SideRight  } from "./styles"
import {ResponsiveContainer, BarChart, Bar, Cell, Tooltip,} from 'recharts'
import formatCurrency from "../../utils/formatCurrency";

interface IBarCharProps {
   title:string;
   data: {
      name:string;
      amount:number;
      percent:number;
      color:string;
   }[]
}

const BarChartBox = ({title, data} : IBarCharProps) => {
   return(
      <Container>
         <SideLeft>
            <h2>{title}</h2>
         </SideLeft>

         <SideRight>
            <ResponsiveContainer>
               <BarChart data={data}>
                  <Bar dataKey={'amount'}>
                     {data.map((indicator)  => (
                     <Cell 
                        key={indicator.name} 
                        fill={indicator.color}   
                     />
                     ))}
                  </Bar>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))}   />
               </BarChart>
            </ResponsiveContainer>
         </SideRight>
      </Container>
   )
}


export default BarChartBox
