document.addEventListener('DOMContentLoaded', function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    let cartCount = 0;

    function updateCartCount() {
        document.getElementById('cart-count').innerText = cartCount;
    }

    document.addEventListener('click', function (event) {
        if (event.target && event.target.matches('.add-to-cart')) {
            cartCount++;
            updateCartCount();
        }
    });
});
// esto servira mejor mas adelante