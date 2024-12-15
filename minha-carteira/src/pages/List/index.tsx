import React from "react";
import {Container, Content} from './styles'
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";


const List : React.FC = () => {

  const options = [
    {value: 'Tiago', label:'Tiago'},
    {value: 'Joana', label:'Joana'},
    {value: 'Andre', label:'Andre'},

  ]

  return(
    <Container>
       <ContentHeader title="Saídas" lineColor="#e44c4e">
        <SelectInput options={options}/>
      </ContentHeader>

      <Content>
        <HistoryFinanceCard 
          cardColor="#313862" 
          tagColor="#e44c4e"
          title="Conta de luz" 
          subtitle="27/07/2020"
          amount="150$"
         />
          <HistoryFinanceCard 
          cardColor="#313862" 
          tagColor="#e44c4e"
          title="Conta de luz" 
          subtitle="27/07/2020"
          amount="150$"
         /> <HistoryFinanceCard 
         cardColor="#313862" 
         tagColor="#e44c4e"
         title="Conta de luz" 
         subtitle="27/07/2020"
         amount="150$"
        /> <HistoryFinanceCard 
        cardColor="#313862" 
        tagColor="#e44c4e"
        title="Conta de luz" 
        subtitle="27/07/2020"
        amount="150$"
       /> <HistoryFinanceCard 
       cardColor="#313862" 
       tagColor="#e44c4e"
       title="Conta de luz" 
       subtitle="27/07/2020"
       amount="150$"
      /> <HistoryFinanceCard 
      cardColor="#313862" 
      tagColor="#e44c4e"
      title="Conta de luz" 
      subtitle="27/07/2020"
      amount="150$"
     /> <HistoryFinanceCard 
     cardColor="#313862" 
     tagColor="#e44c4e"
     title="Conta de luz" 
     subtitle="27/07/2020"
     amount="150$"
    /> <HistoryFinanceCard 
    cardColor="#313862" 
    tagColor="#e44c4e"
    title="Conta de luz" 
    subtitle="27/07/2020"
    amount="150$"
   /> <HistoryFinanceCard 
   cardColor="#313862" 
   tagColor="#e44c4e"
   title="Conta de luz" 
   subtitle="27/07/2020"
   amount="150$"
  /> <HistoryFinanceCard 
  cardColor="#313862" 
  tagColor="#e44c4e"
  title="Conta de luz" 
  subtitle="27/07/2020"
  amount="150$"
 />
      </Content>
    </Container>
  )
}

export default List;
