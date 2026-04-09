// constants and variables
let direction = {
    x:0,
    y:0
}

let score =0;
let snakeArray =[{x:13,y:15}];
let speed = 10;
let lastPaintTime = 0;

const foodSound = new Audio("./music/food.mp3");
const gameOverSound = new Audio("./music/gameover.mp3");
const moveSound = new Audio("./music/move.mp3");
const musicSound = new Audio("./music/music.mp3");
let food = {
    x:12, y:12
}
let inputDir = { x:0 , y:0};

//Game Function
function main(currTime){
    window.requestAnimationFrame(main);
    if((currTime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = currTime;
    gameEngine();
}
function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArray.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    //part-1 updating the snake array
    if(isCollide(snakeArray)){
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArray = [{x: 13, y: 15}];
        musicSound.play();
        score = 0; 
    }

    //If You have eaten the Food , Increment score and regenerate food

    if(snakeArray[0].y === food.y && snakeArray[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score>highscorevalue){
            highscorevalue = score;
            
            localStorage.setItem("highscore",JSON.stringify(highscorevalue));
            highscoreBox.innerHTML = "HighScore: " + highscorevalue;
        }
        scoreBox.innerHTML = "Score: "+ score;
        snakeArray.unshift({x: snakeArray[0].x + inputDir.x ,y: snakeArray[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}  // Random Number generate karne ke liye
    }

    // Move the Snake
    for(let i= snakeArray.length-2 ;i>=0; i--){
        
        snakeArray[i+1] = {...snakeArray[i]};
    }
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;

    // part-2 Display the Snake
    board.innerHTML = "";
    snakeArray.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}


// Main Logic {Game Loop}

// for high score
let highscore = localStorage.getItem('highscore')
if(highscore === null){
    highscorevalue = 0;
    localStorage.setItem("highscore", JSON.stringify(highscorevalue))
}
else{
    highscorevalue = JSON.parse(highscore);
    highscoreBox.innerHTML = "HighScore: " + highscore;
}

window.requestAnimationFrame(main);  // Set Interval bhi use kar sakte but go we animation frame
window.addEventListener('keydown',e=>{
    inputDir ={x:0,y:1}  // starts the game 
    moveSound.play();
    musicSound.play();
    switch(e.key) {
        case "ArrowUp" :
            inputDir.x = 0;
            inputDir.y = -1;
        break;
        case "ArrowDown" :
            inputDir.x = 0;
            inputDir.y = 1;
        break;
        case "ArrowLeft" :
            inputDir.x = -1;
            inputDir.y = 0;
        break;
        case "ArrowRight" :
            inputDir.x = 1;
            inputDir.y = 0;
        break;
    }
});
