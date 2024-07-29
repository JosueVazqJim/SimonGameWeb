let buttonColors = ["red", "blue", "green", "yellow"]; //array of colors

let gamePattern = []; //array to store the game pattern

let userClickedPattern = []; //array to store the user pattern

let started = false; //variable to check if the game has started

let level = 0; //variable to store the level

function nextSequence() {
    level++; //increments the level
    $("#level-title").text("Level " + level); //changes the title to the current level

    let randomNumber = Math.floor(Math.random() * 4); //generates a random number between 0 and 3

    let randomChosenColour = buttonColors[randomNumber]; //stores the color of the buttonColors array at the random number index
    gamePattern.push(randomChosenColour); //adds the color to the gamePattern array
    console.log(randomChosenColour); //logs the color to the console
    console.log(gamePattern); //logs the game pattern to the console

    let audio = new Audio(playSound(randomChosenColour)); //plays the sound of the random color
    audio.play();
    console.log(audio);
    $("#" + randomChosenColour)
        .fadeOut(100)
        .fadeIn(100); //flashes the button with the random color
}

function playSound(name) {
    switch (name) {
        case "blue":
            return "./sounds/blue.mp3";
        case "green":
            return "./sounds/green.mp3";
        case "red":
            return "./sounds/red.mp3";
        case "yellow":
            return "./sounds/yellow.mp3";
        default:
            console.log("Opción no reconocida");
            break;
    }
}

function buttonPressed() {
    $(".btn").click(function () {
        let userChosenColour = this.id;
        userClickedPattern.push(userChosenColour); //adds the color to the userClickedPattern array
        console.log(userClickedPattern); //logs the user pattern to the console
        let audio = new Audio(playSound(userChosenColour)); //plays the sound of the random color
        audio.play();
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1); //checks the last answer each time a button is pressed
    });
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        //setTimeout means that the function will be executed after a certain amount of time
        $("#" + currentColor).removeClass("pressed");
    }, 150); //animates the button when pressed
}

function startGame() {
    $(document).keypress(function (event) {
        // Verifica si el juego no ha comenzado y la tecla presionada es "a"
        if (!started && event.key === "a") {
            nextSequence(); // Llama a la función para comenzar la secuencia del juego
            started = true; // Marca que el juego ha comenzado
        }
    });
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        //checks if the user last answer is the same as the game pattern
        console.log("success");
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000); //if the user pattern is the same as the game pattern, the next sequence is called after 1000ms
            userClickedPattern = []; //resets the user pattern after each level
        }
    } else {
        console.log("wrong");
        $("h1").text("Game Over, Press A Key to Restart");
        $("body").addClass("game-over ");
        setTimeout(function () {
            $("body").removeClass("game-over ");
        }, 200);
        let audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
}

startGame();

buttonPressed();
