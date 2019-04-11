//Global Variables
let img_flag = document.getElementById("img-flag");
let img_mine = document.getElementById("img-mine");
let img_sqr = document.getElementById("img-sqt0");
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let grid;
let size = 0;
let width = 50;
let total_mines = 0;
let flag_count;
let difficulty;
let mines_flagged;
let game_lost = false;
let mouse_pressed_first = false;



function reset() {  //Game reset 

    stopwatch.stop();
    stopwatch.update("00:00");
    flag_count = total_mines;
    mouse_pressed_first = false;
    updateGUI();

}

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'flex';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

function closeWindow() {  // Game window close
    var x = confirm('Exit Game?');
    if (x) window.close();
}

function getRandomInt(min, max) { // Random number generation within a range of numbers
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initializeArray(col, row) { //Initialize 2D array
    var array = new Array(col);
    for (i = 0; i < array.length; i++) {
        array[i] = new Array(row);
    }
    return array;
}

function initializeGrid() { //Create new tile object for every array index

    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {

            grid[i][j] = new Tile(i, j, width);
        }
    }

}

function initializeMines() { // Initialize mines

    let possible_locations = [];

    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
            console.log(i + "" + j);
            possible_locations.push([i, j]);
        }
    } // Get possible locations a mine can have on the board
    console.log(possible_locations);

    var temp_size = size * size;

    for (k = 0; k < total_mines; k++) {
        var val = getRandomInt(1, temp_size) - 1;
        //console.log(val);
        var selected = possible_locations[val];
        console.log(val);
        console.log(selected);
        console.log(temp_size);
        var i = selected[0];
        var j = selected[1];
        possible_locations.splice(val, 1);
        temp_size--;
        grid[i][j].mine = true;
    } // Get a random number and pick that location from possible locations. Splice the array and remove picked location to prevent duplicates.

}

function initializeNeighbors() {

    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
            grid[i][j].countMines();
        }
    }
} //Count number of mines for neighbours

function setup(difficulty) {

    switch (difficulty) {
        case "Easy":
            size = 8;
            c.setAttribute("width", "400");
            c.setAttribute("height", "400");
            total_mines = 10;
            console.log(size);
            break;

        case "Medium":
            size = 9;
            c.setAttribute("width", "450");
            c.setAttribute("height", "450");
            total_mines = 30;
            console.log(size);
            break;

        case "Hard":
            size = 10;
            c.setAttribute("width", "500");
            c.setAttribute("height", "500");
            total_mines = 35;
            console.log(size);
            break;

        default:
            alert("Some random stuff");
            break;
    }
    flag_count = total_mines;
    grid = initializeArray(size, size);
    initializeGrid();
    initializeMines();
    initializeNeighbors();

    console.log(grid);
    drawGrid();
}

function drawGrid() {

    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
            grid[i][j].show();
        }
    }
}

function switchToGame(event) {

    if (event.target.classList.contains('btn-difficulty')) {
        difficulty = event.target.innerText;
        //console.log(difficulty);
        document.getElementById('basediv').style.display = 'flex';
        document.getElementById('basediv').style.flexDirection = 'column';
        document.getElementById('basediv').style.alignItems = 'center';
        document.getElementById('basediv').style.justifyContent = 'center';
        document.getElementById('intro').style.display = 'none';
        document.getElementById('navbar').style.display = 'flex';
        document.getElementById('navbar').style.justifyContent = 'space-evenly';
        document.getElementById('navbar').style.alignItems = 'center';
        //document.getElementById('flag-count').textContent = flag_count;
        setup(difficulty);
        updateGUI();
    } else if (event.target.classList.contains('btn-reset')) {
        //flag_count = 10;
        //document.getElementById('flag-count').textContent = flag_count;
        reset();
        setup(difficulty);
    }
}

function clear() {

    ctx.clearRect(0, 0, 500, 500);

}

function gameOver() {

    if(game_lost == true) {
        let bad_audio = document.getElementById('gameOverBad');
        bad_audio.play();
        for (i = 0; i < size; i++) {
            for (j = 0; j < size; j++) {
                grid[i][j].revealed = true;
                grid[i][j].show();
            }
        }
        let overlay = document.getElementById('overlay');
        setTimeout( function () {
            unfade(overlay);
        },1000);
        //overlay_timer(overlay);
        stopwatch.stop();
    } else {

    }

}

function updateGUI() {
    document.getElementById('flag-count').textContent = flag_count;
}

function leftmousePress(event) {

    if (!mouse_pressed_first) {
        mouse_pressed_first = true;
        stopwatch.start();
    }

    var lol = c.getBoundingClientRect();
    var x = event.clientX - lol.left;
    var y = event.clientY - lol.top;
    console.log(x + " " + y);

    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
            if (grid[i][j].coordinates(x, y)) {
                grid[i][j].reveal();
                grid[i][j].show();
                if (grid[i][j].mine) {
                    game_lost = true;
                    gameOver();
                }
            }
        }
    }
}

function rightmousePress(event) {
    event.preventDefault()
        var lol = c.getBoundingClientRect();
        var x = event.clientX - lol.left;
        var y = event.clientY - lol.top;

        for (i = 0; i < size; i++) {
            for (j = 0; j < size; j++) {
                if (grid[i][j].coordinates(x, y)) {
                    grid[i][j].markFlag();
                    updateGUI();
                }
            }
        }
    
}

function refresh() {
    window.location.reload();
}

document.addEventListener("DOMContentLoaded", function () {

    document.addEventListener('click', switchToGame, false);
    c.addEventListener('click', leftmousePress, false);
    c.addEventListener('contextmenu', rightmousePress, false);
    document.getElementById('replay').addEventListener('click',refresh,false);
});