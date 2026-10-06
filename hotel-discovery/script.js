const buttons = document.querySelectorAll(".view-button");

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        button.textContent = "Stay selected ✓";

        button.style.background = "#20201e";
        button.style.color = "white";

    });

});