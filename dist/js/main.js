document.addEventListener("DOMContentLoaded", function () {

    document.addEventListener('click', function (event) {
        let difficulty;
        if (event.target.classList.contains('btn-difficulty')) {
            difficulty = event.target.innerText;
            console.log(difficulty);
            document.getElementById('basediv').style.display = 'block';
            document.getElementById('intro').style.display = 'none';
            init_size(difficulty);
        }
    }, false);

    function init_size(difficulty) {
        let size = 0;
        switch (difficulty) {
            case "Easy":
                size = 25;
                console.log(size);
                init_grid(size);
                break;

            case "Medium":
                size = 36;
                console.log(size);
                init_grid(size);
                break;

            case "Hard":
                size = 49;
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

        if (size == 25) {
            row_size = 5;
        } else if (size == 36) {
            row_size = 6;
        } else {
            row_size = 7;
        }

        let root = document.documentElement;
        root.style.setProperty('--col-size', row_size);
        root.style.setProperty('--row-size', row_size);
        
        for (i = 1; i <= size; i++) {
            var div = document.createElement("DIV");
            div.setAttribute("id", size);
            div.setAttribute("class", "box");
            document.getElementById("wrapper").appendChild(div);
        }
    }
});