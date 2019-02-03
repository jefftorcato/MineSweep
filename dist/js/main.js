function closeWindow() {
    var x = confirm('Exit Game?');
    if (x) window.close();
}

function load(url, element) {
    req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            element.innerHTML = req.responseText;
        }
    };

    req.open("GET", url, true);
    req.send(null);
}

document.addEventListener("DOMContentLoaded", function () {

    let arr = [] // Global Variable Mine placement

    document.addEventListener('click', function (event) {
        let difficulty;
        if (event.target.classList.contains('btn-difficulty')) {
            difficulty = event.target.innerText;
            console.log(difficulty);
            document.getElementById('basediv').style.display = 'flex';
            document.getElementById('basediv').style.flexDirection = 'column';
            document.getElementById('basediv').style.alignItems = 'center';
            document.getElementById('basediv').style.justifyContent = 'center';
            document.getElementById('intro').style.display = 'none';
            init_size(difficulty);
        }
    }, false);

    function init_size(difficulty) {
        let size = 0;
        switch (difficulty) {
            case "Easy":
                size = 49;
                console.log(size);
                init_grid(size);
                break;

            case "Medium":
                size = 64;
                console.log(size);
                init_grid(size);
                break;

            case "Hard":
                size = 81;
                console.log(size);
                init_grid(size);
                break;

            default:
                alert("Some random stuff");
                break;
        }
    }

    function init_grid(size) {
        var i;
        let row_size;

        if (size == 49) {
            row_size = 7;
        } else if (size == 64) {
            row_size = 8;
        } else {
            row_size = 9;
        }

        let root = document.documentElement;
        root.style.setProperty('--col-size', row_size);
        root.style.setProperty('--row-size', row_size);

        for (i = 1; i <= size; i++) {

            var div = document.createElement("DIV");
            div.setAttribute("id", i);
            div.setAttribute("name", i);
            div.setAttribute("class", "box");
            document.getElementById("wrapper").appendChild(div);
        }
        assign_mines(size);
    }

    function assign_mines(size) {

        let mine_count = Math.floor((size / 100) * 40);

        while (arr.length <= mine_count) {
            var r = Math.floor(Math.random() * 100) + 1;
            if (arr.indexOf(r) === -1 && r < size) arr.push(r);
        }
        console.log(arr);
    }


    document.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        let here_flag = parseInt(event.target.getAttribute('name'));
        
        console.log(here_flag);
        if(!isNaN(here_flag)){
            var flag = document.createElement("IMG");
            flag.setAttribute('src', './dist/img/flag.svg');
            flag.setAttribute("class", "flag");
            document.getElementById(here_flag).appendChild(flag);
        }
    }, false)
});