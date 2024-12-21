import React, {createContext, ReactNode, useContext, useState} from "react";

import dark from "../styles/themes/dark";
import light from "../styles/themes/light";  

interface IThemeContext {
   toggleTheme(): void;
   theme: ITheme;
}

interface ITheme {
   title: string,

   colors: {
      primary: string,
      secundary: string,
      tertiary:string,

      white:string,
      black:string,
      gray:string,

      success: string,
      info:string,
      warning: string,
   }
}

type ProviderProps = {
   children: ReactNode
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext)

const ThemeProvider  = ({children} : ProviderProps ) => {
   const [theme, setTheme] = useState<ITheme>(() => {
      const themeSaved = localStorage.getItem('@minha-carteira:theme');

      if(themeSaved){
         return JSON.parse(themeSaved) // transformar em json
      } else {
         return dark; // or ligh -> default
      }
   })

   const toggleTheme = () => {
      if (theme.title === 'dark') {
         setTheme(light)
         localStorage.setItem('@minha-carteira:theme',JSON.stringify(light)) // transformar em string
      } else {
         setTheme(dark)
         localStorage.setItem('@minha-carteira:theme',JSON.stringify(dark))
      }
   }

   return (
      <ThemeContext.Provider value={{toggleTheme, theme}} >
         {children}
      </ThemeContext.Provider>
   )
}

function useTheme() : IThemeContext {
   const context = useContext(ThemeContext)

   return context;
} 


export {ThemeProvider, useTheme}
