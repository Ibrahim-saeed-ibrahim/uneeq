document.addEventListener("DOMContentLoaded", function () {
    let cart = [];
    const cartList = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");
    const checkoutBtn = document.getElementById("checkout");

    function updateCart() {
        cartList.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            let li = document.createElement("li");
            li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
            
            let removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.onclick = function () {
                removeFromCart(index);
            };
            
            li.appendChild(removeBtn);
            cartList.appendChild(li);
            total += item.price * item.quantity;
        });

        totalPriceEl.textContent = total.toFixed(2);
    }

    function addToCart(name, price) {
        let existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCart();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let name = this.getAttribute("data-name");
            let price = parseFloat(this.getAttribute("data-price"));
            addToCart(name, price);
        });
    });

    checkoutBtn.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert("Checkout successful!");
            cart = [];
            updateCart();
        }
    });
});
