
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var gameOver = new Audio ("sounds/wrong.mp3");

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

var playSound = name =>{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

var animatePress = currentColor =>{
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

var nextSecuence = () =>{
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4) ;
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  level++
  $("#level-title").text("Level " + level);


  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

var checkAnswer = currentLevel =>{
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSecuence();
      }, 1000);
    }
  }else{
    $("h1").text("Game Over, Press Any Key to Restart");
    gameOver.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
    console.log("wrong");
  }
}

var startOver = () =>{
  started = false;
  level = 0;
  gamePattern = [];

}

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSecuence();
    started = true;
  }
});
