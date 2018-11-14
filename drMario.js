var Pills = [];

var gameState = {
    position: "0",
    keyPresses: [],
    currentPill: {}
}

var constants = {
    LEFT_KEY_PRESS: 'left-key-press',
    RIGHT_KEY_PRESS: 'right-key-press'
}

function Pill(A_Width, A_Height, A_Color, A_X, A_Y, B_Width, B_Height, B_Color, B_X, B_Y, velocity, position)
{
    this.AWidth = A_Width;
    this.BWidth = B_Width;
    this.AHeight = A_Height;
    this.BHeight = B_Height;
    this.AColor = A_Color,
    this.BColor = B_Color,
    this.AX = A_X,
    this.AY = A_Y,
    this.BX = B_X,
    this.BY = B_Y,
    this.Velocity = velocity,
    this.Position = position
}

window.onload = function() {
    var framePerSecond = 100;
    console.log("Start Program");
    var canvas = document.getElementById('gameCanvas');
    var canvasContext = canvas.getContext('2d');
    var pill = new Pill(30, 30, "White", 0, 0, 30, 30,"White", 0, 0, 15, "0" );
    Pills.push(pill);
    var pillWithSetAxis = setAxis(pill)
    var pillPositions = startPositions(pillWithSetAxis, 180, 0, 210, 0);
    var pillDimensions = setSize(pillPositions, 30, 30);
    pill.AWidth = pillDimensions[0];
    pill.AHeight = pillDimensions[1];
    pill.BWidth = pillDimensions[2];
    pill.BHeight = pillDimensions[3];
    var firstPill = createPill(pill);
    firstPill.Count = 0;
    setInterval(newPill, framePerSecond, firstPill);            
}

function newPill(startNewPill){      
    var gamePill = drawGame(startNewPill);
    var usedPill = moveDown(gamePill);   
}

function moveDown(movePillDown){
    console.log(movePillDown.AY, movePillDown.BY)
    var stop = false;
    var i;
    for (i = 0; i < Pills.length; i++) {
        var test = Pills[0].A_X;
        var test1 = Pills[0].AX;
        if (Pills[i].AX == movePillDown.AX && Pills[i].AY == movePillDown.AY + 30 || 
            Pills[i].BX == movePillDown.BX && Pills[i].BY == movePillDown.BY + 30 || 
            movePillDown.AX == Pills[i].BX && movePillDown.AY + 30 == Pills[i] || 
            movePillDown.BX == Pills[i].AX && movePillDown.BY + 30 == Pills[i].AY) {
            Pills[Pills.length -1].AColor = movePillDown.AColor;
            Pills[Pills.length -1].AX = movePillDown.AX;
            Pills[Pills.length -1].AY = movePillDown.AY;
            Pills[Pills.length -1].BColor = movePillDown.BColor;
            Pills[Pills.length -1].BX = movePillDown.BX;
            Pills[Pills.length -1].BY = movePillDown.BY;
            if (movePillDown.AY == 0 || movePillDown.BY == 0) {
                alert('game over')
            }
            else {
                var restartPill = pillReset();
                stop = true;               
                return restartPill;
            }
        }
    }

    if (stop == false && 
        movePillDown.AY <= 810 - 15 && movePillDown.AY >= 0|| 
        movePillDown.BY <= 810 - 15 && movePillDown.AY >= 0) {
        movePillDown.AY = movePillDown.AY + movePillDown.Velocity;
        movePillDown.BY = movePillDown.BY + movePillDown.Velocity;
    }
    
    else {
        Pills[Pills.length -1].AColor = movePillDown.AColor;
        Pills[Pills.length -1].AX = movePillDown.AX;
        Pills[Pills.length -1].AY = movePillDown.AY;
        Pills[Pills.length -1].BColor = movePillDown.BColor;
        Pills[Pills.length -1].BX = movePillDown.BX;
        Pills[Pills.length -1].BY = movePillDown.BY;
        var rstartPill = pillReset();
        stop = false;       
        return restartPill;
    }
}

function drawGame(pill){        
    var canvasPill = drawCanvas(pill);
    var pillWithColor = colorPill(canvasPill);
    return pillWithColor;       
}

