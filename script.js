/* Data a preencher quando o dia e o mês forem conhecidos. Não inventar uma data. */
const relationshipStartDate = "2018-05-10";
const musicFile = "assets/music/ousado-amor.mp3";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const photos = [
  ["foto01.jpg", "um sorriso para guardar"],
  ["foto02.jpg", "nós, do nosso jeito"],
  ["foto03.jpg", "pequenos momentos"],
  ["foto04.jpg", "o teu olhar"],
  ["foto05.jpg", "um capítulo leve"],
  ["foto06.jpg", "antes mesmo de tudo"],
  ["foto07.jpg", "um dia nosso"],
  ["foto08.jpg", "bem perto de ti"],
  ["foto09.jpg", "o nosso sorriso"],
  ["foto10.jpg", "e ainda há muito pela frente"]
];

const letterData = [
  ["Carta 01", "Para quando sentires saudades", "Se em algum momento sentires saudades, lembra-te de que também existe um lugar em mim onde tu estás sempre presente.\n\nLembra do meu carinho, das nossas conversas e de todos os pequenos motivos que me fazem sorrir quando penso em nós. Mesmo longe, o meu coração continua a escolher-te."],
  ["Carta 02", "Uma coisa que talvez eu nunca consiga explicar", "Talvez eu nunca consiga explicar exatamente o tamanho do que sinto por ti. Às vezes as palavras parecem pequenas, mas ainda assim quero continuar a tentar.\n\nTu tornaste a minha vida mais bonita de um jeito simples, verdadeiro e só nosso. E eu sou profundamente grato por isso."],
  ["Carta 03", "Para o meu amorzinho", "Meu amorzinho, minha bb, minha Yoyo: eu amo o teu jeito, o teu sorriso e a forma como és tu mesma. Amo saber que posso chamar-te de minha e que também sou o teu amor.\n\nQue nunca nos falte carinho para cuidar um do outro e vontade para continuar."],
  ["Carta 04", "Sobre nós", "Sobre nós, eu só quero dizer que vale a pena. Vale a pena cada conversa, cada esforço, cada recomeço e cada momento vivido com verdade.\n\nAinda temos muito para aprender e viver, mas eu gosto da ideia de continuar a escrever esta história contigo — um dia de cada vez, com amor e com Deus no centro."]
];

function showMessage(text) {
  let message = $("#smallMessage");
  if (!message) {
    message = document.createElement("div");
    message.id = "smallMessage";
    message.style.cssText = "position:fixed;z-index:50;left:50%;bottom:1.2rem;transform:translateX(-50%);background:#722e40;color:#fff;padding:.8rem 1rem;border-radius:999px;font-size:.78rem;max-width:calc(100% - 2rem);text-align:center";
    document.body.appendChild(message);
  }
  message.textContent = text;
  message.hidden = false;
  clearTimeout(showMessage.timer);
  showMessage.timer = setTimeout(() => { message.hidden = true; }, 3500);
}

function buildGallery() {
  const gallery = $("#gallery");
  if (!gallery) return;
  photos.forEach(([file, caption], index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "photo";
    button.dataset.index = String(index);
    button.innerHTML = `<img src="assets/images/${file}" alt="Neemias e Yolly — ${caption}" loading="lazy"><span>${caption}</span>`;
    button.addEventListener("click", () => openPhoto(index));
    gallery.appendChild(button);
  });
}

