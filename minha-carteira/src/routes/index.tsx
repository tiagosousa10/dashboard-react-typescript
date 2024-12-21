import React from "react";
import {BrowserRouter} from 'react-router-dom'

import { useAuth } from "../hooks/auth";

import AppRoutes  from "./app.routes";
import AuthRoutes from "./auth.routes";

export const Routes = () => {
   const {logged} = useAuth()
   return(
      <BrowserRouter>
         {logged ? <AppRoutes/> : <AuthRoutes/>  }         
      </BrowserRouter>
   )
}


