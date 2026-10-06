const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMsg");

bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const date = document.getElementById("date").value;

    if (!name || !email || !date) {

        bookingMessage.textContent =
            "Please fill in your name, email and travel date.";

        return;
    }

    bookingMessage.textContent =
        "✓ Booking request confirmed for " + name +
        ". This is a UI demonstration — no payment was processed.";

});