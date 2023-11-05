
document.addEventListener("DOMContentLoaded", function () {
    const cursos = document.querySelectorAll('.curso');

    cursos.forEach((curso) => {
        const cursoButton = curso.querySelector('a.btn');
        const cursoUnidades = curso.querySelector('.curso-unidades');
        const cursoId = curso.getAttribute('id');
        const completado = cursoButton.getAttribute('data-completado');

        if (completado === "true") {
            cursoButton.textContent = "Darse de baja";
            cursoButton.classList.remove("btn-primary");
            cursoButton.classList.add("btn-danger");
        } else {
            cursoButton.textContent = "Inscribirse";
            cursoButton.classList.remove("btn-danger");
            cursoButton.classList.add("btn-primary");
        }

        cursoButton.addEventListener('click', function (event) {
            event.preventDefault();
            toggleInscripcion(cursoButton, cursoUnidades, cursoId);
        });

        actualizarProgreso(cursoId);

        // Agregar el curso completado a la lista de Cursos Completados
        const cursosCompletadosList = document.getElementById("cursos-completados-list");
        const nombreCurso = curso.querySelector('h3').textContent;
      
        const cursoCompletoItem = document.createElement("div");
        cursoCompletoItem.classList.add("col-md-4", "curso-completado");
        cursoCompletoItem.innerHTML = `<p>${nombreCurso}</p><button class="btn btn-primary btn-descargar" id="descargar-${cursoId}">Descargar Certificado</button>`;
      
        cursosCompletadosList.appendChild(cursoCompletoItem);
    });
});


function toggleInscripcion(cursoId) {
    const unidadesContainer = document.getElementById(`${cursoId}-unidades`);
    const cursoButton = document.querySelector(`[data-curso="${cursoId}"]`);
    const checkboxes = document.querySelectorAll(`#${cursoId}-unidades input[type="checkbox"]`);

    if (!unidadesContainer || !cursoButton) {
        console.log('Elementos no encontrados');
        return;
    }

    if (cursoButton.getAttribute("data-completado") === "true") {
        // Evita cambios si el curso ya está completado
        
        return;
    }

    if (unidadesContainer.style.display === "none" || unidadesContainer.style.display === "") {
        unidadesContainer.style.display = "block";
        cursoButton.textContent = "Darse de baja";
        cursoButton.classList.remove("btn-primary");
        cursoButton.classList.add("btn-danger");
        cursoButton.setAttribute("data-completado", "false");
    } else {
        // Solo cambia a "Inscribirse" si no se ha completado el curso
        const cursoCompletado = checkboxes.length === 0 || checkboxes.length === 0 || checkboxes[0].disabled;

        if (!cursoCompletado) {
            unidadesContainer.style.display = "none";
            cursoButton.textContent = "Inscribirse";
            cursoButton.classList.remove("btn-danger");
            cursoButton.classList.add("btn-primary");
            cursoButton.setAttribute("data-completado", "false");
        }
    }

    // Desmarca todos los checkboxes dentro de este curso
    constcheckboxes = unidadesContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });

    actualizarProgreso(cursoId);
}




function actualizarProgreso(cursoId) {
    const unidades = document.querySelectorAll(`#${cursoId}-unidades input[type="checkbox"]`);
    const progressBar = document.getElementById(`${cursoId}-progress`);
    const completoMsg = document.getElementById(`${cursoId}-completo`);
    const totalUnidades = unidades.length;
    let unidadesCompletadas = 0;

    unidades.forEach((unidad) => {
        if (unidad.checked) {
            unidadesCompletadas++;
        }
    });

    const progreso = (unidadesCompletadas / totalUnidades) * 100;
    progressBar.style.width = progreso + "%";
    progressBar.setAttribute("aria-valuenow", progreso);

    if (unidadesCompletadas === totalUnidades) {
        completoMsg.style.display = "block";

        const cursoButton = document.querySelector(`[data-curso="${cursoId}"]`);
        if (cursoButton) {
            cursoButton.textContent = "Completado";
            cursoButton.classList.remove("btn-primary", "btn-danger");
            cursoButton.classList.add("btn-success");
            cursoButton.removeAttribute("onclick");
            cursoButton.disabled = true; // Deshabilitar el botón "Completado"

            unidades.forEach((unidad) => {
                unidad.disabled = true; // Deshabilitar los checkboxes cuando se completa el curso
            });
        }

        const cursosCompletadosSection = document.getElementById("cursos-completados");
        cursosCompletadosSection.style.display = "block";

        // Agregar el curso completado a la lista de Cursos Completados
        const cursosCompletadosList = document.getElementById("cursos-completados-list");
        const nombreCurso = document.querySelector(`#${cursoId} h3`).textContent; // Obtiene el nombre del curso
        
        const cursoCompletoItem = document.createElement("div");
        cursoCompletoItem.classList.add("col-md-4", "curso-completado");
        cursoCompletoItem.innerHTML = `<p>${nombreCurso}</p><button class="btn btn-primary btn-descargar" id="descargar-${cursoId}">Descargar Certificado</button>`;
        
        cursosCompletadosList.appendChild(cursoCompletoItem);
    }
}


