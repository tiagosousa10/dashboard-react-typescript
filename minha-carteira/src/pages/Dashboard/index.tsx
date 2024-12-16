import React, { useMemo, useState } from "react";
import {Container} from './styles'

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";

import expenses from "../../repositories/expenses";
import gains from "../../repositories/gains";
import listOfMonths from '../../utils/months'


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
    </Container>
  )
}

export default Dashboard;
