import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import "./styles.css"
import "@fontsource/raleway";
// import dotenv from 'dotenv';
// dotenv.config()
console.log("Index: " + process.env.RENDER_V)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)