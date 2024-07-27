
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Routing from './router';


const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
function App() {
  
  return (
    <GoogleOAuthProvider
    clientId={clientId}
    onScriptLoadError={() => console.log("실패")}
    onScriptLoadSuccess={() => console.log("성공")}
  >
    <Routing/>
    </GoogleOAuthProvider>
  )
}

export default App
