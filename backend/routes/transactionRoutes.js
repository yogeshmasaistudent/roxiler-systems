const express = require("express");
const { initializeDatabase, listTransactions, getStatistics, getBarChartData, getPieChartData } = require("../controllers/transactionController");
const Router = express.Router();



Router.get("/",(req,res)=>{
  return res.status(200).json({msg:"Welcome From Trangition Router!"});
});


Router.get("/initialize",initializeDatabase);
Router.get("/transactions",listTransactions);
Router.get("/statistics",getStatistics);
Router.get("/bar-chart",getBarChartData);
Router.get("/pie-chart",getPieChartData);

module.exports = {
  Router
}