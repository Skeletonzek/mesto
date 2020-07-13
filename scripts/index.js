//Не уверен, что это правильный подход,
//документация рекомендует использовать как можно меньше глобальных переменных,
//жду ваш комментарий
let popupEdit = document.querySelector('.profile-info__change');
let popupStatus = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let profileInfo = document.querySelectorAll('.profile-info__name, .profile-info__status');
let popupInfo = document.querySelectorAll('.popup__text');
let popupSubmit = document.querySelector('.popup__submit')

function popupOpen() {
  popupStatus.style.display = 'block';
  popupInfo[0].value = profileInfo[0].textContent;
  popupInfo[1].value = profileInfo[1].textContent;
}

function popupExit() {
  //Это решение мне показалось проще,
  //потому что не надо создавать отдельный стиль-модификатор,
  //скорее всего это не по БЭМ, если я прав, поправьте меня :)
  popupStatus.style.display = 'none';
}

function popupSave(evt) {
  evt.preventDefault();
  profileInfo[0].textContent = popupInfo[0].value;
  profileInfo[1].textContent = popupInfo[1].value;
  popupStatus.style.display = 'none';
}

popupEdit.addEventListener('click', popupOpen);
popupClose.addEventListener('click', popupExit);
popupStatus.addEventListener('submit', popupSave);