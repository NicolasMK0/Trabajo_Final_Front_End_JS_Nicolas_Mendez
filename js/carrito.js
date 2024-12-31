const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const cartCountElement = document.getElementById("cart-count");

function actualizarContadorCarrito() {
    const contador = carrito.reduce((total, item) => total + item.cantidad, 0);
    cartCountElement.textContent = contador;
}

const items = document.querySelector(".items");
const totalPriceElement = document.getElementById("total-price");
const finalizeBtn = document.getElementById("finalize-btn");

function renderCarrito() {
    items.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.cantidad * item.precio;

        const imagen = item.imagen ? item.imagen : "images/default-image.jpg";

        const html = `
            <tr data-id="${item.id}">
                <td>
                    <img src="${imagen}" class="${item.imagen ? '' : 'default-img'}">
                </td>
                <td>${item.nombre}</td> <!-- Nombre del producto en una celda separada -->
                <td>
                    <button class="decrease-btn" data-index="${index}">-</button>
                    ${item.cantidad}
                    <button class="increase-btn" data-index="${index}">+</button>
                </td>
                <td><span class="price">$ ${item.precio.toFixed(2)}</span></td>
                <td><span class="price">$ ${(item.cantidad * item.precio).toFixed(2)}</span></td>
                <td><button class="remove-btn" data-index="${index}">X</button></td>
            </tr>
        `;
        items.innerHTML += html;
    });

    totalPriceElement.innerHTML = `<span class="price">$ ${total.toFixed(2)}</span>`;
    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarContadorCarrito();
}

function actualizarCantidad(index, tipo) {
    if (tipo === "increase") {
        carrito[index].cantidad++;
    } else if (tipo === "decrease" && carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
    }
    renderCarrito();
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    renderCarrito();
}

items.addEventListener("click", (e) => {
    const index = e.target.dataset.index;

    if (e.target.classList.contains("increase-btn")) {
        actualizarCantidad(index, "increase");
    } else if (e.target.classList.contains("decrease-btn")) {
        actualizarCantidad(index, "decrease");
    } else if (e.target.classList.contains("remove-btn")) {
        eliminarProducto(index);
    }
});

finalizeBtn.addEventListener("click", () => {
    carrito.length = 0;
    renderCarrito();
    alert("Gracias por tu compra!");
});

renderCarrito();
