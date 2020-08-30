function closeByEsc(evt) {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closeModalWindow (activePopup);
  }
};

export const openModalWindow = (modalWindow) => {
  modalWindow.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
};

export const closeModalWindow = (modalWindow) => {
  modalWindow.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
};