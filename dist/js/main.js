//Global Variables
let grid;
let size = 0;
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let width = 50;
let total_mines = 0;
let flag_count = 10;
let mouse_pressed_first = false;
let difficulty;
var img_flag = document.getElementById("img-flag");
var img_mine = document.getElementById("img-mine");
var img_sqr = document.getElementById("img-sqt0");


function closeWindow() {
    var x = confirm('Exit Game?');
    if (x) window.close();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initializeArray(col, row) {
    var array = new Array(col);
    for (i = 0; i < array.length; i++) {
        array[i] = new Array(row);
    }
    return array;
}

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

    grid = initializeArray(size, size);

    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {

            grid[i][j] = new Tile(i, j, width);
        }
    }

    let possible_locations = [];

    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
            console.log(i + "" + j);
            possible_locations.push([i, j]);
        }
    }
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
    }



    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
            grid[i][j].countMines();
        }
    }
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
        document.getElementById('flag-count').textContent = flag_count;
        setup(difficulty);
    } else if (event.target.classList.contains('btn-reset')) {
        stopwatch.stop();
        stopwatch.update("00:00");
        flag_count = 10;
        mouse_pressed_first = false;
        setup(difficulty);
    }
}

function clear() {

    ctx.clearRect(0, 0, 500, 500);

}

function gameOver() {
    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
            grid[i][j].revealed = true;
            grid[i][j].show();
        }
    }
    stopwatch.stop();
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

document.addEventListener("DOMContentLoaded", function () {

    document.addEventListener('click', switchToGame, false);
    c.addEventListener('click', leftmousePress, false);
    c.addEventListener('contextmenu', rightmousePress, false);

});