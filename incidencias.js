document.addEventListener('DOMContentLoaded', () => {
    const incidenciaForm = document.getElementById('incidenciaForm');
    const incidenciasTableBody = document.getElementById('incidenciasTableBody');

    // Función para guardar incidencias en localStorage
    function saveIncidenciasToLocalStorage(incidencias) {
        localStorage.setItem('incidencias', JSON.stringify(incidencias));
    }

    // Función para cargar incidencias desde localStorage
    function loadIncidenciasFromLocalStorage() {
        const incidencias = localStorage.getItem('incidencias');
        return incidencias ? JSON.parse(incidencias) : [];
    }

    // Función para renderizar las incidencias en la tabla
    function renderIncidenciasTable(incidencias) {
        incidenciasTableBody.innerHTML = '';
        incidencias.forEach(incidencia => {
            const newRow = incidenciasTableBody.insertRow();
            newRow.innerHTML = `
                <td>${incidencia['nombre-colegio']}</td>
                <td>${incidencia['descripcion-incidencia']}</td>
                <td>${new Date(incidencia.fecha).toLocaleString()}</td>
            `;
        });
    }

    // Cargar y renderizar incidencias al iniciar la página
    const incidencias = loadIncidenciasFromLocalStorage();
    renderIncidenciasTable(incidencias);

    // Manejar el evento de envío del formulario de incidencias
    incidenciaForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nuevaIncidencia = {
            fecha: new Date().toISOString()
        };

        const inputs = incidenciaForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            nuevaIncidencia[input.name] = input.value;
        });

        incidencias.push(nuevaIncidencia);

        saveIncidenciasToLocalStorage(incidencias);
        renderIncidenciasTable(incidencias);

        incidenciaForm.reset();
    });
});
