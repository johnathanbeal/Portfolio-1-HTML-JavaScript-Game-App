
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
//var fallSpeed = 1.5;
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
    Velocity: 15,
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
        var firstPill = createPill(pill);
        firstPill.Count = 0;
        
        //var gameLoop = newPill(pill);

        myVar = setInterval(newPill, 100, firstPill);            
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
        return pillRefCopy;
}

function createPill(createAPill){
        var pillAxisSet = setAxis(createAPill);        
        var pillColorSet = SetPillColor(pillAxisSet);
        return pillColorSet;
}

function pillReset(){
        var pillPositions = startPositions(pill, canvas.width/2, 0);
        pill.BX = pillPositions[0];
        pill.BY = pillPositions[1];
        var pillAxis = setAxis(pill);
        var pillWithColor = SetPillColor(pillAxis);
        position = "0";
        return pillWithColor;
        // pill.AX = pillAxis[0];
        // pill.AY = pillAxis[1];
        // pill.BX = pillAxis[2];
        // pill.BY = pillAxis[3];
        // pill.AColor = pillColors[Math.floor(Math.random() * pillColors.length)];
        // pill.BColor = pillColors[Math.floor(Math.random() * pillColors.length)];      
        //SetPillColor(newRandomPillColor1, newRandomPillColor2);
}

var pillAColors = [];
var pillsAX = [];
var pillsAY = [];
var pillBColors = [];
var pillsBX = [];
var pillsBY = [];

//var stop;

function endGame(){

    // for (var i = 0; i < pill.Count; i++)
    // {
    //     if(pillsAY[i] <= 0 && pillsAY[i] <= 30 || pillsBY[i] <= 0 && pillsBY[i] <= 30);
    //     {
    //         clearInterval(myVar);
    //     }
    // }
    
}

function moveDown(movePillDown){
        var stop = false;
        for (var i = 0; i <= movePillDown.Count; i++)
        {
            if (pillsAX[i] == movePillDown.AX && pillsAY[i] == movePillDown.AY + 30 || pillsBX[i] == movePillDown.BX && pillsBY[i] == movePillDown.BY + 30 
                || movePillDown.AX == pillsBX[i] && movePillDown.AY + 30 == pillsBY[i] || movePillDown.BX == pillsAX[i] && movePillDown.BY + 30 == pillsAY[i])
            {
                pillAColors[movePillDown.Count] = movePillDown.AColor;
                pillsAX[movePillDown.Count] = movePillDown.AX;
                pillsAY[movePillDown.Count] = movePillDown.AY;
                pillBColors[movePillDown.Count] = movePillDown.BColor;
                pillsBX[movePillDown.Count] = movePillDown.BX;
                pillsBY[movePillDown.Count] = movePillDown.BY;
                movePillDown.Count++;

                if (movePillDown.AY == 0 || movePillDown.BY == 0)
                {
                    clearInterval(myVar);
                    alert('game over')
                }
                else{
                    pillReset(movePillDown);
                    stop = true; 
                    return movePillDown;    
                }                  
            }
            //floorX = floorX + 30;
        }


        if (stop == false && movePillDown.AY < canvas.height - 30 || movePillDown.BY < canvas.height - 30)
        {
            //pill.Velocity = 1;
            movePillDown.AY = movePillDown.AY + movePillDown.Velocity; 
            movePillDown.BY = movePillDown.BY + movePillDown.Velocity;
        }
        else
        {   
            //
            pillAColors[movePillDown.Count] = movePillDown.AColor;
            pillsAX[movePillDown.Count] = movePillDown.AX;
            pillsAY[movePillDown.Count] = movePillDown.AY;
            pillBColors[movePillDown.Count] = movePillDown.BColor;
            pillsBX[movePillDown.Count] = movePillDown.BX;
            pillsBY[movePillDown.Count] = movePillDown.BY;
            movePillDown.Count++;
            var resetPill = pillReset(movePillDown); 
            stop = false;
            return resetPill;           
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
    if (pill.BX <= 360 && pill.AX <= 360)
    {
        console.log(pill.AX);
        pill.AX += moveLeftOrRightSpeed;
        pill.BX += moveLeftOrRightSpeed;
    }
}

function moveFaster(){
    if(pill.Velocity < 10)
    {
        pill.Velocity += 3;
    }
}

function moveSlower(){
    if(pill.Velocity > 1){
    pill.Velocity -= 3;
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

function newPill(startNewPill){  
    moveDown(startNewPill);   
    drawGame(startNewPill);
    validateGame();
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
        pill.AY = previousBY - 30;
        pill.AX = previousAX;
        pill.BY = previousBY;
        pill.BX = previousAX;
        
        position = "90";
        break;
    case "90":
    if (pill.AX == 390 & pill.BX == 390)
    {
        pill.AY = previousAY;
        pill.AX = previousAX;
        pill.BY = previousAY;
        pill.BX = previousBX - 30;
        position = "180";
    }
    else
    {
        pill.AY = previousAY;
        pill.AX = previousAX + 30;
        pill.BY = previousAY;
        pill.BX = previousBX;
        position = "180";
    }
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

function SetPillColor(pillToColor){
    pillToColor.AColor = pillColors[Math.floor(Math.random() * pillColors.length)];
    pillToColor.BColor = pillColors[Math.floor(Math.random() * pillColors.length)]; 
    return pillToColor; 
}

function colorPill(pill)
{
    //rotatePillClockwise();// for debugging, remove 

        canvasContext.fillStyle = pill.AColor;
        canvasContext.fillRect(pill.AX, pill.AY, pill.AWidth, pill.AHeight);
            
        canvasContext.fillStyle = pill.BColor;            
        canvasContext.fillRect(pill.BX, pill.BY, pill.BWidth, pill.BHeight);      
        console.log(pill.AX, pill.BX);
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

var imageDataArray = [];
var imageData = [,];

function validateGame()
{
    for (var x = 0; x < 420; x += 30)
    {
        for (var y = 0; y < 840; y += 30)
        {
            imgData[x][y] = canvasContext.getImageData(x, y, 30, 30);
            var hex = "#" + ("000000" + rgbToHex(imgData[0], imgData[1], imgData[2])).slice(-6);
            imageDataArray.push(imgData);
        }
    }

}

function drawGame(pill){        
        drawCanvas(pill);
        drawPill(pill);
        
        endGame();
}
