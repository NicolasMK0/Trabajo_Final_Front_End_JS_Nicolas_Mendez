function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contador = carrito.reduce((total, item) => total + item.cantidad, 0); 
    document.getElementById("cart-count").textContent = contador;
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
});
