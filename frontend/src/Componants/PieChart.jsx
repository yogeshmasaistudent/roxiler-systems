import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import "./PieChart.css";

const PieChart = () => {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(1); // Default month is January

  useEffect(() => {
    fetchData(selectedMonth);
  }, [selectedMonth]);

  const fetchData = async (month) => {
    try {
      const response = await axios.get(
        `https://roxiler-systems-assigment-1.onrender.com/api/pie-chart?month=${month}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value, 10));
  };

  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="pie-chart-container">
      <h2 className="chart-title">Monthly Sales Breakdown</h2>
      <select
        className="select-month"
        onChange={handleMonthChange}
        value={selectedMonth}
      >
        <option value={1}>January</option>
        <option value={2}>February</option>
        <option value={3}>March</option>
        <option value={4}>April</option>
        <option value={5}>May</option>
        <option value={6}>June</option>
        <option value={7}>July</option>
        <option value={8}>August</option>
        <option value={9}>September</option>
        <option value={10}>October</option>
        <option value={11}>November</option>
        <option value={12}>December</option>
      </select>
      <div className="pie-chart-wrapper">
        <Pie data={chartData} options={chartOptions} className="PieChart" />
      </div>
      {/* <div className="data-list">
        {data.map((item, index) => (
          <p key={index} className="data-list-item">
            {item.category}: {item.count}
          </p>
        ))}
      </div> */}
    </div>
  );
};

export default PieChart;
