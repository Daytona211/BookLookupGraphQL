const express = require("express");
const graphql = require("express-graphql");
const { Client } = require("pg");
const app = express();

app.get("/", (req, res)=>{
    res.send("WORKS");
})

const db = new Client({
  user: "jdcmfswfoasasa",
  host: "ec2-54-163-226-238.compute-1.amazonaws.com",  
  database: "d14n9n2ii7vbu5",
  password: "0cc20c0a9be1623865e96b17726981adcfe03e4215fe40aadf8d76fd78fe4d90",
  port: 5432
});
module.exports.db = db;
db.connect(() => {
  console.log("Connected to DB");
});

db.query(`SELECT * FROM BOOKS`, (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log(res.rows[0]);
  }
});

const schema = require("./schema/schema");
app.use("/graphql", graphql({ schema, graphiql: true }));


var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on port " + port);
});
