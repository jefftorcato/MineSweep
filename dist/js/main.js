//Global Variables
let grid;
let size=0;
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let width = 50;
var img = document.getElementById("img-flag");


function closeWindow() {
    var x = confirm('Exit Game?');
    if (x) window.close();
}

function initializeArray(col, row){
    var array= new Array(col);
    for(i=0; i < array.length; i++){
        array[i] = new Array(row);
    }
    return array;
}

function setup(difficulty){

    switch (difficulty) {
        case "Easy":
            size = 8;
            console.log(size);    
            break;

        case "Medium":
            size = 9;
            console.log(size); 
            break;

        case "Hard":
            size = 10;
            console.log(size);
            break;

        default:
            alert("Some random stuff");
            break;
    }
    grid = initializeArray(size,size);
    for(i=0; i< size; i++){
        for(j=0; j< size; j++){
            grid[i][j] = new Tile(i*width, j*width, width);
        }
    }
    console.log(grid);
    drawGrid();
}

function drawGrid(){

    for(i=0; i< size; i++){
        for(j=0; j<size; j++){
            grid[i][j].show();
        }
    }
}

function switchToGame(event){
    let difficulty;
    if (event.target.classList.contains('btn-difficulty')) {
        difficulty = event.target.innerText;
        //console.log(difficulty);
        document.getElementById('basediv').style.display = 'flex';
        document.getElementById('basediv').style.flexDirection = 'column';
        document.getElementById('basediv').style.alignItems = 'center';
        document.getElementById('basediv').style.justifyContent = 'center';
        document.getElementById('intro').style.display = 'none';
        document.getElementById('navbar').style.display = 'block';
        c.setAttribute("width", "500");
        c.setAttribute("height", "500");
        setup(difficulty);
    }
}

function init_size(difficulty) {
    let size = 0;
    switch (difficulty) {
        case "Easy":
            size = 64;
            console.log(size);
            init_grid(size);
            break;

        case "Medium":
            size = 81;
            console.log(size);
            init_grid(size);
            break;

        case "Hard":
            size = 100;
            console.log(size);
            init_grid(size);
            break;

        default:
            alert("Some random stuff");
            break;
    }
}

function clear() {

    ctx.clearRect(0, 0, 500, 500);

}

function mousePress(event){
    var lol = c.getBoundingClientRect();
    var x = event.clientX - lol.left;
    var y = event.clientY - lol.top;
    console.log(x+" "+y);
  
    for(i=0; i< size; i++){
        for(j=0; j<size; j++){
            if(grid[i][j].coordinates(x,y)){
                grid[i][j].reveal();
                grid[i][j].show ();
            }
        }
    }
}



document.addEventListener("DOMContentLoaded", function () {

    document.addEventListener('click', switchToGame , false);
    c.addEventListener('click', mousePress , false);

});
