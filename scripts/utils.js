import {picView} from './index.js';

export default function closeByEsc(evt) {
  if (event.key === 'Escape') {
    picView.classList.remove('pic-view_opened');
    document.removeEventListener('keydown', closeByEsc);
  }
};