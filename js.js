// 1. LISTA DE PRODUCTOS (Edita aquí nombres, precios y rutas de tus fotos)
const productos = [
    {
        id: 1,
        nombre: "Mochila Tejida Classic",
        precio: 85000,
        imagen: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500"
    },
    {
        id: 2,
        nombre: "Bolso Trapillo Perlas",
        precio: 95000,
        imagen: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"
    },
    {
        id: 3,
        nombre: "Mochila Cordón Diseño",
        precio: 110000,
        imagen: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500"
    }
];

// 2. CONFIGURA TU NÚMERO DE WHATSAPP AQUÍ (57 + tu número de 10 dígitos, sin espacios ni +)
const telefonoTienda = "573000000000";

let carrito = [];

// Formato de pesos colombianos ($85.000)
function formatearPesos(valor) {
    return "$" + valor.toLocaleString("es-CO");
}

// Mostrar productos en la página
function mostrarCatalogo() {
    const contenedor = document.getElementById("catalogo");
    contenedor.innerHTML = "";

    productos.forEach(prod => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-producto");
        tarjeta.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <h3>${prod.nombre}</h3>
            <p class="precio">${formatearPesos(prod.precio)}</p>
            <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
        `;
        contenedor.appendChild(tarjeta);
    });
}

// Agregar producto al carrito
function agregarAlCarrito(idProducto) {
    const productoEncontrado = productos.find(p => p.id === idProducto);
    carrito.push(productoEncontrado);
    actualizarCarrito();
}

// Eliminar producto del carrito por su posición
function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    actualizarCarrito();
}

// Actualizar vista y total del carrito
function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const contador = document.getElementById("contador-carrito");
    const totalElemento = document.getElementById("total-precio");

    contador.textContent = carrito.length;
    lista.innerHTML = "";

    if (carrito.length === 0) {
        lista.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío.</p>';
        totalElemento.textContent = "$0";
        return;
    }

    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;
        const div = document.createElement("div");
        div.classList.add("item-carrito");
        div.innerHTML = `
            <div>
                <strong>${item.nombre}</strong><br>
                <small>${formatearPesos(item.precio)}</small>
            </div>
            <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">Quitar</button>
        `;
        lista.appendChild(div);
    });

    totalElemento.textContent = formatearPesos(total);
}

// Abrir o cerrar ventana del carrito
function toggleCarrito() {
    const modal = document.getElementById("modal-carrito");
    modal.classList.toggle("carrito-oculto");
    modal.classList.toggle("carrito-visible");
}

// Armar el mensaje y abrir WhatsApp
function enviarPedidoWhatsApp() {
    if (carrito.length === 0) {
        alert("Agrega al menos un producto al carrito antes de pedir.");
        return;
    }

    let mensaje = "¡Hola VALALAND! ✨ Quisiera hacer el siguiente pedido:\n\n";
    let total = 0;

    carrito.forEach(item => {
        mensaje += `• ${item.nombre} - ${formatearPesos(item.precio)}\n`;
        total += item.precio;
    });

    mensaje += `\n*Total a pagar: ${formatearPesos(total)}*`;
    mensaje += `\n\n¿Me confirmas disponibilidad y datos de pago (Nequi / Bancolombia)?`;

    const url = `https://wa.me/${telefonoTienda}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

// Iniciar tienda al cargar la página
mostrarCatalogo();