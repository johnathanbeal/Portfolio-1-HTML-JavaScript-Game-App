
var gameOn;
var canvas;
var canvasContext;
var pills = [];
var pillColors = ['purple', 'yellow', 'black'];
var randomPillColor1;
var randomPillColor2;
var leftPillColor;
var rightPillColor;

var leftPillXAxis;
var leftPillYAxis;
var rightPillXAxis;
var rightPillYAxis;

var pill;
var pillCount;
var sizeX;
var sizeY;
var myVar;
var fallSpeed = 3;
var moveLeftOrRightSpeed = 30;
var framePerSecond = 100;
var second 
var position = 1;

var pillAColors = [];
var pillsAX = [];
var pillsAY = [];
var pillBColors = [];
var pillsBX = [];
var pillsBY = [];

let floor = [
        [0, 0, 30],
        [1, 30, 30],
        [2, 60, 30],
        [3, 90, 30],
        [4, 120, 30],
        [5, 150, 30],
        [6, 180, 30],
        [7, 210, 30],
        [8, 240, 30],
        [9, 270, 30],
        [10, 300, 30],
        [11, 330, 30],
        [12, 360, 30],
        [13, 390, 30]
];

window.onload = function() {
        console.log("Start Program");
        canvas = document.getElementById('gameCanvas');
        canvasContext = canvas.getContext('2d');
        
        startPositions();
        setSize();
        createPill();
        pillCount = 0;
        
        myVar = setInterval(newPill, 10);            
}

function startPositions(){
    originalPositionX = canvas.width/2;
    originalPositionY = 0;
}

function setSize(){
    sizeX = 30;
    sizeY = 30;
}

function setAxis(){
        leftPillXAxis = originalPositionX - sizeX;
        leftPillYAxis = originalPositionY;
        rightPillXAxis = originalPositionX;
        rightPillYAxis = originalPositionY;
}

function createPill(){
        setAxis();
        randomPillColor1 = pillColors[Math.floor(Math.random() * pillColors.length)];
        randomPillColor2 = pillColors[Math.floor(Math.random() * pillColors.length)];
        SetPillColor(randomPillColor1, randomPillColor2);   
}

function dropDown(){
    fallSpeed = 10;
    rightPillYAxis = canvas.height - 40;
    leftPillYAxis = canvas.height - 40;
    fallSpeed = 0;
}

function pillReset(){
        startPositions();
        setAxis();
        var newRandomPillColor1 = pillColors[Math.floor(Math.random() * pillColors.length)];
        var newRandomPillColor2 = pillColors[Math.floor(Math.random() * pillColors.length)];        
        SetPillColor(newRandomPillColor1, newRandomPillColor2);
}

var pillAColors = [];
var pillsAX = [];
var pillsAY = [];
var pillBColors = [];
var pillsBX = [];
var pillsBY = [];

var stop;

function endGame(){

    for (var i = 0; i < pillsAY.length; i++)
    {
        if(pillsAY[i] <= 0 && pillsAY[i] <= 30 || pillsBY[i] <= 0 && pillsBY[i] <= 30);
        {
            //clearInterval(myVar);
        }
    }
    
}

function moveDown(){
        var floorX = 0;
        for (var i = 0; i < pillsAX.length; i++)
        {
            if (pillsAX[i] == leftPillXAxis && pillsAY[i] == leftPillYAxis + 30 || pillsBX[i] == rightPillXAxis && pillsBY[i] == rightPillYAxis + 30 
                || leftPillXAxis == pillsBX[i] && leftPillYAxis + 30 == pillsBY[i] || rightPillXAxis == pillsAX[i] && rightPillYAxis + 30 == pillsAY[i])
            {
                pillAColors[pillCount] = leftPillColor;
                pillsAX[pillCount] = leftPillXAxis;
                pillsAY[pillCount] = leftPillYAxis;
                pillBColors[pillCount] = rightPillColor;
                pillsBX[pillCount] = rightPillXAxis;
                pillsBY[pillCount] = rightPillYAxis;
                pillCount++;

                if (leftPillYAxis == 0 || rightPillYAxis == 0)
                {
                    clearInterval(myVar);
                    alert('game over')
                }
                else{
                    pillReset();
                    stop = true; 
                    return stop;    
                }                  
            }
            floorX = floorX + 30;
        }


        if (stop == false && leftPillYAxis < canvas.height - 30 || rightPillYAxis < canvas.height - 30)
        {
            //fallSpeed = 1;
            leftPillYAxis = leftPillYAxis + fallSpeed; 
            rightPillYAxis = rightPillYAxis + fallSpeed;
        }
        else
        {   
            //
            pillAColors[pillCount] = leftPillColor;
            pillsAX[pillCount] = leftPillXAxis;
            pillsAY[pillCount] = leftPillYAxis;
            pillBColors[pillCount] = rightPillColor;
            pillsBX[pillCount] = rightPillXAxis;
            pillsBY[pillCount] = rightPillYAxis;
            pillCount++;
            pillReset(); 
            stop = false;
            return stop;           
        }
    
}



