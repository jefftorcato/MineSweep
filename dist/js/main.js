document.addEventListener("DOMContentLoaded", function () {

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-difficulty')) {
            console.log(event.target.innerText);
            document.getElementById('basediv').style.display = 'block';
            document.getElementById('intro').style.display = 'none';
        }
    }, false);

});