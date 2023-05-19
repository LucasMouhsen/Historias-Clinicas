// Obtén los elementos del formulario
const searchInput = document.getElementById('searchInput');
const tr = document.querySelectorAll('#tr');
const fila = document.getElementById('fila');

// Agrega un evento de escucha al botón de búsqueda
function removeDiacritics(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


window.addEventListener('load', () => {
    searchInput.addEventListener('input', (e) => {
        e.preventDefault();

        const searchTerm = removeDiacritics(searchInput.value.toLowerCase());
        
        tr.forEach((tdDatos, index) => {
            const normalizedText = removeDiacritics(tdDatos.textContent.toLowerCase());
            if (normalizedText.includes(searchTerm)) {
                fila.children[index].classList.remove('filtro');
            } else {
                fila.children[index].classList.add('filtro');
            }
        });
    });
});
