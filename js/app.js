// 1. CARGA INICIAL Y ESTADO
const bancoPreguntasSemilla = [];
const datosLocales = localStorage.getItem("miConcursilloData");
let bancoPreguntas = datosLocales ? JSON.parse(datosLocales) : bancoPreguntasSemilla;

let preguntasJuego = bancoPreguntas.filter(p => !p.extra);
let preguntasReserva = bancoPreguntas.filter(p => p.extra);

let indicePregunta = 0;
let puntos = 0;
let intervaloLlamada;

// 2. LÓGICA DEL JUEGO
function cargarPregunta() {
  const data = preguntasJuego[indicePregunta];

  // Limpieza previa de UI
  document.getElementById("opciones-container").innerHTML = "";

  if (!data) {
    document.getElementById("pregunta-texto").innerText =
      bancoPreguntas.length === 0 ? "Crea una pregunta abajo para empezar." : "¡No hay más preguntas!";
    document.getElementById("contenedor-imagen").style.display = "none";
    document.getElementById("contenedor-audio").style.display = "none";
    return;
  }

  document.getElementById("puntos").innerText = puntos;
  document.getElementById("pregunta-texto").innerText = data.pregunta;

  // Manejo de Imagen
  const imgContenedor = document.getElementById("contenedor-imagen");
  const imgTag = document.getElementById("pregunta-img");
  if (data.imagen) {
    imgTag.src = data.imagen;
    imgContenedor.style.display = "flex";
  } else {
    imgContenedor.style.display = "none";
  }

  // Manejo de Audio
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

  // Generar Opciones
  const letras = ["A", "B", "C", "D"];
  data.opciones.forEach((texto, i) => {
    if (texto.trim() !== "") {
      const boton = document.createElement("button");
      boton.className = "opt-btn";
      boton.innerHTML = `<span>${letras[i]}:</span> ${texto}`;
      boton.onclick = () => verificarRespuesta(i);
      document.getElementById("opciones-container").appendChild(boton);
    }
  });
}

function verificarRespuesta(seleccionado) {
  const correcta = preguntasJuego[indicePregunta].correcta;
  if (seleccionado === correcta) {
    puntos += 100;
    mostrarNotificacion("¡Correcto! +100 pts", "success");
  } else {
    mostrarNotificacion("Respuesta incorrecta", "error");
  }

  indicePregunta++;
  setTimeout(() => {
    if (indicePregunta < preguntasJuego.length) cargarPregunta();
    else alert("Fin del concurso. Puntuación final: " + puntos);
  }, 500);
}

// 3. COMODINES
function usar5050() {
  const correcta = preguntasJuego[indicePregunta].correcta;
  const botones = document.querySelectorAll(".opt-btn");
  let incorrectos = [];

  botones.forEach((btn, i) => { if (i !== correcta) incorrectos.push(i); });
  incorrectos.sort(() => Math.random() - 0.5).slice(0, 2).forEach(idx => {
    botones[idx].style.visibility = "hidden";
    botones[idx].disabled = true;
  });
  document.getElementById("btn-5050").disabled = true;
  document.getElementById("btn-5050").style.opacity = "0.5";
}

function cambiarPregunta() {
  const nivel = preguntasJuego[indicePregunta].dificultad;
  const idxReserva = preguntasReserva.findIndex(p => p.dificultad === nivel);

  if (idxReserva !== -1) {
    preguntasJuego[indicePregunta] = preguntasReserva.splice(idxReserva, 1)[0];
    cargarPregunta();
    document.getElementById("btn-cambio").disabled = true;
    document.getElementById("btn-cambio").style.opacity = "0.5";
    mostrarNotificacion("Pregunta cambiada", "success");
  } else {
    mostrarNotificacion("No hay preguntas de reserva para este nivel", "error");
  }
}

function usarLlamada() {
  const display = document.getElementById("contador-llamada");
  let tiempo = 30;
  display.style.display = "block";
  document.getElementById("btn-llamada").disabled = true;

  intervaloLlamada = setInterval(() => {
    tiempo--;
    document.getElementById("segundos").innerText = tiempo;
    if (tiempo <= 0) {
      clearInterval(intervaloLlamada);
      display.style.display = "none";
    }
  }, 1000);
}

// 4. EDITOR Y GESTIÓN DE ARCHIVOS
function archivoABase64(id) {
  return new Promise((resolve) => {
    const input = document.getElementById(id);
    if (!input || !input.files[0]) resolve(null);
    else {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(input.files[0]);
    }
  });
}

