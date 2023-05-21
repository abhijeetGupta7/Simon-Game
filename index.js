var buttonColours=["red","green","blue","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var level=0;
var started=false;

$(document).keypress(function() {
    if(!started) {
    $("h1").text("Level "+level);
    nextSequence();
    started=true;    
    }
});


$(".btn").click(function() {
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
 });


 function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
    console.log("success");
  
if(userClickedPattern.length===gamePattern.length) {
    setTimeout(function() {
      nextSequence(); }
      ,1000
    );
  }
}

  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
    $("body").removeClass("game-over");
    },200 );
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
}
}

function nextSequence() {
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);
  
  var num=Math.random();
  randomNumber=Math.floor(num*4);
  var randomChosenColor=buttonColours[randomNumber]; 
  gamePattern.push(randomChosenColor);

  $("#" +randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
    
}

function startOver() {
  started=false;
  level=0;
  gamePattern=[];
}



function playSound(name) {
    var audio=new Audio("sounds\\"+name+".mp3");
    audio.play();
};

function animatePress(currentColor) {
    $("."+currentColor).addClass("pressed");
    setTimeout(function() {
    $("."+currentColor).removeClass("pressed")},80    
    );
}


