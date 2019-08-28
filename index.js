const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.get("/", function(req, res) {
  render("index", res);
});
app.get("/item", function(req, res) {
  render("item", res);
});
app.use(express.static('public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
function render(f, res) {
  fs.readFile(`views/${f}.html`, (err, data) => {
    if (err) throw err;
    res.type("html");
    res.end(data, 200);
  });
}
