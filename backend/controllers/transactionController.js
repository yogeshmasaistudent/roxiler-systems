const axios = require("axios");
const Transaction = require("../models/Transaction");
const dotenv = require("dotenv");
dotenv.config();

// Initialize Database
const initializeDatabase = async (req, res) => {
  try {
    const { data } = await axios.get(
      " https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    await Transaction.deleteMany({});
    await Transaction.insertMany(data);
    res.status(200).json({ message: "Database initialized with seed data" });
  } catch (error) {
    res.status(500).json({ error: "Failed to initialize database" });
  }
};

// **************************************************************

// List all transactions with search and pagination
// const listTransactions = async (req, res) => {
//   try {
//     const { page = 1, perPage = 10, search = "", month } = req.query;
//     const searchQuery = search
//       ? {
//           $or: [
//             { title: { $regex: search, $options: "i" } },
//             { description: { $regex: search, $options: "i" } },
//             { price: { $regex: search, $options: "i" } },
//           ],
//         }
//       : {};

//     const monthQuery = month
//       ? { $expr: { $eq: [{ $month: "$dateOfSale" }, Number(month)] } }
//       : {};

//     const query = { ...searchQuery, ...monthQuery };

//     const transactions = await Transaction.find(query)
//       .skip((page - 1) * perPage)
//       .limit(Number(perPage));

//     res.status(200).json(transactions);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch transactions" });
//   }
// };

const listTransactions = async (req, res) => {
  try {
    const {
      page = 1,
      perPage = 10,
      search = "",
      category = "",
      price = "",
      month,
    } = req.query;

    // Build search query
    const searchQuery = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const categoryQuery = category
      ? { category: { $regex: category, $options: "i" } }
      : {};

    const priceQuery = price ? { price: { $regex: price, $options: "i" } } : {};

    const monthQuery = month
      ? { $expr: { $eq: [{ $month: "$dateOfSale" }, Number(month)] } }
      : {};

    // Combine all queries
    const query = {
      ...searchQuery,
      ...categoryQuery,
      ...priceQuery,
      ...monthQuery,
    };

    // Fetch transactions from database with pagination
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    // Send response
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};







// ****************************************************

// Get statistics for a selected month
const getStatistics = async (req, res) => {
  try {
    const { month } = req.query;

    const monthQuery = month
      ? { $expr: { $eq: [{ $month: "$dateOfSale" }, Number(month)] } }
      : {};

    const totalSales = await Transaction.aggregate([
      { $match: monthQuery },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$price" },
          soldItems: { $sum: { $cond: ["$sold", 1, 0] } },
          notSoldItems: { $sum: { $cond: ["$sold", 0, 1] } },
        },
      },
    ]);

    res
      .status(200)
      .json(totalSales[0] || { totalSales: 0, soldItems: 0, notSoldItems: 0 });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
};

// Get bar chart data
const getBarChartData = async (req, res) => {
  try {
    const { month } = req.query;

    const monthQuery = month
      ? { $expr: { $eq: [{ $month: "$dateOfSale" }, Number(month)] } }
      : {};

    const priceRanges = [
      { range: "0-100", min: 0, max: 100 },
      { range: "101-200", min: 101, max: 200 },
      { range: "201-300", min: 201, max: 300 },
      { range: "301-400", min: 301, max: 400 },
      { range: "401-500", min: 401, max: 500 },
      { range: "501-600", min: 501, max: 600 },
      { range: "601-700", min: 601, max: 700 },
      { range: "701-800", min: 701, max: 800 },
      { range: "801-900", min: 801, max: 900 },
      { range: "901-above", min: 901, max: Number.MAX_SAFE_INTEGER },
    ];

    const barChartData = await Promise.all(
      priceRanges.map(async (range) => {
        const count = await Transaction.countDocuments({
          ...monthQuery,
          price: { $gte: range.min, $lte: range.max },
        });
        return { range: range.range, count };
      })
    );

    res.status(200).json(barChartData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bar chart data" });
  }
};




// Get pie chart data
const getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;

    const monthQuery = month
      ? { $expr: { $eq: [{ $month: "$dateOfSale" }, Number(month)] } }
      : {};

    const pieChartData = await Transaction.aggregate([
      { $match: monthQuery },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $project: { _id: 0, category: "$_id", count: 1 } },
    ]);

    res.status(200).json(pieChartData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pie chart data" });
  }
};
module.exports = {
  initializeDatabase,
  listTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
};
