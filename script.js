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
const extension = ".webp"; 
let carpetaActual = ""; // Ahora arranca vacía y se llena al elegir
let tiradaActual = "three";
let lecturaActual = null;

const SPREADS = {
    // Agrega futuras tiradas aquí manteniendo la misma estructura.
    one: {
        name: "Una carta",
        count: 1,
        positions: ["Respuesta"]
    },
    two: {
        name: "Dos Cartas",
        count: 2,
        positions: ["Situacion", "Influencia"]
    },
    three: {
        name: "Tres Cartas",
        count: 3,
        positions: ["Pasado", "Presente", "Futuro"]
    },
    cross: {
        name: "Cruz lenormand",
        count: 5,
        positions: [
            "Arriba: Mayor influencia",
            "Izquierda: Pasado o raiz",
            "Centro: Situacion actual",
            "Derecha: Desarollo ofuturo",
            "Abajo: Base, resultado o consejo"
        ]
    },
    tableau: {
        name: "Grand Tableau",
        count: 36,
        positions: []
    }
};

const DECK_NAMES = {
    "img/Navegante/": "Mazo Navegante",
    "img/Gotico/": "Mazo Gotico",
    "img/Encantado/": "Mazo Encantado",
    "img/Rosa/": "Mazo Rosa",
    "img/BuenosAires/": "Mazo Buenos Aires"
};

// Función para elegir el mazo y cambiar de pantalla
function seleccionarMazo(nombreCarpeta) {
    carpetaActual = nombreCarpeta;
    lecturaActual = null;
    limpiarDetalleTableau();
    
    // Ocultamos el inicio y mostramos el juego
    document.getElementById('pantalla-inicio').style.display = 'none';
    document.getElementById('pantalla-juego').style.display = 'block';
    actualizarBotonesTirada();
    
    // Limpiamos la mesa por si venía de otra lectura
    document.getElementById('contenedor-cartas').innerHTML = '<p style="color: #888;">Toca el botón para revelar tus cartas...</p>';
    actualizarResumenLectura();
    actualizarEstadoExportacion();
}

// Función para volver a la pantalla de selección
function volverInicio() {
    document.getElementById('pantalla-juego').style.display = 'none';
    document.getElementById('pantalla-inicio').style.display = 'block';
    lecturaActual = null;
    limpiarDetalleTableau();
    document.getElementById('contenedor-cartas').innerHTML = '<p style="color: #888;">Toca el botón para revelar tus cartas...</p>';
    actualizarResumenLectura();
    actualizarEstadoExportacion();
}

function seleccionarTirada(type) {
    if (!SPREADS[type]) return;

    tiradaActual = type;
    actualizarBotonesTirada();
    limpiarDetalleTableau();
}

function actualizarBotonesTirada() {
    const botones = document.querySelectorAll('.btn-tirada');
    botones.forEach((boton) => {
        const activa = boton.dataset.spread === tiradaActual;
        boton.classList.toggle('activo', activa);
        boton.setAttribute('aria-pressed', activa ? 'true' : 'false');
    });
}

function getRandomCards(count) {
    const mazo = [];
    for (let i = 1; i <= totalCartas; i++) mazo.push(i);

    for (let i = mazo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
    }

    return mazo.slice(0, count);
}

function repartir() {
    const btn = document.getElementById('btn-lanzar');
    const spreadType = SPREADS[tiradaActual] ? tiradaActual : "three";
    const spread = SPREADS[spreadType];

    btn.disabled = true;
    btn.innerText = "Revelando el destino...";

    const contenedor = document.getElementById('contenedor-cartas');
    contenedor.innerHTML = "";
    contenedor.scrollLeft = 0;
    limpiarDetalleTableau();

    const seleccionadas = getRandomCards(spread.count);
    lecturaActual = {
        deckName: getDeckName(),
        spreadType,
        spreadName: spread.name,
        cards: seleccionadas
    };
    actualizarResumenLectura();
    renderSpread(seleccionadas, spreadType);
    actualizarEstadoExportacion();

    const tiempoDesbloqueo = 1800 + (Math.max(spread.count - 1, 0) * 160);
    setTimeout(() => {
        btn.disabled = false;
        btn.innerText = "Lanzar Cartas";
    }, tiempoDesbloqueo);
}

