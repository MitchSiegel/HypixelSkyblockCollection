const express = require("express");
const fs = require("fs");
const jf = require("jsonfile")
const app = express();
var sslRedirect = require('strong-ssl-redirect');
/* I know this isn't how you are supposed to do it, but eslint was bugging me */
var process = {
  env:{
    PORT:"8080"
  }
}
const port = process.env.PORT || 8080;
var environment  = 'production'  /* 'other' 'development', 'productionproduction'*/
app.use(sslRedirect({
    environment,
    www: false,
    status: 301
}));
 
app.set('view engine', 'ejs');


app.get("/", function(req, res) {
  render("index", res);
});
app.get("/item", function(req, res) {
  render("item", res);
});
app.get('/items/:type/:item/:tier', (req, res) => {
  jf.readFile("items.json",function (err, obj2) {
    if (err) console.error(err)
    if(!obj2[req.params.type][req.params.item][req.params.tier]){
      res.redirect(`/`)
    }else{
    var number = req.params.tier;
    var obj = obj2[req.params.type];
    var itemObj = obj[req.params.item];
    var tierObj = itemObj[number];
    var baseURL = `/items/${req.params.type}/${req.params.item}`
    var unlockURL = tierObj.image;
    var rare = tierObj.rarity;
    var desk = tierObj.description;
    var tierNumber = itemObj.tiers || "9";
    var icon = itemObj.icon;
    var title = itemObj.title;
    var itemUrl = itemObj.image;
    var required = tierObj.required;
    /*
    var cf = tierObj.matrix;
    console.log(cf)
    var mat = tierObj.mat;
    */
    var unlockName = tierObj.unlocks;
    var type = itemObj.type;
    res.render('item-template', {itemName: title, type: type, tNumber: number, itemUrl : itemUrl, unlockURL: unlockURL, baseURL : baseURL, unlockName: unlockName, icon: icon, rare: rare, desk: desk, required: required, tierNumber: tierNumber/*, cf: cf, mat: mat */});
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
