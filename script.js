 const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".template-card");


filters.forEach(function(button) {

    button.addEventListener("click", function() {

        filters.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.filter;

        cards.forEach(function(card) {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

});


function openTemplate(url) {
    window.location.href = url;
}