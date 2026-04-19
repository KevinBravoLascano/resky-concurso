// 1. BANCO DE PREGUNTAS INICIAL (Preguntas por defecto)
const bancoPreguntasSemilla = [


];

// 2. CARGA DE DATOS (LocalStorage)
// Intentamos recuperar lo guardado, si no, usamos la semilla
const datosLocales = localStorage.getItem("miConcursilloData");
let bancoPreguntas = datosLocales ? JSON.parse(datosLocales) : bancoPreguntasSemilla;

// Listas de trabajo
let preguntasJuego = bancoPreguntas.filter(p => p.extra === false);
let preguntasReserva = bancoPreguntas.filter(p => p.extra === true);

// Variables de estado del juego
let indicePregunta = 0;
let puntos = 0;
let intervaloLlamada;

// 3. LÓGICA DEL JUEGO
function cargarPregunta() {
  const data = preguntasJuego[indicePregunta];
  if (!data) {
    alert("¡Felicidades! Has terminado todas las preguntas disponibles.");
    return;
  }

  // Actualizar UI
  document.getElementById("puntos").innerText = puntos;
  document.getElementById("pregunta-texto").innerText = data.pregunta;

  // Multimedia: Imagen
  const imgContenedor = document.getElementById("contenedor-imagen");
  const imgTag = document.getElementById("pregunta-img");
  if (data.imagen) {
    imgTag.src = data.imagen;
    imgContenedor.style.display = "flex";
  } else {
    imgContenedor.style.display = "none";
  }

  // Multimedia: Audio
  const audioContenedor = document.getElementById("contenedor-audio");
  const audioTag = document.getElementById("pregunta-audio");
  if (data.audio) {
    audioTag.src = data.audio;
    audioContenedor.style.display = "block";
    audioTag.load();
  } else {
    audioContenedor.style.display = "none";
    audioTag.pause();
  }

  // Opciones
  const contenedorOpciones = document.getElementById("opciones-container");
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
  const correcta = preguntasJuego[indicePregunta].correcta;

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
    document.getElementById("puntos").innerText = puntos;
    alert("¡Fin del concurso! Puntos totales: " + puntos);
  }
}

// 4. COMODINES
function usar5050() {
  const correcta = preguntasJuego[indicePregunta].correcta;
  const botones = document.querySelectorAll(".opt-btn");
  let incorrectos = [];

  botones.forEach((btn, i) => {
    if (i !== correcta) incorrectos.push(i);
  });

  // Mezclar y ocultar 2
  incorrectos.sort(() => Math.random() - 0.5);
  incorrectos.slice(0, 2).forEach(idx => {
    botones[idx].style.visibility = "hidden";
    botones[idx].disabled = true;
  });

  const btn = document.getElementById("btn-5050");
  btn.disabled = true;
  btn.style.opacity = "0.3";
}

function cambiarPregunta() {
  const nivel = preguntasJuego[indicePregunta].dificultad;
  const idxReserva = preguntasReserva.findIndex(p => p.dificultad === nivel);

  if (idxReserva !== -1) {
    const repuesto = preguntasReserva.splice(idxReserva, 1)[0];
    preguntasJuego[indicePregunta] = repuesto;
    cargarPregunta();

    const btn = document.getElementById("btn-cambio");
    btn.disabled = true;
    btn.style.opacity = "0.3";
  } else {
    alert("No quedan preguntas de reserva para este nivel.");
  }
}

function usarLlamada() {
  const display = document.getElementById("contador-llamada");
  const textoSegundos = document.getElementById("segundos");
  let tiempo = 30;

  display.style.display = "block";
  document.getElementById("btn-llamada").disabled = true;

  intervaloLlamada = setInterval(() => {
    tiempo--;
    textoSegundos.innerText = tiempo;
    if (tiempo <= 10) display.classList.add("tiempo-critico");
    if (tiempo <= 0) {
      clearInterval(intervaloLlamada);
      display.style.display = "none";
      alert("¡Tiempo terminado!");
    }
  }, 1000);
}

// 5. FUNCIONES DEL EDITOR (Guardado Local)
function agregarPreguntaManual() {
  const nuevaP = {
    pregunta: document.getElementById("new-pregunta").value,
    opciones: [
      document.getElementById("new-opt0").value,
      document.getElementById("new-opt1").value,
      document.getElementById("new-opt2").value,
      document.getElementById("new-opt3").value
    ],
    correcta: parseInt(document.getElementById("new-correcta").value),
    dificultad: document.getElementById("new-dificultad").value,
    extra: document.getElementById("new-extra").value === "true",
    imagen: document.getElementById("new-imagen").value || null,
    audio: document.getElementById("new-audio").value || null
  };

  if (!nuevaP.pregunta || !nuevaP.opciones[0]) {
    alert("Faltan datos en la pregunta");
    return;
  }

  // Actualizar array y LocalStorage
  bancoPreguntas.push(nuevaP);
  localStorage.setItem("miConcursilloData", JSON.stringify(bancoPreguntas));

  // Refrescar listas de juego
  preguntasJuego = bancoPreguntas.filter(p => !p.extra);
  preguntasReserva = bancoPreguntas.filter(p => p.extra);

  alert("¡Pregunta guardada en el navegador!");
  actualizarPreview();
}

function descargarBanco() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bancoPreguntas, null, 2));
  const downloadLink = document.createElement('a');
  downloadLink.setAttribute("href", dataStr);
  downloadLink.setAttribute("download", "banco_preguntas.json");
  downloadLink.click();
}
// Función para mostrar las preguntas en pantalla
function actualizarPreview() {
  const contenedor = document.getElementById("lista-preguntas-guardadas");
  contenedor.innerHTML = ""; // Limpiamos antes de redibujar

  bancoPreguntas.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "preview-item";

    // Si es extra, le ponemos una etiqueta especial
    const badge = p.extra ? '<span class="badge-extra">EXTRA</span>' : '';

    div.innerHTML = `
      <p><strong>${index + 1}. ${p.pregunta}</strong> ${badge}</p>
      <small>Nivel: ${p.dificultad} | Correcta: ${p.opciones[p.correcta]}</small>
    `;
    contenedor.appendChild(div);
  });
}

// Función para borrar todo el LocalStorage y volver al inicio
function resetearTodo() {
  if (confirm("¿Estás seguro? Se borrarán todas las preguntas creadas en este navegador.")) {
    localStorage.removeItem("miConcursilloData");
    location.reload();
  }
}

// MODIFICA TU FUNCIÓN agregarPreguntaManual
// Añade esta línea al final de la función para que la lista se actualice al momento:
// actualizarPreview();
// Iniciar Juego
window.onload = cargarPregunta;
