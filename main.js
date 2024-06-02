document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');

    // Función para cargar contenido dinámico
    function loadContent(section) {
        content.innerHTML = sections[section] || '<p>Sección no encontrada.</p>';
        if (section === 'agregar-apoderado') {
            initAgregarApoderado();
        }
    }

    // Secciones de contenido
    const sections = {
        'inicio': `
            <h2>Inicio</h2>
            <p>Bienvenido a la página de inicio.</p>
        `,
        'test-vocacional': `
            <h2>Test Vocacional</h2>
            <p>Aquí puedes realizar el test vocacional.</p>
        `,
        'agregar-apoderado': `
            <h2>Agregar Apoderado</h2>
            <form id="formUsuario" class="form-vertical">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" class="custom-input" required>
                
                <label for="edad">Edad:</label>
                <input type="number" id="edad" name="edad" class="custom-input" required>
                
                <label for="ciudad">Ciudad:</label>
                <input type="text" id="ciudad" name="ciudad" class="custom-input" required>
                
                <button type="submit">Guardar</button>
            </form>
            
            <h2>Datos de Usuario</h2>
            <table id="tablaUsuarios" class="styled-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Ciudad</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            
            <h2>Gráfico de Edades</h2>
            <canvas id="graficoUsuarios" width="400" height="200"></canvas>
        `,
        'incidencias': `
            <h2>Incidencias</h2>
            <p>Registro de incidencias.</p>
        `
    };

    // Inicializar eventos en los enlaces del sidebar
    document.querySelectorAll('.sidebar a').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const sectionId = event.currentTarget.id.replace('-link', '');
            window.location.hash = sectionId;
            loadContent(sectionId);
        });
    });

    // Cargar contenido inicial basado en el hash de la URL
    const initialHash = window.location.hash.replace('#', '');
    loadContent(initialHash || 'inicio');

    // Función para inicializar la sección "Agregar Apoderado"
    function initAgregarApoderado() {
        let datosUsuarios = [];

        // Si ya hay datos almacenados, los cargamos
        const datosGuardadosJSON = localStorage.getItem('datosUsuarios');
        if (datosGuardadosJSON) {
            datosUsuarios = JSON.parse(datosGuardadosJSON);
            actualizarTabla();
            crearGrafico();
        }

        // Capturar el evento de envío del formulario
        document.getElementById('formUsuario').addEventListener('submit', function(event) {
            event.preventDefault(); // Evitar el envío del formulario
            
            const nombre = document.getElementById('nombre').value;
            const edad = document.getElementById('edad').value;
            const ciudad = document.getElementById('ciudad').value;
            
            // Crear un nuevo objeto de datos del usuario
            const nuevoUsuario = {
                nombre: nombre,
                edad: parseInt(edad),
                ciudad: ciudad
            };
            
            // Agregar el nuevo objeto al array
            datosUsuarios.push(nuevoUsuario);
            
            // Almacenar el array actualizado en localStorage
            const datosUsuariosJSON = JSON.stringify(datosUsuarios);
            localStorage.setItem('datosUsuarios', datosUsuariosJSON);
            
            // Actualizar la tabla
            actualizarTabla();
            
            // Actualizar el gráfico
            crearGrafico();
            
            // Limpiar el formulario
            document.getElementById('formUsuario').reset();
        });

        function actualizarTabla() {
            const tbody = document.getElementById('tablaUsuarios').getElementsByTagName('tbody')[0];
            tbody.innerHTML = ''; // Limpiar el contenido existente
            
            // Llenar la tabla con los datos del array
            datosUsuarios.forEach(usuario => {
                const fila = document.createElement('tr');
                
                const celdaNombre = document.createElement('td');
                celdaNombre.textContent = usuario.nombre;
                celdaNombre.setAttribute('data-label', 'Nombre');
                fila.appendChild(celdaNombre);
                
                const celdaEdad = document.createElement('td');
                celdaEdad.textContent = usuario.edad;
                celdaEdad.setAttribute('data-label', 'Edad');
                fila.appendChild(celdaEdad);
                
                const celdaCiudad = document.createElement('td');
                celdaCiudad.textContent = usuario.ciudad;
                celdaCiudad.setAttribute('data-label', 'Ciudad');
                fila.appendChild(celdaCiudad);
                
                tbody.appendChild(fila);
            });

            // Mostrar los datos en la consola
            console.table(datosUsuarios);
        }

        function crearGrafico() {
            const ctx = document.getElementById('graficoUsuarios').getContext('2d');
            const edades = datosUsuarios.map(usuario => usuario.edad);
            const nombres = datosUsuarios.map(usuario => usuario.nombre);

            // Destruir el gráfico existente si existe
            if (window.myChart) {
                window.myChart.destroy();
            }

            window.myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: nombres,
                    datasets: [{
                        label: 'Edades de Usuarios',
                        data: edades,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    // Funcionalidades adicionales (modo oscuro y colapso de menú)
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    const topbar = document.querySelector('.topbar');
    const sidebar = document.querySelector('.sidebar');

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        topbar.classList.toggle('dark-mode');
        sidebar.classList.toggle('dark-mode');
        content.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });

    const menuToggle = document.getElementById('menu-toggle');
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        topbar.classList.toggle('collapsed');
        content.classList.toggle('collapsed');
    });
});
