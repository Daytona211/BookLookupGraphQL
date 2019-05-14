const express = require("express");
const graphql = require("express-graphql");
const { Client } = require("pg");
const app = express();

app.get("/", (req, res)=>{
    res.send("WORKS");
})

const db = new Client({
  user: "daytona",
  host: process.env.DATABASE_URL,
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


var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on port 4000");
});
