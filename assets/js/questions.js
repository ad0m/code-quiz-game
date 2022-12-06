// VARIABLES 
var currentTime = document.querySelector("#time");
var startTimer = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen")
var questionsDiv = document.querySelector("#questions");
var questionsH2 = document.querySelector("#question-title");
var wrapper = document.querySelector("#wrapper");
var choices = document.querySelector("#choices");


// Declared variables
var score = 0;
var questionIndex = 0;
// Seconds left 
var secondsLeft = 50;
// Holds interval time
var holdInterval = 0;
// Holds penalty time
var penalty = 10;
// Creates new element
var olCreate = document.createElement("ol");
// var liCreate = document.createElement("li");


var questions = [
    {
        title: "One + Two",
        choices: ["Five", "Four", "Three", "Two"],
        answer: "Three"
    },
    {
        title: "One + One",
        choices: ["Five", "Four", "Three", "Two"],
        answer: "Two"
    },
    {
        title: "Two + Two",
        choices: ["Five", "Four", "Three", "Two"],
        answer: "Four"
    },
    {
        title: "Three + Two",
        choices: ["Five", "Four", "Three", "Two"],
        answer: "Five"
    },
    {
        title: "Five + Five",
        choices: ["Ten", "Four", "Three", "Two"],
        answer: "alerts"
    },

];

//Start the game on clicking 'start' 

startTimer.addEventListener("click", function () {
    startGame();


});


function startGame() {
    startScreen.className = "hide" // Hide Rules 
    questionsDiv.className = "start"; // Show Quiz Questions Page

    var guessCorrect = document.createElement("div");
    guessCorrect.setAttribute("id", "guessCorrect");
    guessCorrect.setAttribute("style", "padding-top: 20px; font-size: 1.5em; color: grey");

    guessCorrect.textContent = "";
    questionsDiv.appendChild(guessCorrect);

// starts the time 
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
}



// Renders questions and choices to page: 
function render(questionIndex) {
    // Clears existing data 
    questionsH2.textContent = "";
    olCreate.textContent = "";
    // For loops to loop through all info in array
    for (var i = 0; i < questions.length; i++) {
        // Appends question title of the question to the H2 Tag in the HTML
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsH2.textContent = userQuestion;

    // Working with different code to try get it to work (commenting out for refrence)

        // for(var j = 0; j <userChoices.length; j++) {
        //     console.log(userChoices);
        //     var liEl = document.createElement("li");
        //     liEl.setAttribute('style', 'list-style: none');
        //     var button = document.createElement("button")
        //     button.textContent = userChoices[j];
        //     choices.appendChild(olCreate);
        //     olCreate.appendChild(liEl);
        //     liEl.appendChild(button);
        //     button.addEventListener("click", (compare));
        // }

    // Working with different code to try get it to work (commenting out for refrence)

        // userChoices.forEach(function (newItem) {
        //     var liEl = document.createElement("li");
        //     liEl.setAttribute('style', 'list-style: none');
        //     var button = document.createElement("button");
        //     button.textContent = newItem;
        //     choices.appendChild(olCreate);
        //     olCreate.appendChild(liEl);
        //     liEl.appendChild(button);
        //     button.addEventListener("click", (compare));
    
        // })

//appending a button to the li with the choices and adding an event listener onto the button which passes the event into the compare() funcrtion
        }
        for (const [key, value] of Object.entries(userChoices)) {
            var liEl = document.createElement("li");
            liEl.setAttribute('style', 'list-style: none');
            var button = document.createElement("button")
            button.textContent = `${value}`;
            choices.appendChild(olCreate);
            olCreate.appendChild(liEl);
            liEl.appendChild(button);
            button.addEventListener("click", (compare));
        }

    }


    // Working with different code to try get it to work (commenting out for refrence)

    // userChoices.forEach(function (newItem) {
    //     var liEl = document.createElement("li");
    //     liEl.setAttribute('style', 'list-style: none');
    //     var button = document.createElement("button")
    //     button.textContent = newItem;
    //     choices.appendChild(olCreate);
    //     olCreate.appendChild(liEl);
    //     liEl.appendChild(button);
    //     button.addEventListener("click", (compare));

    // })
// }





function compare(event) {
    var element = event.target;
    var theScore = document.getElementById('guessCorrect')

    if (element.matches("button")) {
        

        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {

            score++;
            theScore.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            // Correct condition 
        } else {
            // Will deduct -10 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            theScore.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // Question Index determines number question user is on
    questionIndex++;
        

    if (questionIndex >= questions.length) {
        // All done will append last page with user scores
        allDone();
        
        theScore.textContent = "\r\n";
        theScore.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(theScore);

}

function allDone() {
    questionsDiv.textContent = "";
    currentTime.textContent = "End of game";

    // Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value.trim();

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            location.replace("./HighScores.html");
        }
    });

}


