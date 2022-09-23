/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable no-invalid-this */
/* eslint-disable no-unused-expressions */
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
// const breakpoint = window.matchMedia('(min-width:1024px)');
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

const screenWidthDetection = function () {
  if (trainers) {
    trainersList.style.marginLeft = 0 + 'px';
  }
  if (reviews) {
    reviewsList.style.marginLeft = 0 + 'px';
  }
  if (window.matchMedia('(min-width: 320px)').matches) {
    trainerWidth = 256;
    trainerCount = 1;
    trainerPosition = 0;
    reviewWidth = 266;
    reviewPosition = 0;
  }

  if (window.matchMedia('(min-width: 768px)').matches) {
    trainerWidth = 298;
    trainerCount = 2;
    trainerPosition = 0;
    reviewWidth = 606;
    reviewPosition = 0;
  }

  if (window.matchMedia('(min-width: 1200px)').matches) {
    trainerWidth = 300;
    trainerCount = 4;
    trainerPosition = 0;
    reviewWidth = 600;
    reviewPosition = 0;
  }
};

if (trainers) {
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

  trainerPrev.addEventListener('click', prevTrainerItem);
  trainerNext.addEventListener('click', nextTrainerItem);

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

if (reviews) {
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

  reviewsPrev.addEventListener('click', prevReviewItem);
  reviewsNext.addEventListener('click', nextReviewItem);

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


window.addEventListener('resize', function () {
  screenWidthDetection();
});


[].forEach.call(
    document.querySelectorAll('input[type="tel"]'),
    function (input) {
      let keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) {
          event.preventDefault();
        }
        // eslint-disable-next-line one-const
        let matrix = '+7 (___) ___ ____',
          i = 0,
          def = matrix.replace(/\D/g, ''),
          val = this.value.replace(/\D/g, ''),
          new_value = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
        i = new_value.indexOf('_');
        if (i !== -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i);
        }
        let reg = matrix
            .substr(0, this.value.length)
            .replace(/_+/g, function (a) {
              return '\\d{1,' + a.length + '}';
            })
            .replace(/[+()]/g, '\\$&');
        reg = new RegExp('^' + reg + '$');
        if (
          !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
        ) {
          this.value = new_value;
        }
        if (event.type === 'blur' && this.value.length < 5) {
          this.value = '';
        }
      }

      input.addEventListener('input', mask, false);
      input.addEventListener('blur', mask, false);
      input.addEventListener('focus', mask, false);
    }
);
screenWidthDetection();


(() => {
  const tabs = document.querySelector('.tabs');

  if (tabs) {
    const toggleTabs = (event) => {
      if (String(event.target.className) === 'tabs__link') {
        const dataTab = event.target.getAttribute('data-tab');
        const tabH = document.getElementsByClassName('tabs__link');
        for (let i = 0; i < tabH.length; i++) {
          tabH[i].classList.remove('tabs__link--current');
          tabH[i].removeAttribute('tabindex');
        }
        event.target.classList.add('tabs__link--current');
        event.target.setAttribute('tabindex', '-1');
        const tabBody = document.getElementsByClassName('tabs-body');
        for (let j = 0; j < tabBody.length; j++) {
          if (Number(dataTab) === j) {
            tabBody[j].classList.add('tabs-body--current');
          } else {
            tabBody[j].classList.remove('tabs-body--current');
          }
        }
      }
    };
    tabs.addEventListener('click', toggleTabs);
  }

})();


if (document.querySelector('.preview__play') && document.querySelector('.preview__video') && document.querySelector('.preview__image-container')) {
  const playButton = document.querySelector('.preview__play');
  const video = document.querySelector('.preview__video');
  const srcVideo = video.getAttribute('src');
  const imagePreview = document.querySelector('.preview__image-container');

  playButton.classList.remove('preview__play--no-js');
  video.classList.remove('preview__video--no-js');
  imagePreview.classList.remove('preview__image-container--no-js');

  playButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    video.classList.add('preview__video--visible');
    playButton.classList.add('preview__play--none-display');
    video.setAttribute('src', srcVideo + '&autoplay=1');
  });
}
