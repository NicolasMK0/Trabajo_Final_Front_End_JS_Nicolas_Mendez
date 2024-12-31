let productos = [];

const cargarProductos = async () => {
  try {
    const response = await fetch("productos.json");
    productos = await response.json();
    mostrarProductos();
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
};

const mostrarProductos = () => {
  const listadoProductos = document.querySelector(".listado-productos");
  productos.forEach((producto) => {
    const html = `
      <article data-id="${producto.id}" data-nombre="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <img src="${producto.imagen}" alt="${producto.nombre}" />
        <p>${producto.descripcion}</p>
        <p>$ ${producto.precio}</p>
        <button type="button" class="btn-agregar">Agregar</button>
      </article>
    `;
    listadoProductos.innerHTML += html;
  });
};

cargarProductos();

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-agregar")) {
    const id = event.target.closest("article").dataset.id;
    const index = carrito.findIndex((item) => item.id == id);

    if (index == -1) {
      const elemento = productos.find((producto) => producto.id == id);
      const { nombre, precio } = elemento;
      const producto = {
        id: id,
        nombre: nombre,
        precio: precio,
        cantidad: 1,
      };
      carrito.push(producto);
    } else {
      carrito[index].cantidad++;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Llamamos a la función que actualiza el contador en el navbar
    actualizarContadorCarrito();
  }
});
