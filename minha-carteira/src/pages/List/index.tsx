import React, {useMemo,useState, useEffect} from "react";
import {Container, Content,Filters} from './styles'
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
import { useParams } from "react-router-dom";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";

interface IData {
  id:string
  description:string,
  amountFormated: string,
  frequency:string,
  dataFormated:string,
  tagColor:string
}

// main function
const List  = () => {
  const [data,setData] = useState<IData[]>([])
  const {type} = useParams()

  const title = useMemo(() => {
    return type === 'entry-balance' ? {
      title:'Entradas',
      lineColor: '#f7931b'
    } : {
      title:'Saídas',
      lineColor: '#e44c4e'
    }
  },[type])

  const listData = useMemo(() => {
    return type === 'entry-balance' ? gains : expenses
  },[])

  const months = [
    {value: 7, label:'Julho'},
    {value: 8, label:'Agosto'},
    {value:9, label:'Setembro'},

  ]

  const years = [
    {value:2020, label:2020},
    {value: 2019, label:2019},
    {value: 2018, label:2018},

  ]

  useEffect(() => {
  const response = listData.map((item) => {
      return{ 
          id:String(Math.random() * data.length),
          description:item.description,
          amountFormated: formatCurrency(Number(item.amount)),
          frequency:item.frequency,
          dataFormated:formatDate(item.date),
          tagColor: item.frequency === 'recorrente' ? '#4e41f0' : '#e44c4e'       
      }
    })
    setData(response)
  },[])

  return(
    <Container>
       <ContentHeader title={title.title} lineColor={title.lineColor}>
        <SelectInput options={months}/>
        <SelectInput options={years}/>
      </ContentHeader>

      <Filters>
        <button 
          type="button"
          className="tag-filter tag-filter-recurrent"
         >
          Recorrentes
         </button>

         <button 
          type="button"
          className="tag-filter tag-filter-eventual"
         >
          Eventuais
         </button>
      </Filters>

      <Content>
        {data.map((item => (
          <HistoryFinanceCard 
          key={item.id} 
          tagColor={item.tagColor}
          title={item.description}
          subtitle={item.dataFormated}
          amount={item.amountFormated}
         />
        )))}
        
         
      </Content>
    </Container>
  )
}

export default List;