function moveLeft(){
    if (rightPillXAxis > 35)
    {
        rightPillXAxis -= moveLeftOrRightSpeed;
        leftPillXAxis -= moveLeftOrRightSpeed;
        console.log(rightPillXAxis);
    }
}

function moveRight(){
    if (rightPillXAxis < canvas.width - 45)
    {
        rightPillXAxis += moveLeftOrRightSpeed;
        leftPillXAxis += moveLeftOrRightSpeed;
        console.log(originalPositionX);
    }
}

function moveFaster(){
    if(fallSpeed < 11)
    {
        fallSpeed += .1;
    }
}

function moveSlower(){
    if(fallSpeed > 1){
    fallSpeed -= .1;
    }
}

function rotatePill180(){
    var newRightPillColor = leftPillColor;
    var newLeftPillColor = rightPillColor;
    SetPillColor(newLeftPillColor, newRightPillColor);
}

function drawCanvas(){
    canvasContext.fillStyle = 'CornflowerBlue';
    canvasContext.fillRect(0,0, canvas.width, canvas.height);
    var i;
    for (i = 0; i < pillCount; i++)
    {      
        canvasContext.fillStyle = pillAColors[i];        
        canvasContext.fillRect(pillsAX[i], pillsAY[i], sizeX, sizeY);
        
        canvasContext.fillStyle = pillBColors[i];
        canvasContext.fillRect(pillsBX[i], pillsBY[i], sizeX, sizeY);
    }
}

function newPill(){  
    moveDown();   
    drawGame();
}

function rotatePillClockwise()
{    

    var priorRightPillXAxis = rightPillXAxis;
    var priorRightPillYAxis = rightPillYAxis;
    var priorLeftPillXAxis = leftPillXAxis;
    var priorLeftPillYAxis = leftPillYAxis;
    switch (position)
{
    case 1:
        leftPillYAxis = priorLeftPillYAxis - 30;
        leftPillXAxis = priorLeftPillXAxis;
        rightPillYAxis = priorRightPillYAxis;
        rightPillXAxis = priorLeftPillXAxis;
        position = 2;
        break;
    case 2:
        leftPillYAxis = priorLeftPillYAxis;
        leftPillXAxis = priorLeftPillXAxis + 30;
        rightPillYAxis = priorLeftPillYAxis;
        rightPillXAxis = priorRightPillXAxis;
        position = 3;
        break;
    case 3:
        leftPillYAxis = priorLeftPillYAxis + 30;
        leftPillXAxis = priorLeftPillXAxis;
        rightPillYAxis = priorRightPillYAxis;
        rightPillXAxis = priorRightPillXAxis + 30;

        position = 4;
        break;
    case 4:
        leftPillYAxis = priorLeftPillYAxis;
        leftPillXAxis = priorLeftPillXAxis - 30;
        rightPillYAxis = priorLeftPillYAxis;
        rightPillXAxis = priorLeftPillXAxis;
        position = 1;
        break;

    }
}
    


function drawPill(){     
        colorPill(leftPillColor, rightPillColor, leftPillXAxis, rightPillXAxis, leftPillYAxis, rightPillYAxis, sizeX, sizeY);  
}

function colorStaticPill(leftHalfPillColor, rightHalfPillColor, leftStartX, rightStartX, leftStartY, rightStartY, pillWidth, pillHeigth)
{
        var staticA_PillColor = leftHalfPillColor;
        var staticB_PillColor = rightHalfPillColor;
        var staticAX = leftStartX;
        var staticAY = leftStartY;
        var staticBX = rightStartX;
        var staticBY = rightStartY;

        canvasContext.fillStyle = staticA_PillColor;        
        canvasContext.fillRect(staticAX, staticAY, pillWidth, pillHeigth);      

        canvasContext.fillStyle = staticB_PillColor;
        canvasContext.fillRect(staticBX, staticBY, pillWidth, pillHeigth);      
}

function SetPillColor(left, right){
    leftPillColor = left;
    rightPillColor = right;
}

function colorPill(leftHalfPillColor, rightHalfPillColor, leftStartX, rightStartX, leftStartY, rightStartY, pillWidth, pillHeigth)
{
        canvasContext.fillStyle = leftHalfPillColor;
            leftPillColor = leftHalfPillColor;       
        canvasContext.fillRect(leftStartX, leftStartY, pillWidth, pillHeigth);
        

        canvasContext.fillStyle = rightHalfPillColor;
            rightPillColor = rightHalfPillColor
        canvasContext.fillRect(rightStartX, rightStartY, pillWidth, pillHeigth);      
}

function drawGame(){        
        drawCanvas();
        drawPill();
        endGame();
}
