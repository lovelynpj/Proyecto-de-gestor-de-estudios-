document.addEventListener('DOMContentLoaded', () => {

    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const eventos = [];

    const hoy = new Date();

    let mesActual = hoy.getMonth();
    let anioActual = hoy.getFullYear();

    const grid = document.getElementById('calendario-grid');
    const titulo = document.getElementById('calendario-titulo');
    const btnAnterior = document.getElementById('mes-anterior');
    const btnSiguiente = document.getElementById('mes-siguiente');

    function formatearFecha(anio, mes, dia) {
        const mm = String(mes + 1).padStart(2, '0');
        const dd = String(dia).padStart(2, '0');
        return `${anio}-${mm}-${dd}`;
    }

    function renderizarCalendario(anio, mes) {
        grid.innerHTML = '';
        titulo.textContent = `${meses[mes]} ${anio}`;

        const primerDiaDelMes = new Date(anio, mes, 1);
        const ultimoDiaDelMes = new Date(anio, mes + 1, 0);
        const diasEnMes = ultimoDiaDelMes.getDate();

        // getDay(): 0 = domingo ... 6 = sábado. Convertimos para que la semana arranque en lunes.
        const primerDiaSemana = (primerDiaDelMes.getDay() + 6) % 7;

        // Días del mes anterior para completar la primera semana
        const diasMesAnterior = new Date(anio, mes, 0).getDate();
        for (let i = primerDiaSemana - 1; i >= 0; i--) {
            const dia = diasMesAnterior - i;
            grid.appendChild(crearCeldaDia(dia, true, false, false));
        }

        // Días del mes actual
        for (let dia = 1; dia <= diasEnMes; dia++) {
            const esHoy = (
                dia === hoy.getDate() &&
                mes === hoy.getMonth() &&
                anio === hoy.getFullYear()
            );
            const tieneEvento = eventos.includes(formatearFecha(anio, mes, dia));
            grid.appendChild(crearCeldaDia(dia, false, esHoy, tieneEvento));
        }

        // Días del mes siguiente para completar la última semana
        const celdasUsadas = primerDiaSemana + diasEnMes;
        const celdasRestantes = (7 - (celdasUsadas % 7)) % 7;
        for (let dia = 1; dia <= celdasRestantes; dia++) {
            grid.appendChild(crearCeldaDia(dia, true, false, false));
        }
    }

    function crearCeldaDia(dia, esOtroMes, esHoy, tieneEvento) {
        const celda = document.createElement('span');
        celda.classList.add('dia');
        if (esOtroMes) celda.classList.add('otro-mes');
        if (esHoy) celda.classList.add('hoy');
        if (tieneEvento) celda.classList.add('con-evento');
        celda.textContent = dia;
        return celda;
    }

    btnAnterior.addEventListener('click', () => {
        mesActual--;
        if (mesActual < 0) {
            mesActual = 11;
            anioActual--;
        }
        renderizarCalendario(anioActual, mesActual);
    });

    btnSiguiente.addEventListener('click', () => {
        mesActual++;
        if (mesActual > 11) {
            mesActual = 0;
            anioActual++;
        }
        renderizarCalendario(anioActual, mesActual);
    });

    renderizarCalendario(anioActual, mesActual);
});
