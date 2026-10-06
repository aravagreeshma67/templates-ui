const products = [

    {
        id: 1,
        brand: "Samsung",
        name: "Galaxy Smartphone 5G",
        category: "mobile",
        price: 24999,
        originalPrice: 29999,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 2,
        brand: "ASUS",
        name: "Gaming Laptop",
        category: "electronics",
        price: 54999,
        originalPrice: 69999,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 3,
        brand: "boAt",
        name: "Wireless Headphones",
        category: "electronics",
        price: 1999,
        originalPrice: 3999,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 4,
        brand: "Noise",
        name: "Smart Watch",
        category: "electronics",
        price: 2499,
        originalPrice: 4999,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 5,
        brand: "Puma",
        name: "Running Shoes",
        category: "fashion",
        price: 2299,
        originalPrice: 4999,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 6,
        brand: "American Tourister",
        name: "Travel Backpack",
        category: "fashion",
        price: 1499,
        originalPrice: 2999,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 7,
        brand: "Canon",
        name: "Digital Camera",
        category: "electronics",
        price: 42999,
        originalPrice: 49999,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 8,
        brand: "Philips",
        name: "Air Fryer",
        category: "appliances",
        price: 3999,
        originalPrice: 6999,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=700&q=80"
    }

];


let cart = [];


/* DISPLAY PRODUCTS */

function displayProducts(list) {

    const productGrid =
        document.getElementById("productGrid");

    productGrid.innerHTML = "";


    if (list.length === 0) {

        productGrid.innerHTML =
            "<p>No products found.</p>";

        return;
    }


    list.forEach(function(product) {

        const card =
            document.createElement("div");

        card.className = "product-card";


        const discount =
            Math.round(
                ((product.originalPrice - product.price)
                / product.originalPrice) * 100
            );


        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="product-info">

                <div class="product-brand">
                    ${product.brand}
                </div>

                <div class="product-name">
                    ${product.name}
                </div>

                <div class="rating">
                    ${product.rating} ★
                </div>

                <div class="price">
                    ₹${product.price}

                    <span class="original-price">
                        ₹${product.originalPrice}
                    </span>

                    <span class="discount">
                        ${discount}% off
                    </span>
                </div>

                <div class="product-buttons">

                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})">
                        ADD TO CART
                    </button>

                    <button
                        class="wishlist"
                        onclick="addWishlist()">
                        ♡
                    </button>

                </div>

            </div>
        `;


        productGrid.appendChild(card);

    });

}


/* ADD TO CART */

function addToCart(id) {

    const product =
        products.find(function(item) {

            return item.id === id;

        });


    if (!product) {
        return;
    }


    cart.push(product);

    updateCart();

    showMessage("Added to Cart!");

}


/* UPDATE CART */

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    cartCount.textContent =
        cart.length;


    cartItems.innerHTML = "";


    let total = 0;


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

    }


    cart.forEach(function(product, index) {

        total += product.price;


        const item =
            document.createElement("div");


        item.className =
            "cart-item";


        item.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="cart-item-info">

                <h4>
                    ${product.name}
                </h4>

                <p>
                    ₹${product.price}
                </p>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})">
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(item);

    });


    cartTotal.textContent =
        total;

}


/* REMOVE FROM CART */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* OPEN CART */

function openCart() {

    document
        .getElementById("cart")
        .classList.add("open");


    document
        .getElementById("overlay")
        .classList.add("open");

}


/* CLOSE CART */

function closeCart() {

    document
        .getElementById("cart")
        .classList.remove("open");


    document
        .getElementById("overlay")
        .classList.remove("open");

}


/* FILTER */

function filterProducts(category) {

    let filteredProducts;


    if (category === "all") {

        filteredProducts =
            products;

    } else {

        filteredProducts =
            products.filter(function(product) {

                return product.category === category;

            });

    }


    displayProducts(filteredProducts);

}


/* SEARCH */

const searchInput =
    document.getElementById("searchInput");


searchInput.addEventListener(
    "input",
    function() {

        const searchText =
            this.value.toLowerCase();


        const filteredProducts =
            products.filter(function(product) {

                return (
                    product.name
                        .toLowerCase()
                        .includes(searchText)
                    ||
                    product.brand
                        .toLowerCase()
                        .includes(searchText)
                    ||
                    product.category
                        .toLowerCase()
                        .includes(searchText)
                );

            });


        displayProducts(filteredProducts);

    }
);


/* WISHLIST */

function addWishlist() {

    showMessage("Added to Wishlist!");

}


/* CHECKOUT */

function checkout() {

    if (cart.length === 0) {

        showMessage("Your cart is empty!");

        return;
    }


    showMessage("Order placed successfully!");

}


/* TOAST */

function showMessage(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent =
        message;


    toast.style.display =
        "block";


    setTimeout(function() {

        toast.style.display =
            "none";

    }, 2000);

}


/* SHOP NOW */

function scrollToProducts() {

    document
        .getElementById("productsSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* INITIAL LOAD */

displayProducts(products);

updateCart();