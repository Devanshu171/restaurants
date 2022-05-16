const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "..", "data", "restaurants.json");
function getStoredRestaruents() {
  // getting absolute using 'path' file path

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  // reading file and transforming it into raw  js code
  // so that we can add new data
  return storedRestaurants;
}

function storeRestaruents(restaurants) {
  fs.writeFileSync(filePath, JSON.stringify(restaurants));
}

module.exports = {
  getStoredRestaruents: getStoredRestaruents,
  storeRestaruents: storeRestaruents,
};
// exporting function to another files
