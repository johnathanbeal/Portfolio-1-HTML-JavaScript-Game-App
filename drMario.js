
var gameOn;
var canvas;
var canvasContext;
var pills = [];
var pillColors = ['purple', 'yellow', 'black'];
var randomPillColor1;
var randomPillColor2;
var leftPillColor;
var rightPillColor;



//var pill;
//var pillCount;
var width;
var height;
var myVar;
var fallSpeed = 1.5;
var moveLeftOrRightSpeed = 30;
var framePerSecond = 100;
var position = "0";

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
        //pill = 
        createPill(pill);
        pill.Count = 0;
        
        //var gameLoop = newPill(pill);

        myVar = setInterval(newPill, 100, pill);            
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
        
        //return pill;
}

function pillReset(){
        var pillPositions = startPositions(pill, canvas.width/2, 0);
        pill.BX = pillPositions[0];
        pill.BY = pillPositions[1];
        var pillAxis = setAxis(pill);
        pill.AX = pillAxis[0];
        pill.AY = pillAxis[1];
        pill.BX = pillAxis[2];
        pill.BY = pillAxis[3];
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

    for (var i = 0; i < pill.Count; i++)
    {
        if(pillsAY[i] <= 0 && pillsAY[i] <= 30 || pillsBY[i] <= 0 && pillsBY[i] <= 30);
        {
            //clearInterval(myVar);
        }
    }
    
}

function moveDown(pill){
        var floorX = 0;
        for (var i = 0; i <= pill.Count; i++)
        {
            if (pillsAX[i] == pill.AX && pillsAY[i] == pill.AY + 30 || pillsBX[i] == pill.BX && pillsBY[i] == pill.BY + 30 
                || pill.AX == pillsBX[i] && pill.AY + 30 == pillsBY[i] || pill.BX == pillsAX[i] && pill.BY + 30 == pillsAY[i])
            {
                pillAColors[pill.Count] = pill.AColor;
                pillsAX[pill.Count] = pill.AX;
                pillsAY[pill.Count] = pill.AY;
                pillBColors[pill.Count] = pill.BColor;
                pillsBX[pill.Count] = pill.BX;
                pillsBY[pill.Count] = pill.BY;
                pill.Count++;

                if (pill.AY == 0 || pill.BY == 0)
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
            //floorX = floorX + 30;
        }


        if (stop == false && pill.AY < canvas.height - 30 || pill.BY < canvas.height - 30)
        {
            //fallSpeed = 1;
            pill.AY = pill.AY + fallSpeed; 
            pill.BY = pill.BY + fallSpeed;
        }
        else
        {   
            //
            pillAColors[pill.Count] = pill.AColor;
            pillsAX[pill.Count] = pill.AX;
            pillsAY[pill.Count] = pill.AY;
            pillBColors[pill.Count] = pill.BColor;
            pillsBX[pill.Count] = pill.BX;
            pillsBY[pill.Count] = pill.BY;
            pill.Count++;
            pillReset(); 
            stop = false;
            return pill;           
        }
    
}



function moveLeft(){
    if (pill.AX > 0)
    {
        pill.AX -= moveLeftOrRightSpeed;
        pill.BX -= moveLeftOrRightSpeed;

    }
}

function moveRight(){
    if (pill.AX < 360)
    {
        console.log(pill.AX);
        pill.AX += moveLeftOrRightSpeed;
        pill.BX += moveLeftOrRightSpeed;
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

function drawCanvas(pill){
    canvasContext.fillStyle = 'CornflowerBlue';
    canvasContext.fillRect(0,0, canvas.width, canvas.height);
    
    for (var i = 0; i <= pill.Count; i++)
    {      
        canvasContext.fillStyle = pillAColors[i];        
        canvasContext.fillRect(pillsAX[i], pillsAY[i], pill.AWidth, pill.AHeight);
        
        canvasContext.fillStyle = pillBColors[i];
        canvasContext.fillRect(pillsBX[i], pillsBY[i], pill.BWidth, pill.BHeight);
    }
}

function newPill(pill){  
    moveDown(pill);   
    drawGame(pill);
}

function rotatePillClockwise()
{    
    var previousAX = pill.AX;
    var previousAY = pill.AY;
    var previousBX = pill.BX;
    var previousBY = pill.BY;
    
    switch (position)
{   
    case "0":
        pill.AY = previousAY - 30;
        pill.AX = previousAX;
        pill.BY = previousBY;
        pill.BX = previousAX;
        
        position = "90";
        break;
    case "90":
        pill.AY = previousAY;
        pill.AX = previousAX + 30;
        pill.BY = previousAY;
        pill.BX = previousBX;
        position = "180";

        break;
    case "180":
        pill.AY = previousAY + 30;
        pill.AX = previousAX;
        pill.BY = previousBY;
        pill.BX = previousBX + 30;


        position = "270";
        break;
    case "270":
        pill.AY = previousAY;
        pill.AX = previousAX - 30;
        pill.BY = previousAY;
        pill.BX = previousAX;

        position = "0";
        break;

    }
    console.log(position);

}
    


function drawPill(pill){     
        colorPill(pill);  
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

function colorPill(pill)
{
    //rotatePillClockwise();// for debugging, remove 

        canvasContext.fillStyle = pill.AColor;
        canvasContext.fillRect(pill.AX, pill.AY, pill.AWidth, pill.AHeight);
            
        canvasContext.fillStyle = pill.BColor;            
        canvasContext.fillRect(pill.BX, pill.BY, pill.BWidth, pill.BHeight);      
}

function drawGame(pill){        
        drawCanvas(pill);
        drawPill(pill);
        endGame();
}
