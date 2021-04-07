var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keypress(function () {
    if (!started) {
        started = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    // Generate randomNumber to pick colours
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Button animation
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    // Play sound
    playSound(randomChosenColour);
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }

    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor) {
    var activeButton = $("#" + currentColor);
    activeButton.addClass("pressed");
    setTimeout(function () {
        activeButton.removeClass("pressed");
    }, 100);
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}