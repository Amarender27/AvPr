const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const serviceRoutes = require("./routes/serviceRoutes")
const processKey = require("./prodKeys");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(async function (request, response, next) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.locals.request = request;

  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  response.header("Access-Control-Allow-Credentials", true);

  response.header("Access-Control-Allow-Methods", "GET,PUT,POST");

  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, isprod"
  );
  if (request.method === "OPTIONS") {
    // Pre-flight request. Reply successfully without processing the request.
    res.status(200).end();
    return;
  }
  //authorize
  return next();
});
//for solving error  with cors put it before authentication call

app.options("*", function (request, response) {
  response.sendStatus(200);
});

const server = http.createServer(app);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/services", serviceRoutes);

// app.listen(3004, () => console.log("Server running on port 3004"));
console.log("port", process.env.PORT || processKey.port);

server.listen(process.env.PORT || processKey.port);
const mongoClient = new MongoClient(
  encodeURI(
    "mongodb+srv://vadugulaamarender:3zW3UFGzO6j9taFL@cluster0.kzov5.mongodb.net/PrAv"
  ),
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

mongoClient
  .connect()
  .then(() => {
    app.request.db = mongoClient.db("PrAv");
    app.request.mongoClient = mongoClient;
    console.log("Connected successfully to server");
  })
  .catch((err) => {
    console.error(err.message);
  }).finally;