function drawCanvas(pill){
    var cCanvas = document.getElementById('gameCanvas');
    var cCanvasContext = cCanvas.getContext('2d');
    
    cCanvasContext.fillStyle = 'CornflowerBlue';
    cCanvasContext.fillRect(0,0, cCanvas.width, cCanvas.height);
    
    for (var i = 0; i <= Pills.length - 1; i++)
    {      
        cCanvasContext.fillStyle = Pills[i].AColor;        
        cCanvasContext.fillRect(Pills[i].AX, Pills[i].AY, 30, 30);
        
        cCanvasContext.fillStyle = Pills[i].BColor;
        cCanvasContext.fillRect(Pills[i].BX, Pills[i].BY, 30, 30);
    }
    return pill;
}

function startPositions(pillRefCopy, x1, y1, x2, y2){
     pillRefCopy.AX = x1;
     pillRefCopy.AY = y1;
     pillRefCopy.BX = x2;
     pillRefCopy.BY = y2;
     return pillRefCopy;
}

function setSize(pillRefCopy, _width, _height){
    pillRefCopy.AWidth = _width;
    pillRefCopy.AHeight = _height;
    pillRefCopy.BWidth = _width;
    pillRefCopy.BHeight = _height;
    return [pillRefCopy.AWidth, pillRefCopy.AHeight, pillRefCopy.BWidth, pillRefCopy.BHeight];//refactor OOP
}

function setAxis(pillRefCopy){
    pillRefCopy.AX = pillRefCopy.BX - 30;
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

function pillReset(){
    var nPill = new Pill(30, 30, "White", 0, 0, 30, 30,"White", 0, 0, 15, "0" );
    Pills.push(nPill);
    var x = 180;
    var y = 0;
    var z = 210;
    var zz = 0;
    var pillPositions = startPositions(nPill, x, y, z, zz);
    var pillWithColor = createPill(pillPositions);
    pillWithColor.Position = "0";
    return pillWithColor;
}

function moveLeft(pill = [Pills.length - 1]){
    if (pill.AX > 0)
    {
        pill.AX -= 30;
        pill.BX -= 30;
    }
}

function moveRight(pill = [Pills.length - 1]){
    if (pill.BX <= 360 && pill.AX <= 360)
    {
        console.log(pill.AX);
        pill.AX += 30;
        pill.BX += 30;
    }
}

function moveFaster(pill = [Pills.length - 1]){
    if(pill.Velocity < 10)
    {
        pill.Velocity += 3;
    }
}

function moveSlower(pill = [Pills.length - 1]){
    if(pill.Velocity > 1){
    pill.Velocity -= 3;
    }
}

function rotatePillClockwise()
{    
    var previousAX = Pills[Pills.length - 1].AX;
    var previousAY = Pills[Pills.length - 1].AY;
    var previousBX = Pills[Pills.length - 1].BX;
    var previousBY = Pills[Pills.length - 1].BY;
    
    switch (Pills[Pills.length - 1].Position)
{   
    case "0":
        Pills[Pills.length - 1].AY = previousBY - 30;
        Pills[Pills.length - 1].AX = previousAX;
        Pills[Pills.length - 1].BY = previousBY;
        Pills[Pills.length - 1].BX = previousAX;
        Pills[Pills.length - 1].Position = "90";
        break;
    case "90":   
        Pills[Pills.length - 1].AY = previousAY;
        Pills[Pills.length - 1].AX = previousAX + 30;
        Pills[Pills.length - 1].BY = previousAY;
        Pills[Pills.length - 1].BX = previousBX;
        Pills[Pills.length - 1].Position = "180";
    //}
        break;
    case "180":
        Pills[Pills.length - 1].AY = previousAY + 30;
        Pills[Pills.length - 1].AX = previousAX;
        Pills[Pills.length - 1].BY = previousBY;
        Pills[Pills.length - 1].BX = previousBX + 30;
        Pills[Pills.length - 1].Position = "270";
        break;
    case "270":
        Pills[Pills.length - 1].AY = previousAY;
        Pills[Pills.length - 1].AX = previousAX - 30;
        Pills[Pills.length - 1].BY = previousAY;
        Pills[Pills.length - 1].BX = previousAX;
        Pills[Pills.length - 1].Position = "0";
        break;
    }
    console.log(Pills[Pills.length - 1].Position);
}

function colorPill(pill)
{
    var pCanvas = document.getElementById('gameCanvas');
    var pCanvasContext = pCanvas.getContext('2d');

    pCanvasContext.fillStyle = pill.AColor;
    pCanvasContext.fillRect(pill.AX, pill.AY, pill.AWidth, pill.AHeight);

    pCanvasContext.fillStyle = pill.BColor;
    pCanvasContext.fillRect(pill.BX, pill.BY, pill.BWidth, pill.BHeight);
    console.log(pill.AX, pill.BX);

    return pill;
}

