const express = require("express");
const fs = require("fs");
const USER = process.env.USR;
const PASSWORD = process.env.PASSWORD;

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.text());

app.post("/mcpherson", (req, res) => {
  let auth = Buffer.from(req.headers.authorization.split(" ")[1], "base64")
    .toString()
    .split(":");

  let usr = auth[0];
  let pw = auth[1];
  if (usr !== USER || pw !== PASSWORD) {
    res.send("Nice try.");
    return;
  }

  fs.appendFile("test.txt", req.body + "\n", (err) => {
    if (err) throw err;
  });
  res.send();
});

app.get("/mcpherson", (req, res) => {
  fs.readFile("test.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.set("content-type", "text/plain");  
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
