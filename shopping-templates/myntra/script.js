const products = [
    {
        id: 1,
        name: "Floral Summer Dress",
        category: "women",
        price: 1299,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 2,
        name: "Oversized Casual Shirt",
        category: "men",
        price: 899,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 3,
        name: "Classic Sneakers",
        category: "footwear",
        price: 1599,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 4,
        name: "Leather Handbag",
        category: "accessories",
        price: 1899,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 5,
        name: "Slim Fit Jeans",
        category: "men",
        price: 1499,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 6,
        name: "Printed Kurti",
        category: "women",
        price: 999,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 7,
        name: "Denim Jacket",
        category: "men",
        price: 1799,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 8,
        name: "Minimal Watch",
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
        productGrid.innerHTML = "<p>No products found.</p>";
        return;
    }

    list.forEach(function(product) {
        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="product-category">
                    ${product.category}
                </p>

                <p class="price">
                    ₹${product.price}
                </p>

                <div class="product-buttons">

                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})">
                        Add to Bag
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
    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    cartCount.textContent = cart.length;

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your bag is empty.</p>";
    }

    cart.forEach(function(product, index) {
        total += product.price;

        const item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <div class="cart-item-info">

                <h4>${product.name}</h4>

                <p>₹${product.price}</p>

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
    document.getElementById("cart").classList.add("open");
    document.getElementById("overlay").classList.add("open");
}


/* CLOSE CART */

function closeCart() {
    document.getElementById("cart").classList.remove("open");
    document.getElementById("overlay").classList.remove("open");
}


/* FILTER PRODUCTS */

function filterProducts(category) {
    let filteredProducts;

    if (category === "all") {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(function(product) {
            return product.category === category;
        });
    }

    displayProducts(filteredProducts);
}


/* SEARCH */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function() {
    const searchText = this.value.toLowerCase();

    const filteredProducts = products.filter(function(product) {
        return product.name.toLowerCase().includes(searchText);
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


/* MESSAGE */

function showMessage(message) {
    const toast = document.getElementById("toast");

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