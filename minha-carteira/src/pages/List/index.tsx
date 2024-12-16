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
  const [monthSelected, setMonthSelected] = useState<string>(
    String(new Date().getMonth() + 1)
  );
  const [yearSelected, setYearSelected] = useState<string>(
    String(new Date().getFullYear())
  );

  const { type } = useParams();

  const title = useMemo(() => {
    return type === "entry-balance"
      ? { title: "Entradas", lineColor: "#f7931b" }
      : { title: "Saídas", lineColor: "#e44c4e" };
  }, [type]);

  const listData = useMemo(() => {
    return type === "entry-balance" ? gains : expenses;
  }, [type]); // Adicionado 'type' como dependência
  console.log('listData', listData)

  const months = [
    { value: 1, label: "Janeiro" },
    { value: 5, label: "Maio" },
    { value: 7, label: "Julho" },
  ];

  const years = [
    { value: 2020, label: 2020 },
    { value: 2019, label: 2019 },
    { value: 2018, label: 2018 },
  ];

  useEffect(() => {
    const filteredDate = listData.filter((item) => {
      const date = new Date(item.date);

      if (isNaN(date.getTime())) {
        console.warn(`Invalid date detected: ${item.date}`);
        return false;
      }
  
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      console.log('month:' ,month, 'year:', year)


      return month === Number(monthSelected) && year === Number(yearSelected);    });
  
    console.log("Filtered Data:", filteredDate);
  
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
    console.log("Formatted Data:", formattedData);
    setData(formattedData);
  }, [listData, monthSelected, yearSelected, data.length]);
  

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
        <button type="button" className="tag-filter tag-filter-recurrent">
          Recorrentes
        </button>

        <button type="button" className="tag-filter tag-filter-eventual">
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


