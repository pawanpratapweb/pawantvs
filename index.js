const express = require("express");
const fs = require('fs')
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world")
})

app.get("/api", (req, res) => {
  res.sendFile(__dirname + "/api.json")
})

app.post("/api", (req, res) => {
  const data = {
    customerName: req.body.customerName,
    mobileNo: req.body.mobileNo,
    vehicleNo: req.body.vehicleNo,
    date: req.body.date,
    chassisNo: req.body.chassisNo,
  };
  fs.readFile("api.json", 'utf8', (err, _data) => {
    const __data = JSON.parse(_data);
    __data.push(data);
    fs.writeFile("api.json", JSON.stringify(__data), (err) => {
      res.send("data stored...")
    })

  })
})

app.listen(8000);