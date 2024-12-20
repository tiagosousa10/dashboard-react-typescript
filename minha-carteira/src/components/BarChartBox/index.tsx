import React from "react"
import { Container , SideLeft, SideRight, LegendContainer , Legend  } from "./styles"
import {ResponsiveContainer, BarChart, Bar, Cell, } from 'recharts'

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
            <LegendContainer>
               {
                  data.map((indicator) => (
                     <Legend key={indicator.name} color={indicator.color}>
                     <div>{indicator.percent}%</div>
                     <span>{indicator.name}</span>
                  </Legend>
                  ))
               }
                        
            </LegendContainer>
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
               </BarChart>
            </ResponsiveContainer>
         </SideRight>
      </Container>
   )
}


export default BarChartBox
