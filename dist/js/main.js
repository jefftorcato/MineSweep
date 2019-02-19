//Global Variables
let grid;
let size=0;
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let width = 20;


function closeWindow() {
    var x = confirm('Exit Game?');
    if (x) window.close();
}

function initializeArray(col, row){
    var array=[col];
    for(i=0; i < Array.length; i++){
        array[i] = [row];
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
    for(i=0; i<size; i++){
        for(j=0; i<size; j++){
            grid[i][j] = new Tile(i*width, j*width, width);
        }
    }
    drawGrid();
}

function drawGrid(){

    for(i=0; i<size; i++){
        for(j=0; i<size; j++){
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
        c.setAttribute("width", "200");
        c.setAttribute("height", "200");
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


document.addEventListener("DOMContentLoaded", function () {

    document.addEventListener('click', switchToGame , false);

});
