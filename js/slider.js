let index = 0;
const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');

function moveSlider() {
  index++;
  if (index >= slides.length) index = 0;
  track.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(moveSlider, 4000);

