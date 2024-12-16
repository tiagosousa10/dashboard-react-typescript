import React, { useMemo, useState, useEffect } from "react";
import { Container, Content, Filters } from "./styles";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
import { useParams } from "react-router-dom";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import listOfmonths from "../../utils/months";

interface IData {
  id: string;
  description: string;
  amountFormated: string;
  frequency: string;
  dataFormated: string;
  tagColor: string;
}

const List = () => {
  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1));
  const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear())
  );
  const [selectedFrequency,setSelectedFrequency] = useState(['recorrente', 'eventual'])

  const { type } = useParams();

  const title = useMemo(() => {
    return type === "entry-balance"
      ? { title: "Entradas", lineColor: "#f7931b" }
      : { title: "Saídas", lineColor: "#e44c4e" };
  }, [type]);

  const listData = useMemo(() => {
    return type === "entry-balance" ? gains : expenses;
  }, [type]); // Adicionado 'type' como dependência
  //console.log('listData', listData)

  const months = useMemo(() => {
    return listOfmonths.map((month,index) => {
      return{
        value:index + 1,
        label:month
      }
    } )
  }, [])

  const years = useMemo(() => {
    const uniqueYears : number[] = [];

    listData.forEach(item => {
      const date= new Date(item.date)
      const year = date.getFullYear()

      if(!uniqueYears.includes(year)){
        uniqueYears.push(year)
      }
    })

    return uniqueYears.map((year) => {
      return{
        value:year,
        label:year
      }
    }
     
    )
  }, [listData])

  const handleFrequencyClick = (frequency:string) => {
    const alreadySelected = selectedFrequency.findIndex((item) => item === frequency);

    if(alreadySelected >= 0) {
      const filtered = selectedFrequency.filter((item) => item !== frequency)
      setSelectedFrequency(filtered)
    } else {
      setSelectedFrequency((oldSelected) => [...oldSelected, frequency ])
    }
  }



  useEffect(() => {
    const filteredDate = listData.filter((item) => {
      const date = new Date(item.date);

      if (isNaN(date.getTime())) {
        //console.warn(`Invalid date detected: ${item.date}`);
        return false;
      }
  
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      //console.log('month:' ,month, 'year:', year)


      return month === Number(monthSelected) && year === Number(yearSelected) && selectedFrequency.includes(item.frequency);   
    
    });
  
    //console.log("Filtered Data:", filteredDate);
  
    const formattedData = filteredDate.map((item,index) => {
      return {
        id:String(index) ,
        description: item.description,
        amountFormated: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dataFormated: formatDate(item.date),
        tagColor: item.frequency === "recorrente" ? "#4e41f0" : "#e44c4e",
        
      };

    });
    //console.log("Formatted Data:", formattedData);
    setData(formattedData);
  }, [listData, monthSelected, yearSelected, data.length, selectedFrequency]);
  


  return (
    <Container>
      <ContentHeader title={title.title} lineColor={title.lineColor}>
        <SelectInput
          options={months}
          onChange={(e) => setMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={(e) => setYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>

      <Filters>
        <button 
          type="button" 
          className={`tag-filter tag-filter-recurrent ${selectedFrequency.includes('recorrente') && 'tag-actived'}  ` }
          onClick={() => handleFrequencyClick('recorrente')}
        >
          Recorrentes
        </button>

        <button 
          type="button" 
          className={`tag-filter tag-filter-eventual ${selectedFrequency.includes('eventual') && 'tag-actived'}`}
          onClick={() => handleFrequencyClick('eventual')}
         >
          Eventuais
        </button>
      </Filters>

      <Content>
        {data.map((item) => (
          <HistoryFinanceCard
            key={item.id}
            tagColor={item.tagColor}
            title={item.description}
            subtitle={item.dataFormated}
            amount={item.amountFormated}
          />
        ))}
      </Content>
    </Container>
  );
};

export default List;