async function agregarPreguntaManual() {
  const preguntaTxt = document.getElementById("new-pregunta").value;
  const opt0 = document.getElementById("new-opt0").value;

  if (!preguntaTxt || !opt0) {
    mostrarNotificacion("Faltan datos en la pregunta", "error");
    return;
  }

  const imgData = await archivoABase64("new-imagen-file");
  const audioData = await archivoABase64("new-audio-file");

  const nuevaP = {
    pregunta: preguntaTxt,
    opciones: [
      opt0,
      document.getElementById("new-opt1").value,
      document.getElementById("new-opt2").value,
      document.getElementById("new-opt3").value
    ],
    correcta: parseInt(document.getElementById("new-correcta").value),
    dificultad: document.getElementById("new-dificultad").value,
    extra: document.getElementById("new-extra").value === "true",
    imagen: imgData,
    audio: audioData
  };

  bancoPreguntas.push(nuevaP);

  try {
    localStorage.setItem("miConcursilloData", JSON.stringify(bancoPreguntas));
    preguntasJuego = bancoPreguntas.filter(p => !p.extra);
    preguntasReserva = bancoPreguntas.filter(p => p.extra);

    mostrarNotificacion("✅ Pregunta guardada", "success");
    actualizarPreview();
    limpiarFormulario();
    if (preguntasJuego.length === 1) cargarPregunta();
  } catch (e) {
    mostrarNotificacion("⚠️ Error: Espacio insuficiente (Archivo muy grande)", "error");
    bancoPreguntas.pop();
  }
}

function borrarPregunta(index) {
  if (confirm(`¿Borrar la pregunta: "${bancoPreguntas[index].pregunta}"?`)) {
    bancoPreguntas.splice(index, 1);
    localStorage.setItem("miConcursilloData", JSON.stringify(bancoPreguntas));

    // Refrescar listas de juego
    preguntasJuego = bancoPreguntas.filter(p => !p.extra);
    preguntasReserva = bancoPreguntas.filter(p => p.extra);

    if (typeof mostrarNotificacion === "function") {
      mostrarNotificacion("Pregunta eliminada", "error");
    }

    actualizarPreview();
    indicePregunta = 0;
    cargarPregunta();
  }
}

// 5. UI Y UTILIDADES
function actualizarPreview() {
  const contenedor = document.getElementById("lista-preguntas-guardadas");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  bancoPreguntas.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "preview-item";

    // Usamos Flexbox directamente aquí para asegurar alineación
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.alignItems = "center";
    div.style.padding = "10px";
    div.style.marginBottom = "5px";
    div.style.background = "#1d1d1d";
    div.style.borderRadius = "8px";

    const badge = p.extra ? '<span class="badge-extra">EXTRA</span>' : '';

    div.innerHTML = `
      <div style="flex-grow: 1; color: white;">
        <p style="margin: 0;"><strong>${index + 1}. ${p.pregunta}</strong> ${badge}</p>
        <small style="color: #888;">${p.dificultad} | Correcta: ${p.opciones[p.correcta]}</small>
      </div>
      <button onclick="borrarPregunta(${index})"
              style="background: #331111; color: #ff4444; border: 1px solid #662222;
                     padding: 8px 12px; border-radius: 5px; cursor: pointer; font-size: 1.2rem;">
        🗑️
      </button>
    `;
    contenedor.appendChild(div);
  });
}

function mostrarNotificacion(mensaje, tipo) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${tipo}`;
  toast.innerHTML = `<span>${mensaje}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

function limpiarFormulario() {
  ["new-pregunta", "new-opt0", "new-opt1", "new-opt2", "new-opt3"].forEach(id => {
    document.getElementById(id).value = "";
  });
  document.getElementById("new-imagen-file").value = "";
  document.getElementById("new-audio-file").value = "";
}

function descargarBanco() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bancoPreguntas, null, 2));
  const link = document.createElement('a');
  link.setAttribute("href", dataStr);
  link.setAttribute("download", "banco_concurso.json");
  link.click();
}

function resetearTodo() {
  if (confirm("¿Borrar todas las preguntas del navegador?")) {
    localStorage.removeItem("miConcursilloData");
    location.reload();
  }
}

window.onload = () => {
  cargarPregunta();
  actualizarPreview();
};
