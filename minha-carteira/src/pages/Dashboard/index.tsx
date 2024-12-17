import React, { useMemo, useState } from "react";
import {Container, Content} from './styles'

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";


import expenses from "../../repositories/expenses";
import gains from "../../repositories/gains";
import listOfMonths from '../../utils/months'
import MessageBox from "../../components/MessageBox";

import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'

const Dashboard : React.FC = () => {
    const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1));
    const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));
  
  const options = [
    {value: 'Tiago', label:'Tiago'},
    {value: 'Joana', label:'Joana'},
    {value: 'Andre', label:'Andre'},

  ]
    const years = useMemo(() => {
      const uniqueYears: number[] = [];
  
      [...expenses, ...gains].forEach(item => {
        const date = new Date(item.date);
        const year = date.getFullYear();
  
        if (!uniqueYears.includes(year)) {
          uniqueYears.push(year);
        }
      })
  
      return uniqueYears.map((year) => {
        return {
          value: year,
          label: year
        }
      })
  
    }, []);
  
    const months = useMemo(() => {
      return listOfMonths.map((month, index) => {
        return {
          value: index + 1,
          label: month
        }
      })
    }, [])
  

  const handleMonthSelected = (month:string) => {
    try{
      const parseMonth= (month)
      setMonthSelected(parseMonth)
    }catch(e){
      throw new Error('invalid month value.')
      console.log('error: ',e)
    }
  }

  const handleYearSelected = (year:string) => {
    try{
      const parseYear = year
      setYearSelected(parseYear)
      
    }catch(e){
      throw new Error('invalid year value')
      console.log('errorYEAR', e)
    }
  }

  return(
    <Container>
      <ContentHeader title="Dashboard" lineColor="#f7931b">
      <SelectInput
          options={months}
          onChange={(e) => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={(e) => handleYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>

      <Content>
        <WalletBox
          title="saldo"
          amount={150.00} 
          footerLabel="Atualizado com base nas entradas e saidas"
          icon="dolar"
          color="#4e41f0"
        />

        <WalletBox
          title="entradas"
          amount={5000.00} 
          color="#f7931b"
          footerLabel="Atualizado com base nas entradas e saidas"
          icon="arrowUp"
        />
        
        <WalletBox
          title="saidas"
          amount={4860.00} 
          color="#e44c4e"
          footerLabel="Atualizado com base nas entradas e saidas"
          icon="arrowDown"
        />

        <MessageBox 
          title="Muito bem!" 
          description="A tua carteira está positiva!"
          footerText="Continua assim. Considera investir o teu saldo!"
          icon={happyImg}
       />
      </Content>
    </Container>
  )
}

export default Dashboard;
