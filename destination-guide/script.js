 const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".guide-card");

const searchMessage = document.getElementById("searchMessage");
const noResults = document.getElementById("noResults");

let selectedCategory = "all";


// ===============================
// SEARCH + FILTER
// ===============================

function filterDestinations() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    let visibleCards = 0;


    cards.forEach(function(card) {

        const searchData =
            card.dataset.search.toLowerCase();

        const categoryData =
            card.dataset.category.toLowerCase();


        const matchesSearch =
            searchData.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            categoryData.includes(selectedCategory);


        if (matchesSearch && matchesCategory) {

            card.style.display = "block";

            visibleCards++;

        } else {

            card.style.display = "none";

        }

    });


    // NO RESULTS

    if (visibleCards === 0) {

        noResults.style.display = "block";

        searchMessage.textContent =
            "No destinations match your search.";

    } else {

        noResults.style.display = "none";

        if (searchText === "") {

            searchMessage.textContent =
                visibleCards + " destinations available.";

        } else {

            searchMessage.textContent =
                visibleCards +
                " destination" +
                (visibleCards > 1 ? "s" : "") +
                " found.";

        }

    }

}


// SEARCH EVENT

searchInput.addEventListener(
    "input",
    filterDestinations
);


// CLEAR SEARCH

clearSearch.addEventListener(
    "click",
    function() {

        searchInput.value = "";

        selectedCategory = "all";


        filters.forEach(function(filter) {

            filter.classList.remove("active");

        });


        filters[0].classList.add("active");


        filterDestinations();

        searchInput.focus();

    }
);


// ===============================
// CATEGORY FILTER
// ===============================

filters.forEach(function(filter) {

    filter.addEventListener(
        "click",
        function() {

            filters.forEach(function(button) {

                button.classList.remove("active");

            });


            filter.classList.add("active");


            selectedCategory =
                filter.dataset.category;


            filterDestinations();

        }
    );

});


// ===============================
// FAVORITES
// ===============================

const favoriteButtons =
    document.querySelectorAll(".favorite");

const favoriteCount =
    document.getElementById("favoriteCount");

let favorites = 0;


favoriteButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            if (button.classList.contains("saved")) {

                button.classList.remove("saved");

                button.textContent = "♡";

                favorites--;

            } else {

                button.classList.add("saved");

                button.textContent = "♥";

                favorites++;

            }


            favoriteCount.textContent =
                favorites;

        }
    );

});


// ===============================
// GUIDE MODAL
// ===============================

const readButtons =
    document.querySelectorAll(".read-button");

const modal =
    document.getElementById("guideModal");

const closeModal =
    document.getElementById("closeModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalText =
    document.getElementById("modalText");


const guideInformation = {

    Nepal:
        "Explore the Himalayas, peaceful mountain villages and scenic hiking trails. Nepal is perfect for travellers who want adventure, nature and breathtaking landscapes.",

    Portugal:
        "Discover dramatic Atlantic cliffs, colourful coastal towns and peaceful beaches. Portugal is a beautiful choice for a relaxed European escape.",

    Switzerland:
        "Experience crystal-clear lakes, alpine villages and incredible mountain views. Switzerland is ideal for peaceful mornings and scenic adventures."

};


readButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const place =
                button.dataset.place;


            modalTitle.textContent =
                place;


            modalText.textContent =
                guideInformation[place];


            modal.classList.add("show");

        }
    );

});


// CLOSE MODAL

closeModal.addEventListener(
    "click",
    function() {

        modal.classList.remove("show");

    }
);


// CLICK OUTSIDE MODAL

modal.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {

            modal.classList.remove("show");

        }

    }
);


// ESCAPE KEY

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            modal.classList.remove("show");

        }

    }
);


// INITIAL DISPLAY

filterDestinations();