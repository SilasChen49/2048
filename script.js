var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var sizeInput = document.getElementById("size");
var changeSize = document.getElementById("change-size");
var scoreLabel = document.getElementById("score");
scoreLabel.innerHTML="Score : " + 0;

var score = 0;
var size = 4;
var width = canvas.width / size - 5;

var cells = [];
var fontSize;
var loss=false;

var move = 0;

changeSize.onclick = function (){
    size = sizeInput.value;
    width = canvas.width / size - 5;
    canvasClear();
    score = 0;

    startGame();
}

function canvasClear(){
    context.clearRect(0,0,500,500);
    canvas.style.opacity = 1;
}

startGame();

function startGame() {
    createCells();
    pasteNewCell();
    setInterval(playBySelf,300);
}

function playBySelf(){
    move = Math.ceil(Math.random()*4);
    if (move==1) moveUp();
    if (move==2) moveLeft();
    if (move==3) moveRight();
    if (move==4) moveDown();
}

function cell(row, column) {
    this.value = 0;
    this.x = column * width + 5 * column + 5;
    this.y = row * width + 5 * row + 5;
}

function createCells(){
    for (var i=0; i<size; i++){
         cells[i] = [];
        for (var j=0; j<size; j++){
            cells[i][j] = new cell(i,j);
        }
    }
}

function drawCell(cell) {
    context.beginPath();
    context.rect(cell.x, cell.y, width, width);

    switch (cell.value){
        case 0 : context.fillStyle="#FFFFFF";break;
        case 2 : context.fillStyle="#FF0000";break;
        case 4 : context.fillStyle="#0000FF";break;
        case 8 : context.fillStyle="#0000A0";break;
        case 16 : context.fillStyle="#ADD8E6";break;
        case 32 : context.fillStyle="#800080";break;
        case 64 : context.fillStyle="#FFFF00";break;
        case 128 : context.fillStyle="#00FF00";break;
        case 256 : context.fillStyle="#FF00FF";break;
        case 512 : context.fillStyle="#FFA500";break;
        case 1024 : context.fillStyle="#A52A2A";break;
        case 2048 : context.fillStyle="#800000";break;
        default:context.fillStyle="#376835";break;
    }

    context.fill();
    if (cell.value){
        fontSize = width/2;
        context.font = fontSize + "px Arial";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText(cell.value, cell.x + width/2, cell.y+width/2);
    }
}

function drawAllCells() {
    for (var i=0; i<size; i++)
        for (var j=0; j<size; j++)
            drawCell(cells[i][j]);
    
}

function pasteNewCell() {
    var flag = false;
    for (var i=0; i<size; i++)
        for(var j=0; j<size; j++){
            if (!cells[i][j].value){
                flag = true;
                break;
            }
        }
    if (!flag) {
        gameOver();
        alert("GG WP Liu Wanlu, Your Final Score Is: " + score);
        return;
    }

    while (true){
        var row = Math.floor(Math.random()*size);
        var column = Math.floor(Math.random()*size);
        if (!cells[row][column].value){
            cells[row][column].value = 2;
            drawAllCells();
            return;
        }
    }
}
// document.onkeydown = function (event){
//     if (!loss){
//         if (event.keyCode == 38 || event.keyCode==73) moveUp();
//         else if (event.keyCode == 39 || event.keyCode==76) moveRight();
//         else if (event.keyCode == 40 || event.keyCode==75) moveDown();
//         else if (event.keyCode == 37 || event.keyCode==74) moveLeft();
//     }
//     scoreLabel.innerHTML="Score : " + score;
// }

function moveUp() {
    for (var j=0; j<size; j++)
        for (var i=1; i<size; i++){
            if (cells[i][j].value){
                var row = i;
                while (row>0){
                    if (!cells[row-1][j].value){
                        cells[row-1][j].value = cells[row][j].value;
                        cells[row][j].value=0;
                        row --;
                    }
                    else if (cells[row-1][j].value==cells[row][j].value){
                        cells[row-1][j].value *= 2;
                        score += cells[row-1][j].value;
                        cells[row][j].value = 0;
                        break;
                    }
                    else break;
                }
            }
        }
    pasteNewCell();
}

function moveDown(){
    for (var j=size-1; j>=0; j--)
        for (var i=size-2; i>=0; i--){
            if (cells[i][j].value){
                var row = i;
                while (row<size-1){
                    if (!cells[row+1][j].value){
                        cells[row+1][j].value = cells[row][j].value;
                        cells[row][j].value=0;
                        row ++;
                    }
                    else if (cells[row+1][j].value==cells[row][j].value){
                        cells[row+1][j].value *= 2;
                        score += cells[row+1][j].value;
                        cells[row][j].value = 0;
                        break;
                    }
                    else break;
                }
            }
        }
    pasteNewCell();
}

function moveRight () {
    var i, j;
    var coll;
    for(i = 0; i < size; i++) {
        for(j = size - 2; j >= 0; j--) {
            if(cells[i][j].value) {
                coll = j;
                while (coll + 1 < size) {
                    if (!cells[i][coll + 1].value) {
                        cells[i][coll + 1].value = cells[i][coll].value;
                        cells[i][coll].value = 0;
                        coll++;
                    } else if (cells[i][coll].value == cells[i][coll + 1].value) {
                        cells[i][coll + 1].value *= 2;
                        score +=  cells[i][coll + 1].value;
                        cells[i][coll].value = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    pasteNewCell();
}

function moveLeft() {
    var i, j;
    var coll;
    for(i = 0; i < size; i++) {
        for(j = 1; j < size; j++) {
            if(cells[i][j].value) {
                coll = j;
                while (coll  >= 1) {
                    if (!cells[i][coll - 1].value) {
                        cells[i][coll - 1].value = cells[i][coll].value;
                        cells[i][coll].value = 0;
                        coll--;
                    } else if (cells[i][coll].value == cells[i][coll - 1].value) {
                        cells[i][coll - 1].value *= 2;
                        score +=   cells[i][coll - 1].value;
                        cells[i][coll].value = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    pasteNewCell();
}

function gameOver(){
    canvas.style.opacity = 0.5;
    loss = true;
}