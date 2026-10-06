 /* =========================
   DESTINATION SEARCH
========================= */

const searchInput =
    document.getElementById("searchInput");

const clearSearch =
    document.getElementById("clearSearch");

const destinationCards =
    document.querySelectorAll(".card");

const searchMessage =
    document.getElementById("searchMessage");

const noResults =
    document.getElementById("noResults");


searchInput.addEventListener("input", function () {

    const searchText =
        searchInput.value.toLowerCase().trim();

    let visibleCards = 0;


    destinationCards.forEach(function (card) {

        const searchableText =
            card.dataset.search.toLowerCase();

        if (
            searchableText.includes(searchText)
        ) {

            card.style.display = "block";

            visibleCards++;

        } else {

            card.style.display = "none";

        }

    });


    /* NO RESULTS */

    if (visibleCards === 0) {

        noResults.style.display = "block";

        searchMessage.textContent =
            "No destinations match your search.";

    } else {

        noResults.style.display = "none";

        if (searchText === "") {

            searchMessage.textContent = "";

        } else {

            searchMessage.textContent =
                visibleCards +
                " destination" +
                (visibleCards > 1 ? "s" : "") +
                " found.";

        }

    }

});



/* CLEAR SEARCH */

clearSearch.addEventListener("click", function () {

    searchInput.value = "";

    destinationCards.forEach(function (card) {

        card.style.display = "block";

    });

    noResults.style.display = "none";

    searchMessage.textContent = "";

    searchInput.focus();

});



/* =========================
   INSPIRE ME BUTTON
========================= */

const inspireButton =
    document.getElementById("inspireBtn");

const message =
    document.getElementById("message");


inspireButton.addEventListener("click", function () {

    const destinations = [

        "Maybe Bali is calling you.",

        "How about a peaceful escape to Kyoto?",

        "Krabi could be your next adventure.",

        "Paris is always a good idea.",

        "Maybe the mountains are calling.",

        "What about Switzerland?"

    ];


    const randomDestination =
        destinations[
            Math.floor(
                Math.random() * destinations.length
            )
        ];


    message.textContent =
        randomDestination;

});