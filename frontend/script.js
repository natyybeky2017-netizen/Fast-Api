// ======================================================
// VARIABLES
// ======================================================

let editingProductId = null;
let paginaActual = 1;
let categoriaSelecionada = "todos";


// ======================================================
// CARGAR PRODUCTOS
// ======================================================

async function cargarProductos() {

  const listaProductos = document.getElementById("listaProductos");

  try {

    const respuesta = await axios.get(
      "http://127.0.0.1:8000/productos"
    );

    const productos = respuesta.data;

    const campoBusqueda =
      document.getElementById("busquedaProducto");

    const textoBusqueda = campoBusqueda
      ? campoBusqueda.value.toLowerCase()
      : "";


    const productosFiltrados = productos.filter((producto) => {

      const nombre =
        (producto.nombre || "").toLowerCase();

      const coincideBusqueda =
        nombre.includes(textoBusqueda);


      const categoriaProducto =
        producto.categoria?.nombre?.toLowerCase() || "";


      const coincideCategoria =
        categoriaSelecionada === "todos" ||

        (categoriaSelecionada === "pendientes" &&
          categoriaProducto === "pendientes") ||

        (categoriaSelecionada === "anillos" &&
          categoriaProducto === "anillos") ||

        (categoriaSelecionada === "pulseras" &&
          categoriaProducto === "pulseras") ||

        (categoriaSelecionada === "collares" &&
          categoriaProducto === "collares");


      return coincideBusqueda && coincideCategoria;

    });


    // ==================================================
    // PAGINACIÓN
    // ==================================================

    const productosPorPagina = 3;

    const totalPaginas =
      Math.ceil(
        productosFiltrados.length /
        productosPorPagina
      );


    if (
      totalPaginas > 0 &&
      paginaActual > totalPaginas
    ) {
      paginaActual = totalPaginas;
    }


    const inicio =
      (paginaActual - 1) *
      productosPorPagina;

    const fin =
      inicio + productosPorPagina;


    const productosPagina =
      productosFiltrados.slice(
        inicio,
        fin
      );


    listaProductos.innerHTML = "";


    // ==================================================
    // TARJETAS
    // ==================================================

    productosPagina.forEach((producto) => {

      const categoria =
        producto.categoria?.nombre ||
        "Sin categoría";


      const card =
        document.createElement("article");


      card.className =
        "group flex flex-col bg-[#FDFBF7] border border-[#E8E2D5] overflow-hidden";


      card.innerHTML = `

        <div
          class="relative w-full aspect-[3/4] bg-[#F5F2EB] overflow-hidden"
        >

          <div
            class="w-full h-full bg-cover bg-center"
            style="background-image: url('images/${producto.imagen || ""}')"
          ></div>

        </div>


        <div class="p-space-md bg-[#FDFBF7]">

          <span
            class="font-label-sm text-label-sm text-[#6E675F] uppercase tracking-widest"
          >
            ${categoria} · ${producto.material || "Material no informado"}
          </span>


          <h3
            class="font-headline-sm text-headline-sm text-[#1C1A17] font-normal mt-1"
          >
            ${producto.nombre}
          </h3>


          <p class="text-sm text-[#6E675F] mt-2">
            ${producto.descripcion || ""}
          </p>


          <div
            class="mt-space-md pt-space-xs border-t border-[#E8E2D5]/50"
          >

            <div class="flex items-baseline justify-between">

              <span
                class="font-price-display text-price-display text-primary font-semibold"
              >
                $${Number(producto.precio).toFixed(2)}
              </span>

              <span
                class="font-label-sm text-label-sm text-[#6E675F] uppercase"
              >
                Stock: ${producto.stock}
              </span>

            </div>


            <button
              class="editarProducto mt-4 w-full border border-[#1C1A17] py-2 text-sm uppercase tracking-widest"
              data-id="${producto.id}"
            >
              Editar
            </button>


            <button
              class="eliminarProducto mt-2 w-full border border-red-600 text-red-600 py-2 text-sm uppercase tracking-widest"
              data-id="${producto.id}"
            >
              Eliminar
            </button>

          </div>

        </div>

      `;


      listaProductos.appendChild(card);

    });


    // ==================================================
    // PAGINACIÓN
    // ==================================================

    if (totalPaginas > 1) {

      const controles =
        document.createElement("div");


      controles.className =
        "col-span-full flex justify-center items-center gap-4 mt-6";


      controles.innerHTML = `

        <button
          id="paginaAnterior"
          class="border border-[#1C1A17] px-4 py-2 text-sm uppercase tracking-widest"
          ${paginaActual === 1 ? "disabled" : ""}
        >
          ← Anterior
        </button>


        <span class="text-sm">
          Página ${paginaActual} de ${totalPaginas}
        </span>


        <button
          id="paginaSiguiente"
          class="border border-[#1C1A17] px-4 py-2 text-sm uppercase tracking-widest"
          ${paginaActual === totalPaginas ? "disabled" : ""}
        >
          Siguiente →
        </button>

      `;


      listaProductos.appendChild(controles);


      document
        .getElementById("paginaAnterior")
        .addEventListener("click", () => {

          if (paginaActual > 1) {

            paginaActual--;

            cargarProductos();

          }

        });


      document
        .getElementById("paginaSiguiente")
        .addEventListener("click", () => {

          if (paginaActual < totalPaginas) {

            paginaActual++;

            cargarProductos();

          }

        });

    }


  } catch (error) {

    console.error(
      "Error al cargar productos:",
      error
    );


    listaProductos.innerHTML = `

      <p class="text-red-600 col-span-full text-center">
        No se pudieron cargar los productos.
      </p>

    `;

  }

}


