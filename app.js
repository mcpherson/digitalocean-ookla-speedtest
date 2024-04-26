const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.text());

app.post("/", (req, res) => {
  console.log(req.body);
  fs.appendFile("test.txt", req.body + "\n", (err) => {
    if (err) throw err;
    console.log("Text appended to file!");
  });
  res.send("Hello World!");
});

app.get("/", (req, res) => {
  fs.readFile("test.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
