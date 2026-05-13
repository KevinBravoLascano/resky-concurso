// 1. BANCO DE PREGUNTAS INICIAL
const bancoPreguntasSemilla = [];

// 2. CARGA DE DATOS (LocalStorage)
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
    if (preguntasJuego.length === 0) {
      document.getElementById("pregunta-texto").innerText = "No hay preguntas cargadas. ¡Usa el editor de abajo!";
    } else {
      alert("¡Felicidades! Has terminado todas las preguntas disponibles.");
    }
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

// 5. FUNCIONES DEL EDITOR Y ARCHIVOS
function archivoABase64(idElemento) {
  return new Promise((resolve) => {
    const input = document.getElementById(idElemento);
    if (!input || !input.files[0]) return resolve(null);
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(input.files[0]);
  });
}

async function agregarPreguntaManual() {
  try {
    // Captura de datos multimedia
    const imagenData = await archivoABase64("new-imagen-file");
    const audioData = await archivoABase64("new-audio-file");

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
      imagen: imagenData,
      audio: audioData
    };

    // Validación básica
    if (!nuevaP.pregunta || !nuevaP.opciones[0]) {
      alert("Maestro Kin, rellena al menos la pregunta y la primera opción.");
      return;
    }

    // Guardar en el array global
    bancoPreguntas.push(nuevaP);

    // Intentar guardar en LocalStorage
    localStorage.setItem("miConcursilloData", JSON.stringify(bancoPreguntas));

    // Actualizar listas para el juego actual
    preguntasJuego = bancoPreguntas.filter(p => !p.extra);
    preguntasReserva = bancoPreguntas.filter(p => p.extra);

    alert("¡Pregunta guardada correctamente!");

    actualizarPreview();
    limpiarFormulario();

    // Si es la primera pregunta, cargarla en el tablero
    if (preguntasJuego.length === 1) cargarPregunta();

  } catch (e) {
    console.error(e);
    alert("Error: Es probable que la imagen sea demasiado pesada para la memoria del navegador.");
  }
}

function limpiarFormulario() {
  document.getElementById("new-pregunta").value = "";
  document.getElementById("new-opt0").value = "";
  document.getElementById("new-opt1").value = "";
  document.getElementById("new-opt2").value = "";
  document.getElementById("new-opt3").value = "";
  document.getElementById("new-imagen-file").value = "";
  document.getElementById("new-audio-file").value = "";
}

function descargarBanco() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bancoPreguntas, null, 2));
  const downloadLink = document.createElement('a');
  downloadLink.setAttribute("href", dataStr);
  downloadLink.setAttribute("download", "banco_preguntas.json");
  downloadLink.click();
}

function actualizarPreview() {
  const contenedor = document.getElementById("lista-preguntas-guardadas");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  bancoPreguntas.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "preview-item";
    const badge = p.extra ? '<span class="badge-extra">EXTRA</span>' : '';

    div.innerHTML = `
      <p><strong>${index + 1}. ${p.pregunta}</strong> ${badge}</p>
      <small>Nivel: ${p.dificultad} | Correcta: ${p.opciones[p.correcta]}</small>
    `;
    contenedor.appendChild(div);
  });
}

function resetearTodo() {
  if (confirm("¿Estás seguro? Se borrarán todas las preguntas de este navegador.")) {
    localStorage.removeItem("miConcursilloData");
    location.reload();
  }
}

// 6. INICIO AUTOMÁTICO
window.onload = () => {
  actualizarPreview();
  cargarPregunta();
};
