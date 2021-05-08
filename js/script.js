import tabs from './modules/tabs';
import modal from './modules/modal';
import cards from './modules/cards';
import timer from './modules/timer';
import slider from './modules/slider';
import calc from './modules/calc';
import forms from './modules/forms';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

  // ----------- Open modal after some time -----------
  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);

  // Когда бы не открыли сайт всегда будет последние сутки акции
  const deadline = new Date(+(new Date()) + 86400000);
  // const deadline = '2022-05-01';

  tabs('.tabheader__item', '.tabheader__items', '.tabcontent', 'tabheader__item--active');
  modal('[data-modal]', '.modal', modalTimerId);
  cards();
  timer(deadline);
  calc();
  forms('form', modalTimerId);
  slider({
    container: '.offer__slider',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });

});
