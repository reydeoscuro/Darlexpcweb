console.log("SLIDER.JS CARGADO");

const SLIDER_URL = "https://sheetdb.io/api/v1/7za60l88kidvm";
const CACHE_KEY_SLIDER = "cache_slider";
const CACHE_TIME = 5 * 60 * 1000;

const track = document.getElementById("slider-track");
let currentIndex = 0;

async function cargarSlider() {

  const cache = localStorage.getItem(CACHE_KEY_SLIDER);

  if (cache) {
    const parsed = JSON.parse(cache);

    if (Date.now() - parsed.timestamp < CACHE_TIME) {
      renderSlider(parsed.data);
      return;
    }
  }

  try {
    const res = await fetch(SLIDER_URL);
    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("Slider API error:", data);
      return;
    }

    const activos = data
      .filter(s => s.ACTIVO === "SI")
      .sort((a, b) => a.ORDEN - b.ORDEN);

    localStorage.setItem(CACHE_KEY_SLIDER, JSON.stringify({
      timestamp: Date.now(),
      data: activos
    }));

    renderSlider(activos);

  } catch (error) {
    console.error("Error cargando slider:", error);
  }
}

function renderSlider(activos) {

  track.innerHTML = "";

  activos.forEach((slide, index) => {
    const div = document.createElement("div");
    div.className = "slide";
    if (index === 0) div.classList.add("active");

    const img = document.createElement("img");
    img.src = slide.IMAGEN;

    if (slide.LINK) {
      const a = document.createElement("a");
      a.href = slide.LINK;
      a.appendChild(img);
      div.appendChild(a);
    } else {
      div.appendChild(img);
    }

    track.appendChild(div);
  });

  iniciarAutoSlide(activos.length);
}

cargarSlider();

function moverSlide(index) {
  track.style.transform = `translateX(-${index * 100}%)`;
}

document.getElementById("nextSlide").onclick = () => {
  currentIndex = (currentIndex + 1) % track.children.length;
  moverSlide(currentIndex);
};

document.getElementById("prevSlide").onclick = () => {
  currentIndex =
    (currentIndex - 1 + track.children.length) % track.children.length;
  moverSlide(currentIndex);
};

function iniciarAutoSlide(total) {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % total;
    moverSlide(currentIndex);
  }, 5000);
}


