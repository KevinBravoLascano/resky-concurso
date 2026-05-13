// 1. CARGA INICIAL
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
  if (!data) {
    if(bancoPreguntas.length === 0) {
      document.getElementById("pregunta-texto").innerText = "Crea una pregunta abajo para empezar.";
    }
    return;
  }

  document.getElementById("puntos").innerText = puntos;
  document.getElementById("pregunta-texto").innerText = data.pregunta;

  // Imagen
  const imgContenedor = document.getElementById("contenedor-imagen");
  const imgTag = document.getElementById("pregunta-img");
  if (data.imagen) {
    imgTag.src = data.imagen;
    imgContenedor.style.display = "flex";
  } else {
    imgContenedor.style.display = "none";
  }

  // Audio
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
  ["A", "B", "C", "D"].forEach((letra, i) => {
    if (data.opciones[i]) {
      const boton = document.createElement("button");
      boton.className = "opt-btn";
      boton.innerHTML = `<span>${letra}:</span> ${data.opciones[i]}`;
      boton.onclick = () => verificarRespuesta(i);
      contenedorOpciones.appendChild(boton);
    }
  });
}

function verificarRespuesta(seleccionado) {
  if (seleccionado === preguntasJuego[indicePregunta].correcta) {
    puntos += 100;
    alert("¡Correcto!");
  } else {
    alert("Incorrecto...");
  }
  indicePregunta++;
  if (indicePregunta < preguntasJuego.length) cargarPregunta();
  else alert("Fin del juego. Puntos: " + puntos);
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
}

function cambiarPregunta() {
  const nivel = preguntasJuego[indicePregunta].dificultad;
  const idxReserva = preguntasReserva.findIndex(p => p.dificultad === nivel);
  if (idxReserva !== -1) {
    preguntasJuego[indicePregunta] = preguntasReserva.splice(idxReserva, 1)[0];
    cargarPregunta();
    document.getElementById("btn-cambio").disabled = true;
  } else alert("No hay reservas.");
}

function usarLlamada() {
  const display = document.getElementById("contador-llamada");
  let tiempo = 30;
  display.style.display = "block";
  document.getElementById("btn-llamada").disabled = true;
  intervaloLlamada = setInterval(() => {
    tiempo--;
    document.getElementById("segundos").innerText = tiempo;
    if (tiempo <= 0) { clearInterval(intervaloLlamada); display.style.display = "none"; }
  }, 1000);
}

// 4. FUNCIONES DEL EDITOR (ASÍNCRONAS)
function archivoABase64(id) {
  return new Promise((resolve) => {
    const file = document.getElementById(id).files[0];
    if (!file) resolve(null);
    else {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    }
  });
}

async function agregarPreguntaManual() {
  const imgData = await archivoABase64("new-imagen-file");
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
    imagen: imgData,
    audio: audioData
  };

  if (!nuevaP.pregunta || !nuevaP.opciones[0]) return alert("Faltan datos.");

  bancoPreguntas.push(nuevaP);
  try {
    localStorage.setItem("miConcursilloData", JSON.stringify(bancoPreguntas));
    preguntasJuego = bancoPreguntas.filter(p => !p.extra);
    preguntasReserva = bancoPreguntas.filter(p => p.extra);
    alert("¡Guardada!");
    actualizarPreview();
    if(preguntasJuego.length === 1) cargarPregunta();
  } catch(e) { alert("Error: Imagen muy pesada."); }
}

function actualizarPreview() {
  const contenedor = document.getElementById("lista-preguntas-guardadas");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  bancoPreguntas.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "preview-item";
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.alignItems = "center";

    const badge = p.extra ? '<span class="badge-extra">EXTRA</span>' : '';

    div.innerHTML = `
      <div style="flex-grow: 1;">
        <p><strong>${index + 1}. ${p.pregunta}</strong> ${badge}</p>
        <small>Nivel: ${p.dificultad} | Correcta: ${p.opciones[p.correcta]}</small>
      </div>
      <button onclick="borrarPregunta(${index})" class="btn-borrar-single" title="Eliminar pregunta">
        🗑️
      </button>
    `;
    contenedor.appendChild(div);
  });
}

function borrarPregunta(index) {
  if (confirm(`¿Seguro que quieres borrar la pregunta: "${bancoPreguntas[index].pregunta}"?`)) {
    // 1. Eliminar del array principal
    bancoPreguntas.splice(index, 1);

    // 2. Actualizar LocalStorage
    localStorage.setItem("miConcursilloData", JSON.stringify(bancoPreguntas));

    // 3. Refrescar listas de juego
    preguntasJuego = bancoPreguntas.filter(p => !p.extra);
    preguntasReserva = bancoPreguntas.filter(p => p.extra);

    // 4. Feedback visual
    mostrarNotificacion("Pregunta eliminada", "error");

    // 5. Refrescar UI
    actualizarPreview();

    // Si borramos la pregunta que se estaba jugando, reiniciamos el índice
    indicePregunta = 0;
    cargarPregunta();
  }
}
function mostrarNotificacion(mensaje, tipo = 'success') {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${tipo}`;
  toast.innerHTML = `<span>${mensaje}</span>`;

  container.appendChild(toast);

  // Desaparecer después de 3 segundos
  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
function descargarBanco() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bancoPreguntas, null, 2));
  const link = document.createElement('a');
  link.setAttribute("href", dataStr);
  link.setAttribute("download", "banco.json");
  link.click();
}

function resetearTodo() {
  if (confirm("¿Borrar todo?")) { localStorage.removeItem("miConcursilloData"); location.reload(); }
}

window.onload = () => { cargarPregunta(); actualizarPreview(); };
