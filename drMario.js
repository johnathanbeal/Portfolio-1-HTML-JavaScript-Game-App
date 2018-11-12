var position = "0";

var pillAColors = [];//refactor functionally
var pillsAX = [];//refactor functionally
var pillsAY = [];//refactor functionally
var pillBColors = [];//refactor functionally
var pillsBX = [];//refactor functionally
var pillsBY = [];//refactor functionally

var pill = {
    AWidth: 30,
    BWidth: 30,
    AHeight: 30,
    BHeight: 30,
    AColor: "White",
    BColor: "White",
    AX: 0,//set start x, y
    AY: 0,//set start x, y
    BX: 0,//set start x, y
    BY: 0,//set start x, y
    Velocity: 5,
    Count: []
}

window.onload = function() {
    var framePerSecond = 100;
    console.log("Start Program");
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    var pillPositions = startPositions(pill, canvas.width / 2, 0);
    pill.BX = pillPositions[0];
    pill.BY = pillPositions[1];
    var pillDimensions = setSize(pill, 30, 30);
    pill.AWidth = pillDimensions[0];
    pill.AHeight = pillDimensions[1];
    pill.BWidth = pillDimensions[2];
    pill.BHeight = pillDimensions[3];
    var firstPill = createPill(pill);
    firstPill.Count = 0;
    setInterval(newPill, framePerSecond, firstPill);            
}

function newPill(startNewPill){  
    moveDown(startNewPill);   
    drawGame(startNewPill);
}

function moveDown(movePillDown){
    var stop = false;
    for (var i = 0; i <= movePillDown.Count; i++) {
        if (pillsAX[i] == movePillDown.AX && pillsAY[i] == movePillDown.AY + 30 || pillsBX[i] == movePillDown.BX && pillsBY[i] == movePillDown.BY + 30
            || movePillDown.AX == pillsBX[i] && movePillDown.AY + 30 == pillsBY[i] || movePillDown.BX == pillsAX[i] && movePillDown.BY + 30 == pillsAY[i]) {
            pillAColors[movePillDown.Count] = movePillDown.AColor;
            pillsAX[movePillDown.Count] = movePillDown.AX;
            pillsAY[movePillDown.Count] = movePillDown.AY;
            pillBColors[movePillDown.Count] = movePillDown.BColor;
            pillsBX[movePillDown.Count] = movePillDown.BX;
            pillsBY[movePillDown.Count] = movePillDown.BY;
            movePillDown.Count++;

            if (movePillDown.AY == 0 || movePillDown.BY == 0) {
                alert('game over')
            }
            else {
                pillReset(movePillDown);
                stop = true;
                return movePillDown;
            }
        }
    }

    if (stop == false && movePillDown.AY < canvas.height - 30 || movePillDown.BY < canvas.height - 30) {
        movePillDown.AY = movePillDown.AY + movePillDown.Velocity;
        movePillDown.BY = movePillDown.BY + movePillDown.Velocity;
    }
    else {
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

function drawGame(pill){        
    drawCanvas(pill);
    drawPill(pill);       
}

function drawCanvas(pill){
    var cCanvas = document.getElementById('gameCanvas');
    var cCanvasContext = canvas.getContext('2d');
    
    cCanvasContext.fillStyle = 'CornflowerBlue';
    cCanvasContext.fillRect(0,0, canvas.width, canvas.height);
    
    for (var i = 0; i <= pill.Count; i++)
    {      
        cCanvasContext.fillStyle = pillAColors[i];        
        cCanvasContext.fillRect(pillsAX[i], pillsAY[i], pill.AWidth, pill.AHeight);
        
        cCanvasContext.fillStyle = pillBColors[i];
        cCanvasContext.fillRect(pillsBX[i], pillsBY[i], pill.BWidth, pill.BHeight);
    }
}

function drawPill(pill){     
    colorPill(pill);  
}

function startPositions(pillRefCopy, x, y){
    pillRefCopy.BX = x;
    pillRefCopy.BY = y;
    return [pillRefCopy.BX, pillRefCopy.BY];//refactor OOP
}

function setSize(pillRefCopy, _width, _height){
    pillRefCopy.AWidth = _width;
    pillRefCopy.AHeight = _height;
    pillRefCopy.BWidth = _width;
    pillRefCopy.BHeight = _height;
    return [pillRefCopy.AWidth, pillRefCopy.AHeight, pillRefCopy.BWidth, pillRefCopy.BHeight];//refactor OOP
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

function SetPillColor(pillToColor){   
    var pillColors = ['purple', 'yellow', 'black'];
    pillToColor.AColor = pillColors[Math.floor(Math.random() * pillColors.length)];
    pillToColor.BColor = pillColors[Math.floor(Math.random() * pillColors.length)]; 
    return pillToColor; 
}

function pillReset(pillToReset){
    var pillPositions = startPositions((pillToReset, canvas.width / 2, 0));
    pillPositions.BX = pillPositions[0];
    pillPositions.BY = pillPositions[1];
    var pillAxis = setAxis(pillPositions);
    var pillWithColor = SetPillColor(pillAxis);
    position = "0";
    return pillWithColor;
}

function moveLeft(){
    if (pill.AX > 0)
    {
        pill.AX -= 30;
        pill.BX -= 30;
    }
}

function moveRight(){
    if (pill.BX <= 360 && pill.AX <= 360)
    {
        console.log(pill.AX);
        pill.AX += 30;
        pill.BX += 30;
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

function colorPill(pill)
{
    var pCanvas = document.getElementById('gameCanvas');
    var pCanvasContext = canvas.getContext('2d');

    pCanvasContext.fillStyle = pill.AColor;
    pCanvasContext.fillRect(pill.AX, pill.AY, pill.AWidth, pill.AHeight);

    pCanvasContext.fillStyle = pill.BColor;
    pCanvasContext.fillRect(pill.BX, pill.BY, pill.BWidth, pill.BHeight);
    console.log(pill.AX, pill.BX);
}

