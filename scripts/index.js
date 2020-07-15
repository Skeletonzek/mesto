let popup = document.querySelector('.popup');
let popupEdit = document.querySelector('.profile-info__change');
let popupClose = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile-info__name');
let profileStatus = document.querySelector('.profile-info__status');
let popupName = document.querySelector('input[name="name"]');
let popupStatus = document.querySelector('input[name="status"]');

function popupVision() {
  if (!popup.classList.contains('popup_opened')) {
    popup.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupStatus.value = profileStatus.textContent;
  }
  else {
    popup.classList.remove('popup_opened');
  }
}

function popupSave(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileStatus.textContent = popupStatus.value;
  popupVision();
}

popupEdit.addEventListener('click', popupVision);
popupClose.addEventListener('click', popupVision);
popup.addEventListener('submit', popupSave);