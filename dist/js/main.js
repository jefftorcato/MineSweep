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

            case "Difficult":
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


        for (i = 1; i <= size; i++) {
            var div = document.createElement("DIV");
            div.setAttribute("id", size);
            div.setAttribute("class", "box");
            document.getElementById("wrapper").appendChild(div);
        }
    }
});