var wrapper = document.querySelector("#wrapper");
var highScoreList = document.querySelector("#highscores");
var clearBtn = document.querySelector("#clear");

var allScores = [];
init();


function init() {
    var scoreObject = JSON.parse(localStorage.getItem("allScores"));
    console.log(scoreObject);

    scoreObject = scoreObject.sort((a, b) => {
        if (a.score > b.score) {
        return-1;
        }   
    })

    if (scoreObject !== null) {
        allScores = scoreObject;
    }
    renderhighScore();
}

function renderhighScore() {

    highScoreList.textContent = "";

    for (var i = 0; i < allScores.length; i++) {

        var highScore = allScores[i];
        var liEL = document.createElement("li");
        liEL.textContent = 'Name: ' + highScore.initials + ' - Score : ' + highScore.score;
        highScoreList.appendChild(liEL);
    }
}

clearBtn.addEventListener('click', function() {

    clearMemory()

})

function clearMemory() {

    localStorage.clear();
    
    location.reload();

// Use this if we want to go back to the start instead of refreshing the page 
    // location.replace("./index.html")

}




