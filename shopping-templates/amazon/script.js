const products = [

    {
        id: 1,
        name: "Samsung Galaxy Smartphone 5G",
        category: "electronics",
        price: 24999,
        originalPrice: 29999,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 2,
        name: "Wireless Bluetooth Headphones",
        category: "electronics",
        price: 1999,
        originalPrice: 3999,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 3,
        name: "Smart Watch Fitness Tracker",
        category: "electronics",
        price: 2499,
        originalPrice: 4999,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 4,
        name: "Classic Casual Sneakers",
        category: "fashion",
        price: 2299,
        originalPrice: 3999,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 5,
        name: "Women's Casual Fashion Dress",
        category: "fashion",
        price: 1299,
        originalPrice: 2499,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 6,
        name: "Modern Table Lamp for Home",
        category: "home",
        price: 899,
        originalPrice: 1499,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 7,
        name: "The Complete Fiction Book",
        category: "books",
        price: 499,
        originalPrice: 799,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 8,
        name: "Non Stick Kitchen Cookware Set",
        category: "kitchen",
        price: 1899,
        originalPrice: 2999,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80"
    }

];


let cart = [];

let wishlist = [];


/* DISPLAY PRODUCTS */

function displayProducts(productList) {

    const grid = document.getElementById("productGrid");

    grid.innerHTML = "";

    if (productList.length === 0) {

        grid.innerHTML = `
            <div style="
                grid-column: 1 / -1;
                background:white;
                padding:50px;
                text-align:center;
            ">
                <h2>No products found</h2>
                <p>Try another search.</p>
            </div>
        `;

        return;
    }


    productList.forEach(product => {

        const discount = Math.round(
            ((product.originalPrice - product.price) /
            product.originalPrice) * 100
        );


        const card = document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <button
                class="wishlist"
                onclick="addWishlist(${product.id})"
                title="Add to wishlist"
            >
                ♡
            </button>

            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="product-category">
                ${product.category}
            </div>

            <div class="product-name">
                ${product.name}
            </div>

            <div class="rating">
                ★★★★★
                <span style="color:#555">
                    ${product.rating}
                </span>
            </div>

            <div class="price">
                ₹${product.price.toLocaleString("en-IN")}

                <span class="original-price">
                    ₹${product.originalPrice.toLocaleString("en-IN")}
                </span>
            </div>

            <div class="discount">
                ${discount}% off
            </div>

            <button
                class="add-cart"
                onclick="addToCart(${product.id})"
            >
                Add to Cart
            </button>

        `;


        grid.appendChild(card);

    });

}


/* ADD TO CART */

function addToCart(id) {

    const product = products.find(item => item.id === id);

    if (!product) {
        return;
    }


    const existingProduct = cart.find(
        item => item.id === id
    );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    updateCart();

    showToast("Added to cart 🛒");
}


/* UPDATE CART */

function updateCart() {

    const cartCount = document.getElementById("cartCount");

    const cartItems = document.getElementById("cartItems");

    const cartTotal = document.getElementById("cartTotal");


    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );


    const totalPrice = cart.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );


    cartCount.textContent = totalQuantity;

    cartTotal.textContent = totalPrice.toLocaleString("en-IN");


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your Amazon cart is empty.
            </p>
        `;

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach(item => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <strong>
                    ₹${item.price.toLocaleString("en-IN")}
                </strong>

                <p>
                    Quantity: ${item.quantity}
                </p>

                <button
                    class="remove-button"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });

}


/* REMOVE FROM CART */

function removeFromCart(id) {

    cart = cart.filter(
        item => item.id !== id
    );

    updateCart();

    showToast("Product removed");
}


/* OPEN CART */

function openCart() {

    document.getElementById("cart")
        .classList.add("active");

    document.getElementById("overlay")
        .classList.add("active");

}


/* CLOSE CART */

function closeCart() {

    document.getElementById("cart")
        .classList.remove("active");

    document.getElementById("overlay")
        .classList.remove("active");

}


/* FILTER PRODUCTS */

function filterProducts(category) {

    if (category === "all") {

        displayProducts(products);

        return;
    }


    const filtered = products.filter(
        product => product.category === category
    );


    displayProducts(filtered);

    document.getElementById("productsSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* SEARCH */

function searchProducts() {

    const searchInput =
        document.getElementById("searchInput");

    const searchCategory =
        document.getElementById("searchCategory");


    const searchText =
        searchInput.value.toLowerCase().trim();

    const category =
        searchCategory.value;


    let results = products;


    if (category !== "all") {

        results = results.filter(
            product => product.category === category
        );

    }


    if (searchText !== "") {

        results = results.filter(product =>

            product.name
                .toLowerCase()
                .includes(searchText)

        );

    }


    displayProducts(results);

}


/* SEARCH WHILE TYPING */

document
    .getElementById("searchInput")
    .addEventListener("input", searchProducts);


/* WISHLIST */

function addWishlist(id) {

    const product = products.find(
        item => item.id === id
    );


    if (!product) {
        return;
    }


    if (wishlist.includes(id)) {

        wishlist = wishlist.filter(
            item => item !== id
        );

        showToast("Removed from wishlist");

    } else {

        wishlist.push(id);

        showToast("Added to wishlist ❤️");

    }

}


/* CHECKOUT */

function checkout() {

    if (cart.length === 0) {

        showToast("Your cart is empty!");

        return;
    }


    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );


    alert(
        "Order placed successfully! 🎉\n\n" +
        "Total Amount: ₹" +
        total.toLocaleString("en-IN")
    );


    cart = [];

    updateCart();

    closeCart();

}


/* HERO SCROLL */

function scrollToProducts() {

    document
        .getElementById("productsSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* TOAST MESSAGE */

function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}


/* INITIAL LOAD */

displayProducts(products);

updateCart();