function openPhoto(index) {
  const [file, caption] = photos[index];
  const lightbox = $("#lightbox");
  $("#lightboxImage").src = `assets/images/${file}`;
  $("#lightboxImage").alt = caption;
  $("#lightboxCaption").textContent = caption;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closePhoto() {
  $("#lightbox").hidden = true;
  document.body.style.overflow = "";
}

function setupLetters() {
  $$(".letter").forEach((button) => button.addEventListener("click", () => {
    const [label, title, text] = letterData[Number(button.dataset.letter)];
    $("#letterLabel").textContent = label;
    $("#letterTitle").textContent = title;
    $("#letterBody").textContent = text;
    $("#letterModal").hidden = false;
    document.body.style.overflow = "hidden";
  }));
}

function closeLetter() {
  $("#letterModal").hidden = true;
  document.body.style.overflow = "";
}

function setupReveal() {
  const elements = $$(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, current) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        current.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  elements.forEach((element) => observer.observe(element));
}

function updateCounter() {
  const valid = /^\d{4}-\d{2}-\d{2}$/.test(relationshipStartDate);
  if (!valid) return;
  const start = new Date(`${relationshipStartDate}T00:00:00`);
  if (Number.isNaN(start.getTime()) || start > new Date()) return;
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();
  let seconds = now.getSeconds() - start.getSeconds();
  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) { days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); months--; }
  if (months < 0) { months += 12; years--; }
  $("#counterPlaceholder").hidden = true;
  $("#counterGrid").hidden = false;
  [["years", years], ["months", months], ["days", days], ["hours", hours], ["minutes", minutes], ["seconds", seconds]].forEach(([id, value]) => { $("#" + id).textContent = String(value).padStart(2, "0"); });
}

function setupMusic() {
  const audio = $("#audio");
  const button = $("#musicButton");
  const label = $("#musicLabel");
  const volume = $("#volume");
  audio.volume = Number(volume.value);
  volume.addEventListener("input", () => { audio.volume = Number(volume.value); });
  button.addEventListener("click", () => {
    if (!audio.src) audio.src = musicFile;
    if (audio.paused) {
      audio.play().then(() => { button.textContent = "Ⅱ"; label.textContent = "Ousado Amor · a tocar"; }).catch(() => showMessage("Coloca ousado-amor.mp3 em assets/music/ para ouvir a música."));
    } else {
      audio.pause();
      button.textContent = "▶";
      label.textContent = "Ousado Amor";
    }
  });
}

window.beginStory = function beginStory() {
  $("#musicPlayer").hidden = false;
  $("#inicio").scrollIntoView({ behavior: "smooth" });
  const audio = $("#audio");
  audio.src = musicFile;
  audio.volume = Number($("#volume").value);
  audio.play().then(() => { $("#musicButton").textContent = "Ⅱ"; $("#musicLabel").textContent = "Ousado Amor · a tocar"; }).catch(() => { $("#musicLabel").textContent = "Ousado Amor · toca ▶ para ouvir"; });
};

function setupFinal() {
  $("#finalButton").addEventListener("click", () => {
    const button = $("#finalButton");
    button.hidden = true;
    $("#finalTitle").textContent = "Respira fundo...";
    $("#finalText").textContent = "Há palavras que merecem chegar devagar.";
    setTimeout(() => {
      $("#finalLetter").hidden = false;
      $("#finalLetter").scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        $("#ending").hidden = false;
        $("#ending").scrollIntoView({ behavior: "smooth" });
      }, 7000);
    }, 1800);
  });
  $("#fim").addEventListener("click", () => { $("#continua").hidden = false; });
}

function setupTyping() {
  const section = $("#uma-coisa");
  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) observer.disconnect();
  }, { threshold: 0.3 });
  observer.observe(section);
}

document.addEventListener("DOMContentLoaded", () => {
  buildGallery();
  setupLetters();
  setupReveal();
  setupMusic();
  setupFinal();
  setupTyping();
  updateCounter();
  setInterval(updateCounter, 1000);
  $("#closeLightbox").addEventListener("click", closePhoto);
  $("#lightbox").addEventListener("click", (event) => { if (event.target.id === "lightbox") closePhoto(); });
  $("#closeLetter").addEventListener("click", closeLetter);
  $("#letterModal").addEventListener("click", (event) => { if (event.target.id === "letterModal") closeLetter(); });
  $("#videoElement").addEventListener("error", () => { $("#videoElement").style.display = "none"; });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") { closePhoto(); closeLetter(); } });
});
