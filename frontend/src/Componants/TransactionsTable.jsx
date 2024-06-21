import React, { useEffect, useState } from "react";
import "./TransactionsTable.css"; // Import the CSS file

function TransactionsTable() {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState("March");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);



  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getMonthNumber = (monthName) => {
    return monthNames.indexOf(monthName) + 1;
  };

  async function fetchData() {
    try {
      const monthNumber = month ? getMonthNumber(month) : "";
      const res = await fetch(
        `https://roxiler-systems-assigment-1.onrender.com/api/transactions?${
          monthNumber ? `month=${monthNumber}&` : ""
        }page=${page}`
      );
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [month, search, page]);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setPage(1); // Reset to first page on month change
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search change
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <div className="transactions-container">
      <div className="header">
        <h2>Transaction Dashboard</h2>
      </div>
      <div className="transactions-controls">
        <select
          value={month}
          onChange={handleMonthChange}
          className="month-select"
        >
          <option value="">Select a month</option>
          {monthNames.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search transactions"
          value={search}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.dateOfSale}</td>
              <td className="image-cover">
                <img
                  src={transaction.image}
                  alt={transaction.title}
                  className="transaction-image"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="page-number">{page}</span>
        <button onClick={handleNextPage} className="pagination-button">
          Next
        </button>
      </div>
    </div>
  );
}

export default TransactionsTable;
