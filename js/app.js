const bancoPreguntas = [
  {
    pregunta: " ¿En que famosa saga de videjuegos aparece el personaje Franklin Clinton? ",
    opciones: ["Grand Theft Auto","Assasin's Creed","Pokémon","God Of War"],
    correcta: 0,
    dificultad:"facil",
    imagen: null,
    audio: null,
    extra: false
  },
  {
    pregunta: " ¿En que año ganó España su primer Mundial de Fútbol? ",
    opciones: ["2000", "2008", "2010", "2018"],
    correcta: 2 ,// Es la B (IlloJuan)
    dificultad: "facil",
    imagen: null,
    audio: null,
    extra: false
  },
  {
    pregunta: " ¿De que videjuego es esta imagen?  ",
    opciones: ["Lethal Company", "Stardew Valley", "Valorant", "Balatro"],
    correcta: 3 ,// Es la B (IlloJuan)
    dificultad: "facil",
    imagen: "js/Captura4_20260407_032247_0000.png",
    audio: null,
    extra: false
  },
  {
    pregunta: "  ¿En qué película aparece la frase “Hakuna Matata”? ",
    opciones: ["Aladdin", "El Rey León", "Hércules", "Tarzán"],
    correcta: 1 ,// Es la B (IlloJuan)
    dificultad: "facil",
    imagen: null,
    audio: null,
    extra: false
  },
  {
    pregunta: "  ¿De que personaje es este audio?  ",
    opciones: ["Sora", "Goomba", "Yoshi", "Enderman"],
    correcta: 2 ,// Es la B (IlloJuan)
    dificultad: "facil",
    imagen: null,
    audio: "js/saveinsta.cc_320kbps-the-super-mario-galaxy-movie-new-yoshi-scene-2026.mp3",
    extra: false
  },
  {
    pregunta: "  ¿Qué animal es Po en Kung Fu Panda?  ",
    opciones: ["Panda", "Tigre", "Mono", "Oso Polar"],
    correcta: 0 ,// Es la B (IlloJuan)
    dificultad: "facil",
    imagen: null,
    audio: null,
    extra: true
  }
  ,
  {
    pregunta: "  ¿En que año se lanzó el videjuego Hollow Knight? ",
    opciones: ["2015", "2018", "2020", "2017"],
    correcta: 3 ,// Es la B (IlloJuan)
    dificultad: "media",
    imagen: null,
    audio: null,
    extra: false
  },
  {
    pregunta: " ¿De que país es esta silueta?   ",
    opciones: ["Polonia", "Alemania", "Francia", "China"],
    correcta: 0 ,// Es la B (IlloJuan)
    dificultad: "media",
    imagen: "js/3ffcdc9c3bff9019401ac55f9b390bc0-silueta-estilizada-del-mapa-de-polonia.webp",
    audio: null,
    extra: false
  },
  {
    pregunta: "  ¿Cual es la línea Evolutiva del famoso Pokémon Pikachu?  ",
    opciones: ["Achu,Pikachu,Raichu", "Pikachu,Riachu", "Pichu,Pikachu,Raichu", "no tiene otras evoluciones"],
    correcta: 2 ,// Es la B (IlloJuan)
    dificultad: "media",
    imagen: null,
    audio: null,
    extra: false
  },
  {
    pregunta: "  ¿De que videojuego pertenece esta reseña?  ",
    opciones: ["Stardew Valley", "Hello Neighbor", "Granny", "Resident Evil 7 Biohazard"],
    correcta: 1 ,// Es la B (IlloJuan)
    dificultad: "media",
    imagen: "js/Captura5.PNG",
    audio: null,
    extra: false
  },
  {
    pregunta: "  ¿Cual es el Océano más grande?  ",
    opciones: ["Pacifico", "Atlántico", "Mediterráneo", "Antártico"],
    correcta: 2 ,// Es la B (IlloJuan)
    dificultad: "media",
    imagen: null,
    audio: null,
    extra: true
  },
  {
    pregunta: "   ¿En la Mitología griega qué, castigo recibió Sísifo en el inframundo?  ",
    opciones: ["Ser devorado eternamente por aves", "Empujar una roca cuesta arriba eternamente", "Estar atado a una rueda en llamas", "No poder beber ni comer nunca"],
    correcta: 1 ,// Es la B (IlloJuan)
    dificultad: "dificil",
    imagen: null,
    audio: null,
    extra: false
  },
  {
    pregunta: "   En el mundo de los videojuegos, ¿cuál fue el primer nombre que Shigeru Miyamoto le dio al personaje de Mario antes de su debut en 'Donkey Kong'? ",
    opciones: ["Walkman", "Jumpan", "Ossan", "Mr.video"],
    correcta: 3 ,// Es la B (IlloJuan)
    dificultad: "dificil",
    imagen: null,
    audio: null,
    extra: false
  },
  {
    pregunta: "   En la serie 'Breaking Bad', ¿qué elemento químico de la tabla periódica aparece en los créditos iniciales pero no tiene un papel real en la química del metanfetamina? ",
    opciones: ["Bario (Ba)", "Fósforo (P)", "Yodo(I)", "Metilo (Me)"],
    correcta: 0 ,// Es la B (IlloJuan)
    dificultad: "dificil",
    imagen: null,
    audio: null,
    extra: false
  },
  {
    pregunta: "  ¿Cuál es el nombre del primer videojuego de la historia en incluir un 'Easter Egg' (huevo de pascua) acreditando a su programador? ",
    opciones: ["Zork", "Adventure(Atari 2600)", "Pac-Man", "Pong"],
    correcta: 1 ,// Es la B (IlloJuan)
    dificultad: "dificil",
    imagen: null,
    audio: null,
    extra: false
  },
  {
    pregunta: "  En la historia del cine, ¿qué película ostenta el récord de ser la primera en utilizar CGI (imágenes generadas por ordenador) en 2D para representar la visión de un personaje? ",
    opciones: ["Star Wars: Una nueva esperanza (1977)", "Westworld (1973) ", "Tron (1982)", "The Last Starfighter (1984)"],
    correcta: 1 ,// Es la B (IlloJuan)
    dificultad: "dificil",
    imagen: null,
    audio: null,
    extra: false
  },
  {
    pregunta: " ¿Quién es la única persona que ha ganado un Premio Nobel en dos categorías científicas distintas? ",
    opciones: ["Richard Feynman", "Linus Pauling", "Marie Curie", "Albert Einstein"],
    correcta: 2 ,// Es la B (IlloJuan)
    dificultad: "dificil",
    imagen: null,
    audio: null,
    extra: true
  }


];

