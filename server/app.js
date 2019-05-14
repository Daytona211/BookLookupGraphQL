const express = require("express");
const graphql = require("express-graphql");
const { Client } = require("pg");
const app = express();

const db = new Client({
  user: "daytona",
  host: "graphqlwork.cvgfqdtlcqye.us-east-2.rds.amazonaws.com",
  database: "booklookup",
  password: "123456789",
  port: 5432
});
module.exports.db = db;
db.connect(() => {
  console.log("Connected to DB");
});

// db.query(`SELECT * FROM BOOKS`, (err, res) => {
//   if (err) {
//     console.log(err.stack);
//   } else {
//     console.log(res.rows[0]);
//   }
// });

const schema = require("./schema/schema");
app.use("/graphql", graphql({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
