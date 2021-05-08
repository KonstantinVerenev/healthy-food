import { closeModal, openModal } from './modal';
import { postData } from '../services/services';


function forms(formSelector, modalTimerId) {

  const forms = document.querySelectorAll(formSelector);

  const message = {
    success: 'Спасибо, Скоро мы с вами свяжемся',
    failure: 'Ошибка. Что-то пошло не так...',
  };

  forms.forEach(item => {
    BindPostData(item);
  });

  function BindPostData(form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = 'img/form/spinner.svg';
      statusMessage.style.cssText = `
      display: block;
      margin: 10px auto 0 auto;
    `;
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);

      const object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      const jsonData = JSON.stringify(object);

      // Альтернативный метод превратить данные формы в json
      // const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', jsonData)
        .then(data => {
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
          statusMessage.remove();
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal('.modal', modalTimerId);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
    <div class="modal__content">
      <div data-close class="modal__close">&times;</div>
      <div class="modal__title">${message}</div>
    </div>
  `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.remove('hide');
      prevModalDialog.classList.add('show');
      closeModal('.modal');
    }, 4000);
  }

}

export default forms;
