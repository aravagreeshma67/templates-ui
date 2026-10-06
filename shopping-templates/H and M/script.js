const products = [
    {
        id: 1,
        name: "Relaxed Cotton Shirt",
        category: "Women",
        price: 1499,
        image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 2,
        name: "Oversized Casual Jacket",
        category: "Women",
        price: 2499,
        image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 3,
        name: "Classic Denim Jacket",
        category: "Men",
        price: 2299,
        image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 4,
        name: "Basic Cotton T-Shirt",
        category: "Men",
        price: 799,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 5,
        name: "Summer Mini Dress",
        category: "Women",
        price: 1799,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 6,
        name: "Straight Fit Trousers",
        category: "Men",
        price: 1699,
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 7,
        name: "Kids Printed Hoodie",
        category: "Kids",
        price: 999,
        image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 8,
        name: "Minimal Shoulder Bag",
        category: "Accessories",
        price: 1299,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80"
    }
];


let cart = [];
let wishlist = [];
let currentCategory = "All";


/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(list = products) {

    const grid = document.getElementById("productGrid");

    grid.innerHTML = "";

    if (list.length === 0) {

        grid.innerHTML = `
            <p style="grid-column:1/-1;text-align:center;padding:50px;">
                No products found.
            </p>
        `;

        return;
    }

    list.forEach(product => {

        const isWishlisted = wishlist.includes(product.id);

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <button
                    class="wishlist-btn"
                    onclick="toggleWishlist(${product.id})"
                >
                    ${isWishlisted ? "♥" : "♡"}
                </button>

            </div>

            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <button
                    class="add-btn"
                    onclick="addToCart(${product.id})"
                >
                    ADD TO BAG
                </button>

            </div>
        `;

        grid.appendChild(card);
    });
}


/* ================= CATEGORY FILTER ================= */

function filterCategory(category) {

    currentCategory = category;

    if (category === "All") {

        displayProducts(products);

    } else {

        const filtered = products.filter(
            product => product.category === category
        );

        displayProducts(filtered);
    }

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* ================= SEARCH ================= */

function focusSearch() {

    const searchBox = document.getElementById("searchBox");

    searchBox.classList.toggle("active");

    if (searchBox.classList.contains("active")) {

        document
            .getElementById("searchInput")
            .focus();
    }
}


function searchProducts() {

    const query =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();

    let filtered = products;

    if (currentCategory !== "All") {

        filtered = filtered.filter(
            product =>
                product.category === currentCategory
        );
    }

    if (query) {

        filtered = filtered.filter(product =>
            product.name
                .toLowerCase()
                .includes(query)
            ||
            product.category
                .toLowerCase()
                .includes(query)
        );
    }

    displayProducts(filtered);
}


/* ================= WISHLIST ================= */

function toggleWishlist(id) {

    if (wishlist.includes(id)) {

        wishlist =
            wishlist.filter(
                productId => productId !== id
            );

        showToast("Removed from wishlist");

    } else {

        wishlist.push(id);

        showToast("Added to wishlist");
    }

    searchProducts();
}


function showWishlist() {

    if (wishlist.length === 0) {

        showToast("Your wishlist is empty");

        return;
    }

    const wishlistProducts =
        products.filter(
            product => wishlist.includes(product.id)
        );

    displayProducts(wishlistProducts);

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* ================= CART ================= */

function addToCart(id) {

    const product =
        products.find(
            product => product.id === id
        );

    if (!product) return;

    const existing =
        cart.find(
            item => item.id === id
        );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    showToast(
        `${product.name} added to your bag`
    );
}


function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );

    updateCart();
}


function updateCart() {

    const cartCount =
        document.getElementById("cartCount");

    const totalItems =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

    cartCount.textContent = totalItems;


    const cartItems =
        document.getElementById("cartItems");

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div style="text-align:center;padding:60px 20px;">
                <p>Your bag is empty.</p>
            </div>
        `;

    } else {

        cartItems.innerHTML = cart.map(item => `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        ₹${item.price.toLocaleString("en-IN")}
                    </p>

                    <p>
                        Quantity: ${item.quantity}
                    </p>

                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${item.id})"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `).join("");
    }


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );

    document.getElementById("cartTotal").textContent =
        `₹${total.toLocaleString("en-IN")}`;
}


function openCart() {

    document
        .getElementById("cartPanel")
        .classList.add("active");

    document
        .getElementById("overlay")
        .classList.add("active");
}


function closeCart() {

    document
        .getElementById("cartPanel")
        .classList.remove("active");

    document
        .getElementById("overlay")
        .classList.remove("active");
}


/* ================= CHECKOUT ================= */

function checkout() {

    if (cart.length === 0) {

        showToast("Your bag is empty");

        return;
    }

    showToast("Checkout feature coming soon!");

}


/* ================= NEWSLETTER ================= */

function subscribe() {

    const email =
        document
            .getElementById("emailInput")
            .value
            .trim();

    if (!email) {

        showToast("Please enter your email");

        return;
    }

    showToast(
        "Thanks for subscribing!"
    );

    document
        .getElementById("emailInput")
        .value = "";
}


/* ================= TOAST ================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);
}


/* ================= INITIAL LOAD ================= */

displayProducts();

updateCart();