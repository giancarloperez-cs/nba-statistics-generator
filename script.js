// these variables are the main statistics that people use for sports betting
// and the statistics that are included in our dataset, except for player
// it is similar to the weather maker app in the sense that the player name acts
// as the city, and the statistics that come up are the informational chunks that
// tell you what the weather will be, or in this case what the player averages
// in each statistic
var playerName = getColumn("NBA Statistics", "Player");
var fieldGoalsMade = getColumn("NBA Statistics","FG");
var threePointersMade = getColumn("NBA Statistics","3P");
var freeThrowsMade = getColumn("NBA Statistics","FT");
var reboundsMade = getColumn("NBA Statistics","TRB");
var assistsMade = getColumn("NBA Statistics","AST");
var pointsMade = getColumn("NBA Statistics","PTS");
var datePlayed = getColumn("NBA Statistics","Data");

//filtered lists - utilizes all previous variables
var filteredplayerNameList = [];
var filteredfieldGoalsMadeList = [];
var filteredthreePointersMadeList = [];
var filteredfreeThrowsMadeList = [];
var filteredreboundsmadeList = [];
var filteredassistsMadeList = [];
var filteredpointsMadeList = [];
var filtereddatePlayedList = [];
var favoritePlayers = [];



//for loop that filters all of the variables listed
//previously, ensures that the statistics align with
//what player has been randomly selected or typed out
//by the applications user
for (var i = 0; i < playerName.length; i++) {
 appendItem(filteredplayerNameList,playerName[i] );
 appendItem(filteredfieldGoalsMadeList, fieldGoalsMade[i]);
 appendItem(filteredthreePointersMadeList, threePointersMade[i]);
 appendItem(filteredfreeThrowsMadeList, freeThrowsMade[i]);
 appendItem(filteredreboundsmadeList, reboundsMade[i]);
 appendItem(filteredassistsMadeList, assistsMade[i]);
 appendItem(filteredpointsMadeList, pointsMade[i]);
 appendItem(filtereddatePlayedList, datePlayed[i]);
}
onEvent("playerStatsFav", "click", function( ) {
  setScreen("playerStats");
});

onEvent("homeButtonFav", "click", function( ) {
  setScreen("homeScreen");
});

onEvent("appInfoButton", "click", function( ) {
  setScreen("infoScreen");
});

onEvent("exitButton", "click", function( ) {
  setScreen("homeScreen");
});

onEvent("homeScreenInfo", "click", function( ) {
  setScreen("homeScreen");
});

onEvent("statsScreenInfo", "click", function( ) {
  setScreen("playerStats");
});

onEvent("findButton", "click", function( ) {
  desiredPlayer();
});
//player stats screen swap

onEvent("seePlayerStatsButton", "click", function( ) {
  setScreen("playerStats");
});

onEvent("statsButton", "click", function( ) {
  showStats();
});

onEvent("addToFavoritesButton", "click", function() {
  var player = getText("playerNameOutput");
  appendItem(favoritePlayers, player);
  
});

onEvent("seeFavoritesButton", "click", function() {
  setScreen("favoritesScreen");
  updateFavoritesList();
});

function showStats() {
  var index = randomNumber(0, filteredplayerNameList.length - 1);
  setText("totalPointsOutput", filteredpointsMadeList[index]);
  setText("totalReboundsOutput", filteredreboundsmadeList[index]);
  setText("fieldGoalsOutput", filteredfieldGoalsMadeList[index]);
  setText("3pointOutput", filteredthreePointersMadeList[index]);
  setText("assistsOutput", filteredassistsMadeList[index]);
  setText("freeThrowsOutput", filteredfreeThrowsMadeList[index]);
  setText("playerNameOutput", filteredplayerNameList[index]);
  setText("dateOutput", filtereddatePlayedList[index]);
}
function desiredPlayer() {
    var indices = [];
    for (var i = 0; i < playerName.length; i++) {
        indices.push(i);
        // this "indices.push(i) pushes the index to the back
    }

    //this was a code segment that I found through research online,called the 
    // "Fisher Yates" shuffle, which allows for true randomness when it comes
    //to selecting the date of when the game was played by the player the user
    //is searching for. I had to research this method because initially, my 
    //for loop that was used to find the player that the user was searching 
    //for only worked for finding the game that the player had most recently
    //played in through this dataset, mainly being games that were from early
    //december. I used the "fisher yates shuffle" method in order to ensure 
    //that the user would be shown variations in games that were played
    for (var j = indices.length - 1; j > 0; j--) {
        var randIndex = randomNumber(0, j);
        var temp = indices[j];
        indices[j] = indices[randIndex];
        indices[randIndex] = temp;
    }

    // Iterate through shuffled indices
    for (var k = 0; k < indices.length; k++) {
        var index = indices[k];
         // Get the randomized index
        if (getText("playerNameInput") == playerName[index]) {
            setText("totalPointsOutput", filteredpointsMadeList[index]);
            setText("totalReboundsOutput", filteredreboundsmadeList[index]);
            setText("fieldGoalsOutput", filteredfieldGoalsMadeList[index]);
            setText("3pointOutput", filteredthreePointersMadeList[index]);
            setText("assistsOutput", filteredassistsMadeList[index]);
            setText("freeThrowsOutput", filteredfreeThrowsMadeList[index]);
            setText("playerNameOutput", filteredplayerNameList[index]);
            setText("dateOutput", filtereddatePlayedList[index]);
            break; 
        }
    }
}

// Function to update the favorites list display
function updateFavoritesList() {
  setText("favoritesListOutput", favoritePlayers.join("\n"));
}