// 1. Creamos una lista solo con las preguntas normales para el juego (extra: false)
let preguntasJuego = bancoPreguntas.filter(p => p.extra === false);

// 2. Creamos una lista aparte solo con las de reserva (extra: true)
let preguntasReserva = bancoPreguntas.filter(p => p.extra === true);
let indicePregunta = 0;
let puntos = 0;

function cargarPregunta() {
  // Usamos la lista filtrada
  const data = preguntasJuego[indicePregunta];

  if (!data) return; // Seguridad por si se acaban las preguntas

  const textoPregunta = document.getElementById("pregunta-texto");
  const contenedorOpciones = document.getElementById("opciones-container");
  // ... (aquí va el resto de tu código de imágenes y audios que ya tienes)


  // --- NUEVA LÓGICA DE MULTIMEDIA ---
  const imgContenedor = document.getElementById("contenedor-imagen");
  const imgTag = document.getElementById("pregunta-img");
  const audioContenedor = document.getElementById("contenedor-audio");
  const audioTag = document.getElementById("pregunta-audio");

  // Control de Imagen
  if (data.imagen) {
    imgTag.src = data.imagen;
    imgContenedor.style.display = "flex";
  } else {
    imgContenedor.style.display = "none";
  }

  // Control de Audio
  if (data.audio) {
    audioTag.src = data.audio;
    audioContenedor.style.display = "block";
    audioTag.load(); // Importante para que cargue el nuevo archivo
  } else {
    audioContenedor.style.display = "none";
    audioTag.pause(); // Para el sonido si pasas de largo
  }
  // ----------------------------------

  textoPregunta.innerText = data.pregunta;
  contenedorOpciones.innerHTML = "";

  const letras = ["A", "B", "C", "D"];

  data.opciones.forEach((opcion, i) => {
    const boton = document.createElement("button");
    boton.className = "opt-btn";
    boton.innerHTML = `<span>${letras[i]}:</span> ${opcion}`;
    boton.onclick = () => verificarRespuesta(i);
    contenedorOpciones.appendChild(boton);
  });
}

