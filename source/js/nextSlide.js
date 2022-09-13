import { showSlides, slideIndex } from './main';

/* Увеличиваем индекс на 1 — показываем следующий слайд*/
function nextSlide() {
  showSlides(slideIndex += 1);
}
