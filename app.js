
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

const highscore = $("#highscore");
let highscoreNo = localStorage.getItem("highscore");

highscore.text(highscoreNo);

let close;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// $(document).click(()=>{
//   if (!started) {
//     $("#level-title").text("Level " + level);
//     nextSequence();
//     started = true;
//   }
// })

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
  console.log(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      if (highscoreNo < level) {
        localStorage.setItem("highscore", level);
        highscoreNo = localStorage.getItem("highscore");
        highscore.text(highscoreNo)
      }
      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
 
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


// FOR HOW TO PLAY
var number;
$(".nxt-btn").on("click", ()=>{
  var number = $(".hint-count").text();
  
  if (number < 5) {
    $(".hint-" + number).addClass("hidden");
    number++;
    $(".hint-"+number).removeClass("hidden");
    $(".hint-count").text(number);
  
    if (number > 1) {
      $(".bck-btn").removeClass("hidden");
    } 

    if (number == 5){
      $(".nxt-btn").addClass("hidden");
      $(".ply-btn").removeClass("hidden");
      $(".cls-btn").addClass("hidden");
    }
  }
  // console.log(number);

});

var bckNumber;
$(".bck-btn").click(()=>{
  $(".nxt-btn").removeClass("hidden");
  $(".ply-btn").addClass("hidden");
  $(".cls-btn").removeClass("hidden");
  var bckNumber = $(".hint-count").text();
  console.log(bckNumber);

  $(".hint-" + bckNumber).addClass("hidden");
  bckNumber--;
  $(".hint-" + bckNumber).removeClass("hidden");
  $(".hint-count").text(bckNumber);

  console.log(bckNumber);
  if (bckNumber < 2) {
    $(".bck-btn").addClass("hidden");
  }
})

function closePlay(){
  $(".hint-count").text(1);
  $(".hint-1").removeClass("hidden");
  $(".bck-btn").addClass("hidden");

  for (let i = 2; i < 6; i++) {
    $(".hint-" + i).addClass("hidden");
  }

  $(".how-to-play").addClass("hidden");
  $(".overlay").css("display", "none");

  let close = true;
  
}

$(".cls-btn").click(closePlay);
$(".ply-btn").click(closePlay);


window.addEventListener('click', ()=>{
  if(close === true){
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  }
})


