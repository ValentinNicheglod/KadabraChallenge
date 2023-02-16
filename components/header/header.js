const template = document.createElement('template');
template.innerHTML = '<h3>TEST 2</h3>'

class Header extends HTMLElement {
  constructor() {
    super();

    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(template.content.cloneNode(true))
  }
}

customElements.define("header-component", Header);