function verificarRespuesta(seleccionado) {
  const correcta = bancoPreguntas[indicePregunta].correcta;

  if (seleccionado === correcta) {
    puntos += 100;
    alert("¡Correcto! +100 puntos");
  } else {
    alert("Incorrecto...");
  }

  indicePregunta++;
  if (indicePregunta < preguntasJuego.length) {
    cargarPregunta();
  } else {
    alert("¡Fin del concurso! Puntos totales: " + puntos);
  }
}

function usar5050() {
  const correcta = bancoPreguntas[indicePregunta].correcta;
  const botones = document.querySelectorAll(".opt-btn");
  let eliminados = 0;

  botones.forEach((btn, i) => {
    if (i !== correcta && eliminados < 2) {
      btn.style.visibility = "hidden";
      eliminados++;
    }
  });
  document.getElementById("btn-5050").disabled = true;
  document.getElementById("btn-5050").style.opacity = "0.3";
}
function usar5050() {
  // 1. Obtenemos la información de la pregunta actual
  const preguntaActual = bancoPreguntas[indicePregunta];
  const indiceCorrecto = preguntaActual.correcta;

  // 2. Obtenemos todos los botones de opciones que hay en pantalla
  const botones = document.querySelectorAll(".opt-btn");

  // 3. Creamos una lista con los índices de las respuestas INCORRECTAS
  let indicesIncorrectos = [];
  botones.forEach((btn, index) => {
    if (index !== indiceCorrecto) {
      indicesIncorrectos.push(index);
    }
  });

  // 4. Mezclamos los índices incorrectos aleatoriamente
  // Usamos el truco de sort con Math.random
  indicesIncorrectos.sort(() => Math.random() - 0.5);

  // 5. Tomamos los dos primeros de la lista mezclada y los ocultamos
  const aEliminar = indicesIncorrectos.slice(0, 2);

  aEliminar.forEach(indice => {
    // Usamos opacity o visibility para que el diseño no se mueva
    botones[indice].style.visibility = "hidden";
    // Opcional: Desactivarlos para que no se pueda hacer click en el hueco vacío
    botones[indice].disabled = true;
  });

  // 6. Desactivamos el botón del comodín para que no se use otra vez
  const btnComodin = document.getElementById("btn-5050");
  btnComodin.disabled = true;
  btnComodin.style.opacity = "0.3";
  btnComodin.innerText = "❌ 50:50 Usado";
}
function cambiarPregunta() {
  const preguntaActual = preguntasJuego[indicePregunta];
  const nivelActual = preguntaActual.dificultad;

  // Buscamos en el mazo de RESERVA
  const indiceReserva = preguntasReserva.findIndex(p => p.dificultad === nivelActual);

  if (indiceReserva !== -1) {
    // Sacamos la pregunta de la reserva para que no se use dos veces
    const repuesto = preguntasReserva.splice(indiceReserva, 1)[0];

    // Cambiamos la pregunta actual en el mazo de juego por el repuesto
    preguntasJuego[indicePregunta] = repuesto;

    // Recargamos la pantalla
    cargarPregunta();

    // Desactivamos el botón
    const btn = document.getElementById("btn-cambio");
    btn.disabled = true;
    btn.style.opacity = "0.3";
    btn.innerText = "🔄 Usado";
  } else {
    alert("No quedan preguntas de reserva para el nivel: " + nivelActual);
  }
}
let intervaloLlamada; // Variable global para poder detenerlo

function usarLlamada() {
  const display = document.getElementById("contador-llamada");
  const textoSegundos = document.getElementById("segundos");
  const btnLlamada = document.getElementById("btn-llamada");

  let tiempoRestante = 60;

  // Mostrar el contador y desactivar el botón
  display.style.display = "block";
  btnLlamada.disabled = true;
  btnLlamada.style.opacity = "0.3";

  // Sonido opcional (puedes añadir uno de "ring ring" aquí)

  intervaloLlamada = setInterval(() => {
    tiempoRestante--;
    textoSegundos.innerText = tiempoRestante;

    // Si queda poco tiempo (10 seg), se pone rojo
    if (tiempoRestante <= 10) {
      display.classList.add("tiempo-critico");
    }

    // Cuando llega a cero
    if (tiempoRestante <= 0) {
      detenerCronometro();
      alert("¡Se acabó el tiempo de la llamada!");
    }
  }, 1000);
}

function detenerCronometro() {
  clearInterval(intervaloLlamada);
  document.getElementById("contador-llamada").style.display = "none";
  document.getElementById("contador-llamada").classList.remove("tiempo-critico");
}
// Iniciar
window.onload = cargarPregunta;