// ======================================================
// FORMULARIO
// ======================================================

const formularioProducto =
  document.getElementById(
    "formularioProducto"
  );


const botonNuevoProducto =
  document.getElementById(
    "btnNuevoProducto"
  );


const botonCancelarProducto =
  document.getElementById(
    "cancelarProducto"
  );


const botonGuardarProducto =
  document.getElementById(
    "guardarProducto"
  );


// ======================================================
// NUEVO PRODUCTO
// ======================================================

botonNuevoProducto.addEventListener("click", function () {
    formularioProducto.hidden = false;
    formularioProducto.style.display = "flex";

    editingProductId = null;
});


// ======================================================
// CANCELAR
// ======================================================


botonCancelarProducto.addEventListener(
  "click",
  function () {

    formularioProducto.hidden = true;
    formularioProducto.style.display = "none";

    editingProductId = null;

  }
);




// ======================================================
// EDITAR
// ======================================================

document.addEventListener(
  "click",
  async function (event) {

    if (
      !event.target.classList.contains(
        "editarProducto"
      )
    ) {
      return;
    }


    const id =
      event.target.dataset.id;


    editingProductId =
      Number(id);


    try {

      const respuesta =
        await axios.get(
          `http://127.0.0.1:8000/productos/${id}`
        );


      const producto =
        respuesta.data;


      formularioProducto.hidden =
        false;


      document.getElementById(
        "nombreProducto"
      ).value =
        producto.nombre || "";


      document.getElementById(
        "descripcionProducto"
      ).value =
        producto.descripcion || "";


      document.getElementById(
        "precioProducto"
      ).value =
        producto.precio;


      document.getElementById(
        "materialProducto"
      ).value =
        producto.material || "";


      document.getElementById(
        "imagenProducto"
      ).value =
        producto.imagen || "";


      document.getElementById(
        "stockProducto"
      ).value =
        producto.stock;


      document.getElementById(
        "categoriaProducto"
      ).value =
        producto.id_categoria;


    } catch (error) {

      console.error(
        "Error al cargar el producto:",
        error
      );


      alert(
        "No se pudo cargar el producto"
      );

    }

  }
);


// ======================================================
// ELIMINAR
// ======================================================

document.addEventListener(
  "click",
  async function (event) {

    if (
      !event.target.classList.contains(
        "eliminarProducto"
      )
    ) {
      return;
    }


    const id =
      event.target.dataset.id;


    const confirmar =
      confirm(
        "¿Seguro que quieres eliminar este producto?"
      );


    if (!confirmar) {
      return;
    }


    try {

      await axios.delete(
        `http://127.0.0.1:8000/productos/${id}`
      );


      alert(
        "Producto eliminado correctamente"
      );


      cargarProductos();


    } catch (error) {

      console.error(
        "Error al eliminar:",
        error
      );


      alert(
        "No se pudo eliminar el producto"
      );

    }

  }
);


// ======================================================
// GUARDAR
// ======================================================

