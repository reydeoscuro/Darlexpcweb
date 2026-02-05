console.log("SLIDER.JS CARGADO");

const SLIDER_URL = "https://sheetdb.io/api/v1/7za60l88kidvm";

const track = document.getElementById("slider-track");
let currentIndex = 0;

fetch(SLIDER_URL)
  .then(res => res.json())
  .then(slides => {
    const activos = slides
      .filter(s => s.ACTIVO === "SI")
      .sort((a, b) => a.ORDEN - b.ORDEN);

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
  });

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


