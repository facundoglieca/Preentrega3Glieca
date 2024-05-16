document.addEventListener("DOMContentLoaded", () => {
    const itemInput = document.getElementById("item");
    const agregarButton = document.getElementById("agregar");
    const listaItems = document.getElementById("lista-items");

    // Función para cargar items desde localStorage
    const cargarItems = () => {
        const itemsJSON = localStorage.getItem("items");
        return itemsJSON ? JSON.parse(itemsJSON) : [];
    };

    // Función para guardar items en localStorage
    const guardarItems = (items) => {
        localStorage.setItem("items", JSON.stringify(items));
    };

    // Función para renderizar items en el DOM
    const renderizarItems = () => {
        listaItems.innerHTML = "";
        const items = cargarItems();
        items.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = item;
            const eliminarButton = document.createElement("button");
            eliminarButton.textContent = "Eliminar";
            eliminarButton.addEventListener("click", () => {
                eliminarItem(index);
            });
            li.appendChild(eliminarButton);
            listaItems.appendChild(li);
        });
    };

    // Función para agregar un nuevo item
    const agregarItem = () => {
        const items = cargarItems();
        const nuevoItem = itemInput.value.trim();
        if (nuevoItem) {
            items.push(nuevoItem);
            guardarItems(items);
            renderizarItems();
            itemInput.value = "";
        }
    };

    // Función para eliminar un item
    const eliminarItem = (index) => {
        const items = cargarItems();
        items.splice(index, 1);
        guardarItems(items);
        renderizarItems();
    };

    // Event listener para el botón de agregar item
    agregarButton.addEventListener("click", agregarItem);

    // Renderizar los items al cargar la página
    renderizarItems();
});
