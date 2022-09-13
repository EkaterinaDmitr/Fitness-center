import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)

'use strict';


const trainers = document.querySelector('.trainers');
const trainersList = document.querySelector('.trainers__list');
const trainerItemsAll = document.querySelectorAll('.trainers__item');
const trainerPrev = document.querySelector('.trainers__control-left');
const trainerNext = document.querySelector('.trainers__control-right');
let trainerWidth;
let trainerCount;
let trainerPosition;
const reviews = document.querySelector('.reviews');
const reviewsList = document.querySelector('.reviews__list');
const reviewsItemsAll = document.querySelectorAll('.reviews__item');
const reviewsPrev = document.querySelector('.reviews__control-left');
const reviewsNext = document.querySelector('.reviews__control-right');
let reviewWidth;
let reviewPosition;
const reviewCount = 1;

// Определение ширины элементов в зависимости от экрана
const screenWidthDetection = function () {
  if (trainers) {
    trainersList.style.marginLeft = 0 + 'px';
  }
  if (reviews) {
    reviewsList.style.marginLeft = 0 + 'px';
  }
  if (window.matchMedia('(min-width: 320px)').matches) {
    trainerWidth = 256; // 226px + 30px
    trainerCount = 1;
    trainerPosition = 0;
    reviewWidth = 266; // 246px + 20px
    reviewPosition = 0;
  }

  if (window.matchMedia('(min-width: 768px)').matches) {
    trainerWidth = 298; // 266px + 30px
    trainerCount = 2;
    trainerPosition = 0;
    reviewWidth = 606; // 566px + 40px
    reviewPosition = 0;
  }

  if (window.matchMedia('(min-width: 1200px)').matches) {
    trainerWidth = 300; // 260px + 40px
    trainerCount = 4;
    trainerPosition = 0;
    reviewWidth = 600; // 560px + 40px
    reviewPosition = 0;
  }
};

// Если блок тренеров сущесвует на странице
if (trainers) {
  // Предыдущий тренер
  const prevTrainerItem = function () {
    trainerPosition = Math.min(trainerPosition, 0);
    if (trainerPosition === 0) {
      trainerPosition = -trainerWidth * (trainerItemsAll.length - trainerCount);
    } else {
      trainerPosition += trainerWidth;
    }
    if (trainersList) {
      trainersList.style.marginLeft = trainerPosition + 'px';
      trainersList.style.transition = 'margin-left 0.5s';
    }
  };

  // Следующий тренер
  const nextTrainerItem = function () {
    trainerPosition = Math.max(trainerPosition, -trainerWidth * (trainerItemsAll.length - trainerCount));
    if (trainerPosition === -trainerWidth * (trainerItemsAll.length - trainerCount)) {
      trainerPosition = 0;
    } else {
      trainerPosition -= trainerWidth;
    }
    if (trainersList) {
      trainersList.style.marginLeft = trainerPosition + 'px';
      trainersList.style.transition = 'margin-left 0.5s';
    }
  };

  // Клики на контролах
  trainerPrev.addEventListener('click', prevTrainerItem);
  trainerNext.addEventListener('click', nextTrainerItem);

  // Нажатия Enter на контролах
  trainerPrev.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      prevTrainerItem();
    }
  });

  trainerNext.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      nextTrainerItem();
    }
  });
}

// Если блок отзывов существует на странице
if (reviews) {
  // Предыдущий отзыв
  const prevReviewItem = function () {
    reviewPosition = Math.min(reviewPosition, 0);
    if (reviewPosition === 0) {
      reviewPosition = -reviewWidth * (reviewsItemsAll.length - reviewCount);
    } else {
      reviewPosition += reviewWidth;
    }
    if (reviewsList) {
      reviewsList.style.marginLeft = reviewPosition + 'px';
      reviewsList.style.transition = 'margin-left 0.5s';
    }

  };

  // Следующий отзыв
  const nextReviewItem = function () {
    reviewPosition = Math.max(reviewPosition, -reviewWidth * (reviewsItemsAll.length - reviewCount));
    if (reviewPosition === -reviewWidth * (reviewsItemsAll.length - reviewCount)) {
      reviewPosition = 0;
    } else {
      reviewPosition -= reviewWidth;
    }
    if (reviewsList) {
      reviewsList.style.marginLeft = reviewPosition + 'px';
      reviewsList.style.transition = 'margin-left 0.5s';
    }
  };

  // Клики на контролах
  reviewsPrev.addEventListener('click', prevReviewItem);
  reviewsNext.addEventListener('click', nextReviewItem);

  // Нажатия Enter на контролах
  reviewsPrev.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      prevReviewItem();
    }
  });

  reviewsNext.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      nextReviewItem();
    }
  });
}


// Переопределение ширины элементов при изменении экрана
window.addEventListener('resize', function () {
  screenWidthDetection();
});

// // Маска номера телефона
// const telOptions = {
//   mask: '+{7}(000)000-00-00'
// };

// if (telNumber) {
//   const iMask;
//   iMask(telNumber, telOptions);
// }

// if (buyLink) {
//   buyLink.addEventListener('click', function (evt) {
//     evt.preventDefault();
//     buyAnchor.scrollIntoView({block: 'start', behavior: 'smooth'});
//   });
// }

// Основной код
screenWidthDetection();
