import express from "express";
const myroutes = express.Router();

myroutes.get("/", (req, res) => {
  res.send("my main rout");
});

export default myroutes;