function renderSpread(cards, type) {
    if (type === "cross") {
        renderCross(cards);
        return;
    }

    if (type === "tableau") {
        renderTableau(cards);
        return;
    }

    const contenedor = document.getElementById('contenedor-cartas');
    contenedor.className = `mazo-container tirada-${type}`;

    cards.forEach((number, index) => {
        const position = SPREADS[type].positions[index] || "";
        contenedor.appendChild(renderCard(number, position, index));
    });
}

function renderCard(number, position, index = 0, compacta = false) {
    const carta = cartasLenormand[number];
    const wrapper = document.createElement('div');
    wrapper.className = `carta-3d-wrapper carta-lectura${compacta ? ' carta-lectura-compacta' : ''}`;
    wrapper.dataset.cardNumber = number;

    if (position) {
        const posicion = document.createElement('div');
        posicion.className = 'posicion-carta';
        posicion.innerText = position;
        wrapper.appendChild(posicion);
    }

    const inner = document.createElement('div');
    inner.className = 'carta-inner';

    const reverso = document.createElement('div');
    reverso.className = 'carta-cara carta-reverso';

    const anverso = document.createElement('div');
    anverso.className = 'carta-cara carta-anverso';

    const img = document.createElement('img');
    img.src = `${carpetaActual}${number}${extension}`;
    img.alt = carta.nombre;

    const placeholder = document.createElement('div');
    placeholder.className = 'carta-placeholder';
    placeholder.innerHTML = `<strong>${carta.nombre}</strong><span>Imagen no disponible</span>`;
    placeholder.style.display = 'none';

    img.onerror = () => {
        img.style.display = 'none';
        placeholder.style.display = 'flex';
    };

    anverso.appendChild(img);
    anverso.appendChild(placeholder);
    inner.appendChild(reverso);
    inner.appendChild(anverso);
    wrapper.appendChild(inner);

    const nombre = document.createElement('p');
    nombre.className = 'nombre-carta texto-visible';
    nombre.innerText = carta.nombre;
    wrapper.appendChild(nombre);

    const desc = document.createElement('p');
    desc.className = 'desc-carta texto-visible';
    desc.innerText = carta.desc;
    wrapper.appendChild(desc);

    setTimeout(() => {
        inner.classList.add('volteada');
        nombre.classList.add('texto-visible');

        const descripcion = wrapper.querySelector('.desc-carta');
        if (descripcion) descripcion.classList.add('texto-visible');
    }, 800 + (index * 160));

    return wrapper;
}

function renderCross(cards) {
    const contenedor = document.getElementById('contenedor-cartas');
    contenedor.className = 'mazo-container tirada-cruz';

    const positions = ['cross-top', 'cross-left', 'cross-center', 'cross-right', 'cross-bottom'];

    cards.forEach((number, index) => {
        const card = renderCard(number, SPREADS.cross.positions[index], index);
        card.classList.add(positions[index]);
        contenedor.appendChild(card);
    });
}

