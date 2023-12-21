var blokeSize = 25;
var rows = 30;
var cols = 40;
var context;
var board;
var nilai = 0;

var snakeX = blokeSize * 5;
var snakeY = blokeSize * 5;

var speedX = 0;
var speedY = 0;

snakeBody = [];
fx = [];
fy = [];

var foodX;
var foodY;
var nama;
var gameOver = false;
var start = false;

var intervalUpdate;
var intervalFood;
var intervalFoodMis; 

function restartVariable(){
    blokeSize = 25;
    rows = 30;
    cols = 40;
    nilai = 0;

    snakeX = blokeSize * 5;
    snakeY = blokeSize * 5;

    speedX = 0;
    speedY = 0;
}

function play(){
    nama = document.getElementById("player").value;

    if(nama.length>0){   

        restartVariable();  
        gameOver = false;

        document.getElementById('intruksi').style.display="none";
        document.getElementById('board').style.display="block";
        board = document.getElementById("board");
        board.height = rows * blokeSize;
        board.width = cols * blokeSize;
        context = board.getContext("2d");
    
        placeFood();
        document.addEventListener("keyup", changeDiraction);
        intervalUpdate = setInterval(update, 1000/10);
        intervalFood = setInterval(view_makan, 3000)
        intervalFoodMis = setInterval(hilang_makan, 5000)
    }else{
        alert("add name player, please!")
    }
}

function stop(){
    document.getElementById('intruksi').style.display="block";
    document.getElementById('board').style.display="none";
    clearInterval(intervalFood);
    clearInterval(intervalFoodMis)
    clearInterval(intervalUpdate)
}

var f = 0;
var h = 0
function view_makan(){
    if(fx.length < 5){
        context.fillStyle = "white";
        placeFood();
        fx.push(foodX)
        fy.push(foodY)
        f++;
    }
}

function hilang_makan(){
    if(fx.length > 3 ){
        context.clearRect(fx[0], fy[0], blokeSize, blokeSize);
        fx.splice(0,1)
        fy.splice(0,1)
    }
}

function update(){
    if (gameOver) {
        return;
    }

    context.fillStyle = "green";
    context.fillRect(0, 0, board.width, board.height);


    context.fillStyle = "white";
    for(i=0; i < fx.length; i++){
        if(fx[i] == snakeX && fy[i] == snakeY){
            snakeBody.push([snakeX, snakeY]);           
            fx.splice(i,1)
            fy.splice(i,1)           
            nilai++;
            document.getElementById("nilai").innerHTML = nilai
        }

        context.fillRect(fx[i], fy[i], blokeSize, blokeSize);
    }


    console.log(snakeBody.length);
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1]
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY, blokeSize, blokeSize];
    }

    context.fillStyle = "yellow";

    snakeX += speedX * blokeSize;
    snakeY += speedY * blokeSize;
    context.fillRect(snakeX, snakeY, blokeSize, blokeSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blokeSize, blokeSize); 
    }


    //Game Over
    if (snakeX < 0 || snakeX > cols * blokeSize || snakeY < 0 || snakeY > rows * blokeSize){
        gameOver = true;
        alert ("Game Over");
        stop()
    } {
        for (let i = 0; i < snakeBody.length; i++) {
            if (snakeX == snakeBody[i][0]  && snakeY == snakeBody[i][1]){
                gameOver = true;
                alert ("Game Over");
                stop()
            }
            
        }
        
    }
}

function changeDiraction(e){
    if (e.code == "ArrowUp" && speedY != 1){
        speedX = 0;
        speedY = -1;
    } else if (e.code == "ArrowDown" && speedY != -1){
        speedX = 0;
        speedY = 1;
    } else if (e.code == "ArrowLeft" && speedX != 1){
        speedX = -1;
        speedY = 0;
    } else if (e.code == "ArrowRight" && speedX != -1){
        speedX = 1;
        speedY = 0;
    }
}

function placeFood(){
    foodX = Math.floor(Math.random() * cols) * blokeSize;
    foodY = Math.floor(Math.random() * rows) * blokeSize;
}

