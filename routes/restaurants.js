const express = require("express");
const resData = require("../util/restaurant-data");
const uuid = require("uuid");
// importing custom file
const router = express.Router();
router.get("/restaurants", function (req, res) {
  const restaurants = resData.getStoredRestaruents();
  let order = req.query.order;
  let nextOrder = "desc";
  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }
  if (order === "desc") {
    nextOrder = "asc";
  }
  restaurants.sort(function (resA, resB) {
    if (
      (order === "asc" && resA.name > resB.name) ||
      (order === "desc" && resB.name > resA.name)
    ) {
      return 1;
    }

    return -1;
  });
  // console.log("restaurants");
  res.render("restaurants", {
    numberOfRestaurants: restaurants.length,
    restaurants: restaurants,
    nextOrder: nextOrder,
  });
});

// dynamic routes
router.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;

  const restaurants = resData.getStoredRestaruents();

  for (const restaurant of restaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurant-detail", {
        restaurant: restaurant,
      });
    }
  }
  res.status(404).render("404");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

// getting from input path of form is at /recommend
router.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  // assigning unique id to the data
  // getting the whole input object
  const restaurants = resData.getStoredRestaruents();
  // reading file and transforming it into raw  js code
  // so that we can add new data
  console.log(restaurants);
  restaurants.push(restaurant);
  // pushing data got from form

  resData.storeRestaruents(restaurants);
  // writing data back to file by passing filePath and data file transformed back to json

  res.redirect("/confirm");
  // after submitting from sending user to diff  page 'redirecting'
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
