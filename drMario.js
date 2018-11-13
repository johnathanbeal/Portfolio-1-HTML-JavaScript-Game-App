var position = "0";
var Pills = [];

var pillAColors = [];//refactor functionally
var pillsAX = [];//refactor functionally
var pillsAY = [];//refactor functionally
var pillBColors = [];//refactor functionally
var pillsBX = [];//refactor functionally
var pillsBY = [];//refactor functionally

function Pill(A_Width, A_Height, A_Color, A_X, A_Y, B_Width, B_Height, B_Color, B_X, B_Y, velocity)
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
    this.Velocity = velocity
}

window.onload = function() {
    var framePerSecond = 100;
    console.log("Start Program");
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    var pill = new Pill(30, 30, "White", 0, 0, 30, 30,"White", 0, 0, 5 );
    Pills.push(pill);
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
    
    for (var i = 0; i <= Pills.length; i++)
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

function pillReset(pillToReset){
    var x = canvas.width / 2;
    var y = 0;
    var pillPositions = startPositions(pillToReset, x, y);
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

