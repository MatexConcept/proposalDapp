import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import App from './App.jsx'
import {  ProposalContextProvider  } from './context/proposalContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme appearance="dark">
      < ProposalContextProvider >
        <App />
      </ ProposalContextProvider >
         {/* <App /> */}
    </Theme>
  </StrictMode>,
)