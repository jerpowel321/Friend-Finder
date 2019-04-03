// ===============================================================================
// LOAD DATA
// Linking routes to a series of "data" sources.
// These data sources hold arrays of information on vacation destinations
// ===============================================================================

var locationData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function (req, res) {
    res.json(locationData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array

app.post("/api/friends", function (req, res) {
  var bestMatch = {
    location: "",
    photo: "",
    locationDifference: 1000
  }
  var userInput = req.body;
  var userScores = userInput.scores;
  var totalDifference;
  alert("HELLO");
  console.log("TT"+ userInput); 

  for (var i = 0; i < locationData.length; i++) {
    var currentLocation = locationData[i]
    totalDifference = 0
    console.log(currentLocation.location)
    for (var j = 0; j < currentLocation.scores.length; j++) {
      var currentLocationScore = currentLocation.scores[j]
      var currentUserScore = userScores[j]
      totalDifference += Math.abs(parseInt(currentLocationScore) - parseInt(currentUserScore))
    }
    if (totalDifference <= bestMatch.locationDifference) {
      bestMatch.location = currentLocation.location
      bestMatch.photo = currentLocation.photo
      bestMatch.locationDifference = totalDifference
    }
  }
  res.json(bestMatch)
  
});
};