botonGuardarProducto.addEventListener(
  "click",
  async function () {


    const nuevoProducto = {

      nombre:
        document.getElementById(
          "nombreProducto"
        ).value,


      descripcion:
        document.getElementById(
          "descripcionProducto"
        ).value,


      precio:
        Number(
          document.getElementById(
            "precioProducto"
          ).value
        ),


      material:
        document.getElementById(
          "materialProducto"
        ).value,


      imagen:
        document.getElementById(
          "imagenProducto"
        ).value,


      stock:
        Number(
          document.getElementById(
            "stockProducto"
          ).value
        ),


      id_categoria:
        Number(
          document.getElementById(
            "categoriaProducto"
          ).value
        )

    };


    // ================================================
    // EDITAR
    // ================================================

    if (
      editingProductId !== null
    ) {

      try {

        await axios.put(
          `http://127.0.0.1:8000/productos/${editingProductId}`,
          nuevoProducto
        );


        alert(
          "Producto actualizado correctamente"
        );


        formularioProducto.hidden =
          true;


        editingProductId =
          null;


        cargarProductos();


      } catch (error) {

        console.error(
          "Error al actualizar:",
          error
        );


        alert(
          "No se pudo actualizar el producto"
        );

      }


      return;

    }


    // ================================================
    // CREAR
    // ================================================

    try {

      await axios.post(
        "http://127.0.0.1:8000/productos",
        nuevoProducto
      );


      alert(
        "Producto creado correctamente"
      );


      formularioProducto.hidden =
        true;


      document.getElementById(
        "nombreProducto"
      ).value = "";


      document.getElementById(
        "descripcionProducto"
      ).value = "";


      document.getElementById(
        "precioProducto"
      ).value = "";


      document.getElementById(
        "materialProducto"
      ).value = "";


      document.getElementById(
        "imagenProducto"
      ).value = "";


      document.getElementById(
        "stockProducto"
      ).value = "";


      document.getElementById(
        "categoriaProducto"
      ).value = "";


      cargarProductos();


    } catch (error) {

      console.error(
        "Error al crear:",
        error
      );


      alert(
        "No se pudo crear el producto"
      );

    }

  }
);


// ======================================================
// CATEGORÍAS
// ======================================================

const botonesCategoria =
  document.querySelectorAll(
    ".category-pill"
  );


botonesCategoria.forEach(
  (boton) => {

    boton.addEventListener(
      "click",
      function () {

        paginaActual = 1;


        categoriaSelecionada =
          boton.dataset.cat;


        cargarProductos();

      }
    );

  }
);


// ======================================================
// BUSCADOR
// ======================================================

const busquedaProducto =
  document.getElementById(
    "busquedaProducto"
  );


if (busquedaProducto) {

  busquedaProducto.addEventListener(
    "input",
    function () {

      paginaActual = 1;

      cargarProductos();

    }
  );

}


// ======================================================
// BOTÓN DE BÚSQUEDA DEL HEADER
// ======================================================

const botonBuscar =
  document.getElementById(
    "botonBuscar"
  );


if (botonBuscar) {

  botonBuscar.addEventListener(
    "click",
    function () {

      busquedaProducto.focus();

    }
  );

}


// ======================================================
// MENÚ ☰
// ======================================================

const botonMenu =
  document.getElementById(
    "botonMenu"
  );


const menuDesplegable =
  document.getElementById(
    "menuDesplegable"
  );


if (
  botonMenu &&
  menuDesplegable
) {

  botonMenu.addEventListener(
    "click",
    function () {

      menuDesplegable.classList.toggle(
        "hidden"
      );

    }
  );

}


// ======================================================
// BUSCAR DESDE EL MENÚ
// ======================================================

const botonesMenu =
  menuDesplegable
    ? menuDesplegable.querySelectorAll(
        "button"
      )
    : [];


if (botonesMenu.length > 0) {

  botonesMenu[0].addEventListener(
    "click",
    function () {

      menuDesplegable.classList.add(
        "hidden"
      );


      busquedaProducto.focus();

    }
  );

}


// ======================================================
// BUSCAR DESDE LA BARRA INFERIOR
// ======================================================

const botonBuscarResponsive =
  document.getElementById(
    "botonBuscarResponsive"
  );


if (botonBuscarResponsive) {

  botonBuscarResponsive.addEventListener(
    "click",
    function () {

      busquedaProducto.focus();

      busquedaProducto.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }
  );

}


// ======================================================
// INICIAR
// ======================================================

cargarProductos();