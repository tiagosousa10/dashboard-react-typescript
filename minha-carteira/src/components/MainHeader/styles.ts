import styled from "styled-components";
import ToggleComponent from '../Toggle'


export const Container = styled.div`
  grid-area: MH;
  background-color: ${props => props.theme.colors.secundary};
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding: 0 10px;
  border-bottom: 1px solid ${props => props.theme.colors.gray};
`


export const Profile = styled.div`
  color: ${props => props.theme.colors.white};

`

export const Welcome = styled.div`
`

export const UserName = styled.div`

`

export const Toggle = styled(ToggleComponent)`

`
