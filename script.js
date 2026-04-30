// DICCIONARIO COMPLETO LENORMAND (Nombre + Significado)
const cartasLenormand = {
    1: { nombre: "El Jinete", desc: "Noticias inminentes, mensajes, la llegada de algo o alguien nuevo." },
    2: { nombre: "El Trébol", desc: "Pequeña suerte, alegría pasajera, una oportunidad inesperada." },
    3: { nombre: "El Barco", desc: "Viajes, distancia, comercio, anhelos de cambio o aventuras." },
    4: { nombre: "La Casa", desc: "El hogar, la familia, estabilidad, intimidad y seguridad." },
    5: { nombre: "El Árbol", desc: "Salud, vitalidad, crecimiento lento pero seguro, karma." },
    6: { nombre: "Las Nubes", desc: "Confusión temporal, dudas, obstáculos pasajeros." },
    7: { nombre: "La Serpiente", desc: "Traición, mentiras, complicaciones, o una mujer inteligente." },
    8: { nombre: "El Ataúd", desc: "Finales, transformación radical, cierres necesarios." },
    9: { nombre: "El Ramo", desc: "Regalos, belleza, alegría, aprecio, una invitación feliz." },
    10: { nombre: "La Guadaña", desc: "Cortes repentinos, decisiones rápidas, peligro o advertencia." },
    11: { nombre: "El Látigo", desc: "Conflictos, discusiones repetitivas, estrés, actividad física." },
    12: { nombre: "Los Pájaros", desc: "Comunicaciones, charlas, chismes, estrés temporal, pareja." },
    13: { nombre: "La Niña", desc: "Nuevos comienzos, inocencia, algo pequeño, ingenuidad." },
    14: { nombre: "El Zorro", desc: "Trabajo, astucia, necesidad de precaución, posible engaño." },
    15: { nombre: "El Oso", desc: "Poder, finanzas, figura de autoridad o materna, fuerza." },
    16: { nombre: "Las Estrellas", desc: "Esperanza, inspiración, sueños cumplidos, éxito, internet." },
    17: { nombre: "La Cigüeña", desc: "Cambios positivos, mudanzas, mejoras, un nacimiento." },
    18: { nombre: "El Perro", desc: "Amistad, lealtad, confianza, un alma gemela o compañero." },
    19: { nombre: "La Torre", desc: "Instituciones, aislamiento, protección, autoridad, ambición." },
    20: { nombre: "El Jardín", desc: "Eventos sociales, el público, redes, fiestas, reuniones." },
    21: { nombre: "La Montaña", desc: "Obstáculos importantes, bloqueos, retrasos, desafíos." },
    22: { nombre: "El Camino", desc: "Decisiones, encrucijadas, opciones múltiples, libre albedrío." },
    23: { nombre: "Los Ratones", desc: "Estrés, ansiedad, pérdidas graduales, desgaste mental." },
    24: { nombre: "El Corazón", desc: "Amor, romance, pasión, afecto y felicidad emocional." },
    25: { nombre: "El Anillo", desc: "Compromiso, matrimonio, contratos, ciclos que se repiten." },
    26: { nombre: "El Libro", desc: "Secretos, conocimiento, estudios, proyectos aún ocultos." },
    27: { nombre: "La Carta", desc: "Documentos, correos, noticias escritas, mensajes oficiales." },
    28: { nombre: "El Caballero", desc: "El consultante masculino o un hombre importante en la lectura." },
    29: { nombre: "La Dama", desc: "La consultante femenina o una mujer importante en la lectura." },
    30: { nombre: "Los Lirios", desc: "Paz, sabiduría, madurez, sexualidad tranquila, invierno." },
    31: { nombre: "El Sol", desc: "Gran éxito, victoria, calor, energía positiva, triunfo absoluto." },
    32: { nombre: "La Luna", desc: "Emociones, intuición, reconocimiento, fama, romance profundo." },
    33: { nombre: "La Llave", desc: "Soluciones, éxito asegurado, destino, un descubrimiento vital." },
    34: { nombre: "Los Peces", desc: "Dinero, negocios, abundancia, flujo económico, independencia." },
    35: { nombre: "El Ancla", desc: "Estabilidad a largo plazo, seguridad, trabajo fijo (a veces estancamiento)." },
    36: { nombre: "La Cruz", desc: "Cargas, destino kármico, sufrimiento pasajero, religión." }
};
// Configuración de archivos
const totalCartas = 36;
const extension = ".png"; 
let carpetaActual = ""; // Ahora arranca vacía y se llena al elegir

// Función para elegir el mazo y cambiar de pantalla
function seleccionarMazo(nombreCarpeta) {
    carpetaActual = nombreCarpeta;
    
    // Ocultamos el inicio y mostramos el juego
    document.getElementById('pantalla-inicio').style.display = 'none';
    document.getElementById('pantalla-juego').style.display = 'block';
    
    // Limpiamos la mesa por si venía de otra lectura
    document.getElementById('contenedor-cartas').innerHTML = '<p style="color: #888;">Toca el botón para revelar tus cartas...</p>';
}

// Función para volver a la pantalla de selección
function volverInicio() {
    document.getElementById('pantalla-juego').style.display = 'none';
    document.getElementById('pantalla-inicio').style.display = 'block';
}

function repartir() {
    const btn = document.querySelector('#pantalla-juego button');
    btn.disabled = true;
    btn.innerText = "Revelando el destino...";

    let mazo = [];
    for (let i = 1; i <= totalCartas; i++) mazo.push(i);
    const seleccionadas = mazo.sort(() => Math.random() - 0.5).slice(0, 3);

    const contenedor = document.getElementById('contenedor-cartas');
    contenedor.innerHTML = ""; 
    contenedor.scrollLeft = 0; 
    seleccionadas.forEach((numero, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'carta-3d-wrapper';

        const inner = document.createElement('div');
        inner.className = 'carta-inner';

        const reverso = document.createElement('div');
        reverso.className = 'carta-cara carta-reverso';

        const anverso = document.createElement('div');
        anverso.className = 'carta-cara carta-anverso';
        const img = document.createElement('img');
        
        // ACÁ ESTÁ LA MAGIA: Usa la carpeta que el usuario eligió
        img.src = `${carpetaActual}${numero}${extension}`;
        img.alt = cartasLenormand[numero].nombre;
        anverso.appendChild(img);

        inner.appendChild(reverso);
        inner.appendChild(anverso);
        wrapper.appendChild(inner);

        const pNombre = document.createElement('p');
        pNombre.className = 'nombre-carta texto-oculto';
        pNombre.innerText = cartasLenormand[numero].nombre;
        wrapper.appendChild(pNombre);

        const pDesc = document.createElement('p');
        pDesc.className = 'desc-carta texto-oculto';
        pDesc.innerText = cartasLenormand[numero].desc;
        wrapper.appendChild(pDesc);
        
        contenedor.appendChild(wrapper);

        setTimeout(() => {
            inner.classList.add('volteada');
            pNombre.classList.add('texto-visible');
            pDesc.classList.add('texto-visible');
        }, 800 + (index * 1000));
    });

    setTimeout(() => {
        btn.disabled = false;
        btn.innerText = "Lanzar Cartas";
    }, 4000);
}