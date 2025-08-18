// 🎵 Get audio element
var audio = document.getElementById("birthdaySong");
var lyrics = document.querySelector("#lyrics");

// Try to autoplay on page load
window.addEventListener("load", () => {
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // If autoplay is blocked, start on first click/tap
      document.addEventListener("click", () => {
        audio.play();
      }, { once: true });
    });
  }
});

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
// (asegúrate de que lyricsData esté definido en tu proyecto)

// Animar las letras
function updateLyrics() {
  var time = Math.floor(audio.currentTime);
  var currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 6
  );

  if (currentLine) {
    // Calcula la opacidad basada en el tiempo en la línea actual
    var fadeInDuration = 0.1; // Duración del efecto de aparición en segundos
    var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);

    // Aplica el efecto de aparición
    lyrics.style.opacity = opacity;
    lyrics.innerHTML = currentLine.text;
  } else {
    // Restablece la opacidad y el contenido si no hay una línea actual
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

setInterval(updateLyrics, 1000);

// Función para ocultar el título después de 216 segundos
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  if (titulo) {
    titulo.style.animation =
      "fadeOut 3s ease-in-out forwards"; /* Duración y función de temporización de la desaparición */
    setTimeout(function () {
      titulo.style.display = "none";
    }, 3000); // Espera 3 segundos antes de ocultar completamente
  }
}

// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(ocultarTitulo, 216000);