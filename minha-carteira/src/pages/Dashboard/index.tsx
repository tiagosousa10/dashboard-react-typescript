import React from "react";
import {Container} from './styles'
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";

const Dashboard : React.FC = () => {

  const options = [
    {value: 'Tiago', label:'Tiago'},
    {value: 'Joana', label:'Joana'},
    {value: 'Andre', label:'Andre'},

  ]

  return(
    <Container>
      <ContentHeader title="Dashboard" lineColor="#f7931b">
        <SelectInput options={options} onChange={() => {}} />
      </ContentHeader>
    </Container>
  )
}

export default Dashboard;
