/*
  - Defining path (routs) of different pages and linking them
  -  Getting data from form 
  - dynamic  genrating html content
  -dynamic routes

*/

const path = require("path");
// path package for absolute path
const express = require("express");
// express

const defaultRoutes = require("./routes/default");
// importing default routes from 'default'
const restaurantsRoutes = require("./routes/restaurants");
// importing default routes from 'default'
const app = express();
// calling express as it a function

app.set("views", path.join(__dirname, "views"));
// setting views setting i.e where to find tamplate files

app.set("view engine", "ejs");
// setting a tamplating engine 'ejs'
// that helps us genrate dynamic html
// CHANGE HTML FILE FORMAT TO 'ejs'
// i.e index.ejs

app.use(express.static("public"));
// if user tryes to access page through diff paths
//  it sends file if that path file is present in public folder
// need to change in html path --> /route what you have defined

app.use(express.urlencoded({ extended: false }));
// checking data from page

app.use("/", defaultRoutes);
// will look for the routes requested starting with'/'
//in the defaultRoutes that we impotred if not found
// will look in app.js down

app.use("/", restaurantsRoutes);
/*
    sending html file as response
app.get("/index", function (req, res) {

   const htmlFilePath = path.join(__dirname,  "views", "index.html");
   res.sendFile(htmlFilePath);

  // sending html files as erlier we were typing html code as string

});

*/

app.use(function (req, res) {
  res.status(404).render("404");
});

// backend error handling
app.use(function (error, req, res, next) {
  res.status(500).render("500");
});
app.listen(3000);
