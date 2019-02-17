import { compareType, assertType } from "./utils";

class FormErrorMsg {
  constructor() {
    this.template = Object.assign(document.createElement('span'), { className: 'error-msg' });
    this.messages = [];
    this.targets = {};
  }

  setErrorMsgTemplate(tagName, attrs, style) {
    assertType(tagName, 'tagName', 'string');
    this.template = Object.assign(document.createElement(tagName), { style, ...attrs });
  }

  setTargetToAppendErrorMsg (name, target) {
    assertType(name, 'name', 'string');
    assertType(target, 'target', ['string', 'element']);

    // if (!this.elementsForValidation.some(({ name: _name }) => _name === name)) {
    //   console.error(`addTarget으로 추가된 ${name}이 없습니다.`);
    //   return false;
    // }

    if (compareType(target, "string")) target = document.querySelector(target);

    if (!target) {
      throw new TypeError(`target 을 찾을 수 없습니다.`);
    }

    this.targets[name] = target;
  }

  makeErrorMsg (validatedInfos) {
    const errorMsgTemplate = this.template;

    this.messages = validatedInfos
      .filter(({ isValid }) => !isValid)
      .map(({ el, name, result }) => {
        const cloneErrorMsgTemplate = errorMsgTemplate.cloneNode(true);
        const invalidInfos = result.filter(r => !r.isValid);
        const target = this.targets[name] || el.parentNode;

        cloneErrorMsgTemplate.innerText = invalidInfos[0].errorMsg;

        return ({ target, errorMsgEl: cloneErrorMsgTemplate });
      });

    return this;
  }

  appendErrorMsg () {
    this.messages.forEach(({ target, errorMsgEl }) => {
      target.appendChild(errorMsgEl);
      // errorMsgEl.parentNode.appendChild(errorMsgEl);
    });

    return this;
  }

  removeErrorMsgAll () {
    this.messages.forEach(({ target, errorMsgEl }) => {
      target.removeChild(errorMsgEl);
    });

    return this;
  }

  display(infos) {
    this.formErrorMsg
      .removeErrorMsgAll()
      .makeErrorMsg(infos)
      .appendErrorMsg();
  }
}

export default FormErrorMsg;