function renderTableau(cards) {
    const contenedor = document.getElementById('contenedor-cartas');
    contenedor.className = 'mazo-container tirada-tableau';

    cards.forEach((number, index) => {
        const card = renderCard(number, "", index, true);
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Ver detalle de ${cartasLenormand[number].nombre}`);
        card.addEventListener('click', () => mostrarDetalleTableau(number, card));
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                mostrarDetalleTableau(number, card);
            }
        });
        contenedor.appendChild(card);
    });
}

function limpiarDetalleTableau() {
    const detalle = document.getElementById('detalle-tableau');
    if (!detalle) return;

    detalle.hidden = true;
    detalle.innerHTML = "";
    document.querySelectorAll('.tirada-tableau .carta-seleccionada').forEach((card) => {
        card.classList.remove('carta-seleccionada');
    });
}

function mostrarDetalleTableau(number, selectedCard) {
    const detalle = document.getElementById('detalle-tableau');
    const carta = cartasLenormand[number];
    if (!detalle || !carta) return;

    document.querySelectorAll('.tirada-tableau .carta-seleccionada').forEach((card) => {
        card.classList.remove('carta-seleccionada');
    });

    selectedCard.classList.add('carta-seleccionada');
    detalle.hidden = false;
    detalle.innerHTML = `
        <p class="detalle-tableau-etiqueta">Carta seleccionada</p>
        <h3>${carta.nombre}</h3>
        <p>${carta.desc}</p>
    `;
}

function getDeckName() {
    return DECK_NAMES[carpetaActual] || "Mazo Lenormand";
}

function actualizarResumenLectura() {
    const encabezado = document.getElementById('lectura-encabezado');

    if (!lecturaActual) {
        encabezado.hidden = true;
        encabezado.innerHTML = "";
        return;
    }

    encabezado.hidden = false;
    encabezado.innerHTML = `
        <p class="lectura-etiqueta">${lecturaActual.deckName}</p>
        <h2>${lecturaActual.spreadName}</h2>
        <p class="lectura-subtitulo">${lecturaActual.cards.length} carta${lecturaActual.cards.length === 1 ? "" : "s"} revelada${lecturaActual.cards.length === 1 ? "" : "s"}</p>
    `;
}

function actualizarEstadoExportacion() {
    const hayLectura = Boolean(lecturaActual);
    const acciones = document.getElementById('acciones-exportacion');
    acciones.hidden = !hayLectura;
}

function construirNombreArchivo(extensionArchivo) {
    if (!lecturaActual) return `lenormand-tirada-mazo.${extensionArchivo}`;

    const slugify = (value) => value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase();

    const spreadSlug = slugify(lecturaActual.spreadName || "tirada");
    const deckSlug = slugify(lecturaActual.deckName || "mazo");

    return `lenormand-${spreadSlug || "tirada"}-${deckSlug || "mazo"}.${extensionArchivo}`;
}

async function esperarRecursosLectura() {
    const lectura = document.getElementById('contenedor-cartas');
    const imagenes = Array.from(lectura.querySelectorAll('img'));
    const cargas = imagenes.map((img) => {
        if (img.complete) return Promise.resolve();

        return new Promise((resolve) => {
            img.addEventListener('load', resolve, { once: true });
            img.addEventListener('error', resolve, { once: true });
        });
    });

    await Promise.all(cargas);
}

async function capturarLectura() {
    const lectura = document.getElementById('contenedor-cartas');

    if (!lectura || !lectura.querySelector('img')) {
        alert("Primero generá una tirada.");
        return null;
    }

    if (!window.html2canvas) {
        throw new Error("html2canvas no esta disponible.");
    }

    await esperarRecursosLectura();

    lectura.classList.add('exportando');

    try {
        const canvas = await html2canvas(lectura, {
            backgroundColor: "#fbf6ec",
            scale: 2,
            useCORS: true,
            logging: false,
            onclone: (doc) => {
                const clonedResult = doc.getElementById('contenedor-cartas');
                if (clonedResult) {
                    clonedResult.classList.add('exportando');
                }

                doc.querySelectorAll('.carta-inner').forEach((inner) => {
                    inner.classList.add('volteada');
                });

                doc.querySelectorAll('.texto-oculto').forEach((textNode) => {
                    textNode.classList.add('texto-visible');
                });
            }
        });

        return canvas;
    } finally {
        lectura.classList.remove('exportando');
    }
}

async function exportReadingAsImage() {
    try {
        const canvas = await capturarLectura();
        if (!canvas) return;

        const blob = await new Promise((resolve) => {
            canvas.toBlob(resolve, 'image/png');
        });

        if (!blob) {
            throw new Error("No se pudo crear la imagen PNG.");
        }

        const imageUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = construirNombreArchivo('png');
        link.href = imageUrl;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(imageUrl), 1000);
    } catch (error) {
        console.error(error);
        alert("No pude generar la imagen en este momento.");
    }
}

actualizarBotonesTirada();
actualizarEstadoExportacion();
