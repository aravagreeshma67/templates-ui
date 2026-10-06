 const products = [
    {
        id: 1,
        brand: "AJIO",
        name: "Satin Midi Dress",
        category: "women",
        price: 1599,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 2,
        brand: "AJIO",
        name: "Premium Cotton Shirt",
        category: "men",
        price: 1199,
        image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 3,
        brand: "AJIO",
        name: "Retro Sneakers",
        category: "footwear",
        price: 1799,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 4,
        brand: "AJIO",
        name: "Structured Handbag",
        category: "accessories",
        price: 1999,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 5,
        brand: "AJIO",
        name: "Relaxed Fit Jeans",
        category: "men",
        price: 1499,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 6,
        brand: "AJIO",
        name: "Cropped Jacket",
        category: "women",
        price: 1899,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 7,
        brand: "AJIO",
        name: "Classic Sunglasses",
        category: "accessories",
        price: 999,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 8,
        brand: "AJIO",
        name: "Minimalist Watch",
        category: "accessories",
        price: 1299,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
    }
];


let cart = [];


/* DISPLAY PRODUCTS */

function displayProducts(list) {

    const productGrid = document.getElementById("productGrid");

    productGrid.innerHTML = "";

    if (list.length === 0) {

        productGrid.innerHTML =
            "<p>No products found.</p>";

        return;
    }

    list.forEach(function(product) {

        const card = document.createElement("div");

        card.className = "product-card";

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

                <div class="product-category">
                    ${product.category}
                </div>

                <div class="price">
                    ₹${product.price}
                </div>

                <div class="product-buttons">

                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})">
                        ADD TO BAG
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

    const product = products.find(function(item) {

        return item.id === id;

    });

    if (!product) {
        return;
    }

    cart.push(product);

    updateCart();

    showMessage("Added to Bag!");

}


/* UPDATE CART */

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    cartCount.textContent = cart.length;

    cartItems.innerHTML = "";

    let total = 0;


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your bag is empty.</p>";

    }


    cart.forEach(function(product, index) {

        total += product.price;

        const item =
            document.createElement("div");

        item.className = "cart-item";

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


    cartTotal.textContent = total;

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


/* FILTER PRODUCTS */

function filterProducts(category) {

    let filteredProducts;


    if (category === "all") {

        filteredProducts = products;

    } else {

        filteredProducts =
            products.filter(function(product) {

                return product.category === category;

            });

    }


    displayProducts(filteredProducts);

}


/* SEARCH */

document
    .getElementById("searchInput")
    .addEventListener("input", function() {

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

    });


/* WISHLIST */

function addWishlist() {

    showMessage("Added to Wishlist!");

}


/* CHECKOUT */

function checkout() {

    if (cart.length === 0) {

        showMessage("Your bag is empty!");

        return;

    }


    showMessage("Checkout successful!");

}


/* TOAST MESSAGE */

function showMessage(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.style.display = "block";


    setTimeout(function() {

        toast.style.display = "none";

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