require('dotenv').config();
const sql = require('mssql');

module.exports = {
  sql,
  config: process.env.CONNECTION_STRING,
};