var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var userClickedPattern=[];
var level=0;
var started=false;
var index=0;
$(document).keydown(function(){
  if(! started)
  {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){


       var userChosenColour=$(this).attr("id");



       if(started)
     {
          playSound(userChosenColour);
        animatePress(userChosenColour);
         userClickedPattern.push(userChosenColour);

       checkAnswer(userClickedPattern.length-1);
     }
});
function checkAnswer(currentLevel)
{
     if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
     {


          if(currentLevel===gamePattern.length-1)
          {
            setTimeout(function(){
              nextSequence();
              userClickedPattern=[];
            },800);

          }
      }
     else
     {
       var audio=new Audio("wrong.mp3");
           audio.play();
           $("body").addClass("game-over");
           setTimeout(function()
           {
                $("body").removeClass("game-over");
           },200);

         userClickedPattern=[];
              $("#level-title").text("Game Over,Press Any Key to Restart");
             startOver();
     }


}
function startOver()
{
  level=0;
  started=false;
  gamePattern=[];
}
function animatePress(currentColour)
{
$("#"+currentColour).addClass("pressed");
setTimeout(function(){
  $("#"+currentColour).removeClass("pressed");
},100);

}
function playSound(name)
{
  var audio=new Audio(name+".mp3");
             audio.play();
}
function nextSequence()
{
   level=level+1;
    $("#level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
var randomChosenColour=buttonColours[randomNumber];


  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
       gamePattern.push(randomChosenColour);

}
