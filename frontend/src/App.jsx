import React from "react";
import TransactionsTable from "./Componants/TransactionsTable";
import "./App.css";
import Navbar from "./Componants/Navbar";
import { Route, Router, Routes } from "react-router-dom";
import Staticdata from "./Componants/Staticdata";
import BasicChart from "./Componants/BarChart";
import PieChart from "./Componants/PieChart";


function App() {
  return (
    <div>
      <Navbar />
     
      <Routes>
        <Route path="/" element={<TransactionsTable />} />
        <Route path="/static" element={<Staticdata />} />
        <Route path="/barchart" element={<BasicChart/>}/>
        <Route path="/dashboard" element={<PieChart/>}/>
      </Routes>

      {/* <TransactionsTable /> */}

     
    </div>
  );
}

export default App;
