const bancoPreguntas = [
  {
    pregunta: "¿Cuál fue el resultado del famoso partido España-Malta de 1983?",
    opciones: ["10-0", "13-1", "11-1", "12-1"],
    correcta: 3, // Es la D (12-1)
    dificultad: "facil"
  },
  {
    pregunta: "¿Quién es el streamer conocido como 'El de los quesitos'?",
    opciones: ["Ibai", "IlloJuan", "Auronplay", "TheGrefg"],
    correcta: 1 ,// Es la B (IlloJuan)
    dificultad: "dificil"
  }
];
// Ordenar el banco por dificultad antes de empezar
bancoPreguntas.sort((a, b) => {
  const orden = { "facil": 1, "media": 2, "dificil": 3 };
  return orden[a.dificultad] - orden[b.dificultad];
});

let indicePregunta = 0;
let puntos = 0;

function cargarPregunta() {



  const data = bancoPreguntas[indicePregunta];
  const textoPregunta = document.getElementById("pregunta-texto");
  const contenedorOpciones = document.getElementById("opciones-container");

  textoPregunta.innerText = data.pregunta;
  contenedorOpciones.innerHTML = ""; // Limpiar botones viejos

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
  if (indicePregunta < bancoPreguntas.length) {
    cargarPregunta();
    document.getElementById("puntos").innerText = puntos;
  } else {
    alert("¡Has terminado el concurso! Puntuación final: " + puntos);
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
  const preguntaActual = bancoPreguntas[indicePregunta];
  const nivelActual = preguntaActual.dificultad;

  // Buscamos en todo el banco una pregunta de repuesto
  const repuesto = bancoPreguntas.find((p, index) =>
    p.dificultad === nivelActual && index !== indicePregunta
  );

  if (repuesto) {
    // Reemplazamos la pregunta actual en la posición del índice por el repuesto
    bancoPreguntas[indicePregunta] = repuesto;

    // Volvemos a renderizar la UI
    cargarPregunta();

    // Desactivar botón
    const btn = document.getElementById("btn-cambio");
    btn.disabled = true;
    btn.style.opacity = "0.3";

    console.log("Pregunta cambiada por una de nivel: " + nivelActual);
  } else {
    alert("No hay más preguntas de este nivel en la base de datos.");
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
