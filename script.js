var colors = generateColorArray(6);
var squares = document.getElementsByClassName("square");
var pickedColor = pickColor();
var header = document.querySelector("h1");
var colorToPick = document.querySelector("#colorToPick");
var message = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var buttons = document.getElementsByTagName("button");
var gameOver = false;
var easyMode = false;
var numSquares = 6;


addHoverStyles(buttons);

hardButton.classList.toggle("selected");

hardButton.addEventListener("click", function() {
    easyButton.classList.remove("selected");
    hardButton.classList.add("selected");
    resetButton.textContent = "New Colors";
    header.style.backgroundColor = "steelblue";
    hardButton.style.backgroundColor = "steelblue";
    gameOver = false;
    updateSelected();
    console.log(document.getElementsByClassName("selected"));
    easyMode = false;
    message.textContent = "Click a Color to play!";
    numSquares = 6;
    colors = generateColorArray(numSquares);
    pickedColor = pickColor();
    colorToPick.textContent = pickedColor.toUpperCase();
    for (var i = 0; i < squares.length; i++) {
      squares[i].style.backgroundColor = colors[i];
      squares[i].style.display = "block";
    }

})

easyButton.addEventListener("click", function() {
    easyButton.classList.add("selected");
    hardButton.classList.remove("selected");
    resetButton.textContent = "New Colors";
    message.textContent = "Click a Color to play!";
    header.style.backgroundColor = "steelblue";
    easyButton.style.backgroundColor = "steelblue";
    gameOver = false;
    updateSelected();
    console.log(document.getElementsByClassName("selected"));
    easyMode = true;
    numSquares = 3;
    colors = generateColorArray(numSquares);
    pickedColor = pickColor();
    colorToPick.textContent = pickedColor.toUpperCase();
    for (var i = 0; i < squares.length; i++) {
      if(colors[i]){
        squares[i].style.backgroundColor = colors[i];
      }
      else{
        squares[i].style.display = "none";
      }
    }
})

colorToPick.innerHTML = pickedColor.toUpperCase();

resetButton.addEventListener("click", function() {
  resetButton.textContent = "New Colors";
  colors = generateColorArray(numSquares);
  pickedColor = pickColor();
  message.textContent = "Click a Color to play!";
  gameOver = false;
  colorToPick.innerHTML = pickedColor.toUpperCase();
  header.style.backgroundColor = "steelblue";
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
  }
  updateSelected();

})


for (var i = 0; i < squares.length; i++) {
  squares[i].style.backgroundColor = colors[i];
  squares[i].addEventListener("click", function() {
    if(this.style.backgroundColor == pickedColor){
      message.innerHTML = "Correct!"
      gameOver = true;
      changeColor(pickedColor);
      header.style.backgroundColor = pickedColor;
      resetButton.textContent = "Play Again?";
      updateSelected();
    }
    else{
      updateSelected();
      this.style.background = "#232323";
      message.innerHTML = "Sorry, try again."
    }
  })
}


function changeColor(color){
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}


function pickColor(){
  var rand = Math.floor(Math.random() * colors.length);
  return colors[rand];
}


function generateColorArray(size) {
  var colorArray = []
  for (var i = 0; i < size; i++) {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    colorArray[i] = "rgb(" + red + ", " + green + ", " + blue + ")"
  }
  return colorArray;
}

function updateSelected(){
  var selected = document.querySelector(".selected");
  for (var i = 1; i < buttons.length; i++) {
    if(buttons[i].classList.contains("selected") != true){
      buttons[i].style.backgroundColor = "white";
      if(gameOver == true){
        buttons[i].style.color = pickedColor;
      }
      else{
        buttons[i].style.color = "steelblue";
      }
    }
    else {
      if(gameOver == true){
        buttons[i].style.backgroundColor = pickedColor;
        buttons[i].style.color = "white";
      }
    }
  }
}

function addHoverStyles(buttonArray) {
  for (var i = 0; i < buttonArray.length; i++) {
    buttonArray[i].addEventListener("mouseover", function(){
      this.style.color = "white";
      console.log("Mouse Over");
        if(gameOver == true){
          this.style.backgroundColor = pickedColor;
        }
        else {
          this.style.backgroundColor = "steelblue";
        }
      })
      buttonArray[i].addEventListener("mouseleave", function(){
        if(this.classList.contains("selected") != true)
        {
          this.style.color = "steelblue";
          this.style.backgroundColor = "white"
          console.log("mouse left");
          if(gameOver == true){
            this.style.color = pickedColor;
          }
          else{
            this.style.color = "steelblue";
          }
        }
      })
  }
}
