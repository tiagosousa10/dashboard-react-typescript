import React, {createContext, useState, useContext, ReactNode} from 'react'

interface IAuthContext {
   logged: boolean;
   signIn(email:string,password:string): void;
   signOut(): void;
}

type ProviderProps = {
   children: ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

const AuthProvider = ({children} : ProviderProps) => {
   const [logged,setLogged] = useState<boolean>(() => {
      const isLogged = localStorage.getItem('@minha-carteira:logged')
      return !!isLogged; // !! -> transforma em boolean e verifica se tem conteudo ou não
   });

   const signIn = (email: string,password: string) => {
      if(email === 'teste@teste.com' && password === '123'){
         localStorage.setItem('@minha-carteira:logged', 'true')
         setLogged(true)
      }  else {
         alert('senha ou utilizadores invalidos')
      }
   }

   const signOut = () => {
      localStorage.removeItem('@minha-carteira:logged')
      setLogged(false)
   }


   return(
      <AuthContext.Provider value={{logged,signIn,signOut}}  >
         {children}
      </AuthContext.Provider>
   )
}


function useAuth(): IAuthContext {
   const context = useContext(AuthContext)
   return context;
}

export {AuthProvider, useAuth}
