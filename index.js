const express = require("express");
const fs = require("fs");
const jf = require("jsonfile")
const app = express();
const port = process.env.PORT || 8080;
app.set('view engine', 'ejs');


app.get("/", function(req, res) {
  render("index", res);
});
app.get("/item", function(req, res) {
  render("item", res);
});
app.get('/items/:type/:item/:tier', (req, res) => {
  jf.readFile("items.json",function (err, obj) {
    if (err) console.error(err)
    if(!obj[req.params.type][req.params.item][req.params.tier]){
      res.end("Sorry this isn't supported yet!")
    }else{
    var number = req.params.tier;
    var obj = obj[req.params.type];
    var itemObj = obj[req.params.item];
    var tierObj = itemObj[number];
    var baseURL = `/items/${req.params.type}/${req.params.item}`
    var unlockURL = tierObj.image;
    var title = itemObj.title;
    var itemUrl = itemObj.image;
    /*
    var cf = tierObj.matrix;
    console.log(cf)
    var mat = tierObj.mat;
    */
    var unlockName = tierObj.unlocks;
    var type = itemObj.type;
    res.render('item-template', {itemName: title, type: type, tNumber: number, itemUrl : itemUrl, unlockURL: unlockURL, baseURL : baseURL, unlockName: unlockName /*, cf: cf, mat: mat */});
    }
  })

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
