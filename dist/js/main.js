document.addEventListener("DOMContentLoaded", function () {

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-difficulty')) {
            console.log(event.target.innerText);
        }
    }, false);

});