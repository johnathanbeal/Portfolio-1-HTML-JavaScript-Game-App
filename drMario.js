
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

//var pill;
//var pillCount;
var width;
var height;
var myVar;
var fallSpeed = 2;
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

var pills = [];

var pill = {
    AWidth: 30,
    BWidth: 30,
    AHeight: 30,
    BHeight: 30,
    AColor: "",
    BColor: "",
    AX: 0,
    AY: 0,
    BX: 0,
    BY: 0,
    Velocity: 1,
    Count: []
}

window.onload = function() {
        console.log("Start Program");
        canvas = document.getElementById('gameCanvas');
        canvasContext = canvas.getContext('2d');
        
        var pillPositions = startPositions(pill, canvas.width/2, 0);
        pill.BX = pillPositions[0];
        pill.BY = pillPositions[1];
        var pillDimensions = setSize(pill, 30, 30);
        pill.AWidth = pillDimensions[0];
        pill.AHeight = pillDimensions[1];
        pill.BWidth = pillDimensions[2];
        pill.BHeight = pillDimensions[3];
        pill = createPill(pill);
        pill.Count = 0;
        
        myVar = setInterval(newPill(pill), 10);            
}


function startPositions(pillRefCopy, x, y){
    pillRefCopy.BX = x;
    pillRefCopy.BY = y;
    return [pillRefCopy.BX, pillRefCopy.BY];
}

function setSize(pillRefCopy, _width, _height){
    pillRefCopy.AWidth = _width;
    pillRefCopy.AHeight = _height;
    pillRefCopy.BWidth = _width;
    pillRefCopy.BHeight = _height;
    return [pillRefCopy.AWidth, pillRefCopy.AHeight, pillRefCopy.BWidth, pillRefCopy.BHeight];
}

function setAxis(pillRefCopy){
        pillRefCopy.AX = pillRefCopy.BX - pillRefCopy.AWidth;
        pillRefCopy.AY = pillRefCopy.BY;
        pillRefCopy.BX = pillRefCopy.BX;
        pillRefCopy.BY = pillRefCopy.BY;
        return [pillRefCopy.AX, pillRefCopy.AY, pillRefCopy.BX, pillRefCopy.BY];
}

function createPill(pill){
        var pillAxis = setAxis(pill);
        pill.AX = pillAxis[0];
        pill.AY = pillAxis[1];
        pill.BX = pillAxis[2];
        pill.BY = pillAxis[3];
        pill.AColor = pillColors[Math.floor(Math.random() * pillColors.length)];
        pill.BColor = pillColors[Math.floor(Math.random() * pillColors.length)];
        //SetPillColor(pill);
        
        return pill;
}

function pillReset(){
        var pillPositions = startPositions(pill, canvas.width/2, 0);
        pill.BX = pillPositions[0];
        pill.BY = pillPositions[1];
        var pillAxis = setAxis(pill);
        pill.AX = pillAxis[0];
        pill.AY = pillAxis[1];
        pill.BX = pillAxis[2];
        pill.BY = pillAXis[3];
        pill.AColor = pillColors[Math.floor(Math.random() * pillColors.length)];
        pill.BColor = pillColors[Math.floor(Math.random() * pillColors.length)];      
        //SetPillColor(newRandomPillColor1, newRandomPillColor2);
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

function moveDown(pillRefCopy){
        var floorX = 0;
        for (var i = 0; i < pillsAX.length; i++)
        {
            if (pillsAX[i] == pillRefCopy.AX && pillsAY[i] == pillRefCopy.AY + 30 || pillsBX[i] == pillRefCopy.BX && pillsBY[i] == pillRefCopy.BY + 30 
                || pillRefCopy.AX == pillsBX[i] && pillRefCopy.AY + 30 == pillsBY[i] || pillRefCopy.BX == pillsAX[i] && pillRefCopy.BY + 30 == pillsAY[i])
            {
                pillAColors[pillCount] = pillRefCopy.AColor;
                pillsAX[pillCount] = pillRefCopy.AX;
                pillsAY[pillCount] = pillRefCopy.AY;
                pillBColors[pillCount] = pillRefCopy.BColor;
                pillsBX[pillCount] = pillRefCopy.BX;
                pillsBY[pillCount] = pillRefCopy.BY;
                pillCount++;

                if (pillRefCopy.AY == -30 || pillRefCopy.BY == -30)
                {
                    clearInterval(myVar);
                    alert('game over')
                }
                else{
                    pillReset();
                    stop = true; 
                    return pill;    
                }                  
            }
            floorX = floorX + 30;
        }


        if (stop == false && pillRefCopy.AY < canvas.height - 30 || pillRefCopy.BY < canvas.height - 30)
        {
            //fallSpeed = 1;
            pillRefCopy.AY = pillRefCopy.AY + fallSpeed; 
            pillRefCopy.BY = pillRefCopy.BY + fallSpeed;
        }
        else
        {   
            //
            pillAColors[pillCount] = pillRefCopy.AColor;
            pillsAX[pillCount] = pillRefCopy.AX;
            pillsAY[pillCount] = pillRefCopy.AY;
            pillBColors[pillCount] = rightPillColor;
            pillsBX[pillCount] = pillRefCopy.BX;
            pillsBY[pillCount] = pillRefCopy.BY;
            pillCount++;
            pillReset(); 
            stop = false;
            return pill;           
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
        console.log(startPositionX);
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
    for (i = 0; i < pillsAX[i]; i++)
    {      
        canvasContext.fillStyle = pillAColors[i];        
        canvasContext.fillRect(pillsAX[i], pillsAY[i], width, height);
        
        canvasContext.fillStyle = pillBColors[i];
        canvasContext.fillRect(pillsBX[i], pillsBY[i], width, height);
    }
}

function newPill(pillRefCopy){  
    moveDown(pillRefCopy);   
    drawGame(pillRefCopy);
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
    


function drawPill(pillRefCopy){     
        colorPill(pillRefCopy);  
}

// function colorStaticPill(leftHalfPillColor, rightHalfPillColor, leftStartX, rightStartX, leftStartY, rightStartY, pillWidth, pillHeigth)
// {
//         var staticA_PillColor = leftHalfPillColor;
//         var staticB_PillColor = rightHalfPillColor;
//         var staticAX = leftStartX;
//         var staticAY = leftStartY;
//         var staticBX = rightStartX;
//         var staticBY = rightStartY;

//         canvasContext.fillStyle = staticA_PillColor;        
//         canvasContext.fillRect(staticAX, staticAY, pillWidth, pillHeigth);      

//         canvasContext.fillStyle = staticB_PillColor;
//         canvasContext.fillRect(staticBX, staticBY, pillWidth, pillHeigth);      
// }

// function SetPillColor(left, right){
//     leftPillColor = left;
//     rightPillColor = right;
// }

function colorPill(pillRefCopy)
{
        canvasContext.fillStyle = pillRefCopy.AColor;
        canvasContext.fillRect(pillRefCopy.AX, pillRefCopy.AY, pillRefCopy.AWidth, pillRefCopy.AHeight);
            
        canvasContext.fillStyle = pillRefCopy.BColor;            
        canvasContext.fillRect(pillRefCopy.BX, pillRefCopy.BY, pillRefCopy.BWidth, pillRefCopy.BHeight);      
}

function drawGame(pillRefCopy){        
        drawCanvas();
        drawPill(pillRefCopy);
        endGame();
}
