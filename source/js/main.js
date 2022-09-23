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
import './vendor/swiper';


export const switchSwiper = () => {
  const mySwiper = new Swiper('.swiper1', {
    slidesPerView: 4,
    spaceBetween: 40,
    slidersPerGroup: 1,

    loop: true,

    navigation: {
      nextEl: '.swiper-button-next1',
      prevEl: '.swiper-button-prev1',
    },

    breakpoints: {
      1200: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1000: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      850: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      550: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
    },
  });
};

export const switchSwiperReviews = () => {
  const mySwiper = new Swiper('.swiper2', {
    slidesPerView: 1,
    spaceBetween: 20,
    slidersPerGroup: 1,

    navigation: {
      nextEl: '.swiper-button-next2',
      prevEl: '.swiper-button-prev2',
    },
  });
};

window.addEventListener('DOMContentLoaded', () => {


  window.addEventListener('load', () => {
    switchSwiperReviews();
    switchSwiper();
  });
});
