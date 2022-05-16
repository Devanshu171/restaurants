const express = require("express");
const router = express.Router();
// to group and split rotes to reduce code line
router.get("/index", function (req, res) {
  res.render("index");
  // as we added ejs engine
  //  .render() will use ejs engine to parse that tamplate file and send as response
  // we pass file name
});
router.get("/about", function (req, res) {
  res.render("about");
});

module.exports = router;
