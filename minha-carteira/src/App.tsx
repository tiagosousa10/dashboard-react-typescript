import React from "react";
import {ThemeProvider} from 'styled-components'
import GlobalStyles from "./styles/GlobalStyles";
import {Routes} from './routes'

import {useTheme } from './hooks/theme'

const App = () => {
  const {theme} = useTheme()

  return(
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes/>
    </ThemeProvider>
  )
}

export default App;
