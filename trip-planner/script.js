const saveButton = document.getElementById("savePlan");
const message = document.getElementById("planMsg");

saveButton.addEventListener("click", function () {

    message.textContent =
        "✓ Itinerary saved successfully — ready for your journey.";

    saveButton.textContent = "Itinerary Saved";

});