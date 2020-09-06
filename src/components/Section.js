export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    if (this.renderType === "append") {
      this._container.append(element);
    }
    else {
      this._container.prepend(element);
    }
  }

  renderItems(items) {
    this._renderedItems = items;
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}