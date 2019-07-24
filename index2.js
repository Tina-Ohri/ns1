// imports
// var http = require("http");
var fs = require("fs");
var url = require("url");
const express=require("express");

// 
var replace = require("./templates/replace.js");
// json file
var obj = fs.readFileSync("./dev-data/dev-data/data.json");
var jsonObj = JSON.parse(obj);

// templates
var app=express();
var templateProduct = fs.readFileSync("./templates/template-product.html").toString();
var templateCards = fs.readFileSync("./templates/template-card.html").toString();
var templateOverview = fs.readFileSync("./templates/template-overview.html").toString();
var MakeCard = function (templateCards, json) {
  return replace(templateCards, json);
};
// var upath;
app.get("/product*",function (req, res) {
  // console.log(req.url);
  // requested path
//   var path = req.url;

  // console.log(url.parse(path,true));

//   var id = url.parse(path, true).query.id;
//   console.log(id);
//   var path = url.parse(path, true).pathname;
var id=req.query.id;
  // console.log( path);
//   if (path == "/product") {

    var ProductHtml = replace(templateProduct, jsonObj[id]);
    // res.status(200).json({ProductHtml});
    res.end(ProductHtml);
    // res.end("products page");
//   }
});
app.get("/overview",function (req, res) {
    // if("*"==="/overview"){

        var cards = "";
        for (let i = 0; i < jsonObj.length; i++) {
          cards += MakeCard(templateCards, jsonObj[i]);
        }
        // overview product card =>cards
        let OverviewHTML = templateOverview.replace("{%PRODUCT_CARDS%}", cards);
    
        res.end(OverviewHTML);
    // }
  });
//   var abc;
  app.get("/",function (req, res) {
    // if(abc==="/"){
        var cards = "";
        for (let i = 0; i < jsonObj.length; i++) {
          cards += MakeCard(templateCards, jsonObj[i]);
        }
        // overview product card =>cards
        let OverviewHTML = templateOverview.replace("{%PRODUCT_CARDS%}", cards);
    
        res.end(OverviewHTML);
    // }
    
  });
  app.get("/api",function (req, res) {
    
    
        
            // res.write(obj);
            res.end(obj);
  });

  app.listen(3000);
  
//   else if (path == "/" || path == "/overview") {
//     res.status(200).json({
//       "Content-type": "text/html"
//     });
//     // var cardArr=jsonObj.map(function(el){
//     //   return MakeCard(templateCards,el);
//     // })
//     var cards = "";
//     for (let i = 0; i < jsonObj.length; i++) {
//       cards += MakeCard(templateCards, jsonObj[i]);
//     }
//     // overview product card =>cards
//     let OverviewHTML = templateOverview.replace("{%PRODUCT_CARDS%}", cards);

//     res.end(OverviewHTML);
//     // res.end("Home page");
//   } else if (path == "/api") {
//     res.writeHead(200, {
//       "content-type": "application/json"
//     });
//     res.write(obj);
//     res.end();
//   } else {
//     res.writeHead(404);
//     res.end("Error 404 Page not found");
//   }
// });
var port = process.env.PORT || 5000;
app.listen(port);
console.log("Server is listening at port " + port);