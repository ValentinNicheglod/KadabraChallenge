const menuTemplate = document.createElement("template");

let menuItems = [];

const MenuLinks = (links) => (

  links.map((option) => `
    <li class="link">
      <a href="#" class="position-relative">
        ${option}
      </a>
    </li>
  `).join("")
);

class Menu extends HTMLElement {

  constructor() {
    super();

    let shadowRoot = this.attachShadow({ mode: "open" });

    menuItems = JSON.parse(this.getAttribute("menu-data"));
    
    menuTemplate.innerHTML = `
      <style>
        @import url(./components/menu/menu.css)
      </style>
      <section class="menu-section">
        <div class="container">
          <div>
            <ul class="links-list left-list">
              ${menuItems.leftMenuOptions.map((option) => `
                <li class="link left-options">
                  <a href="" class="position-relative">
                    ${option}
                  </a>
                </li>
              `).join("")}
            </ul>
          </div>
          <div class="show-sm-desktop show-desktop">
            <div class="menu-title">
              <p>${menuItems.title}</p>
            </div>
            <ul class="links-list">
              ${MenuLinks(menuItems.rightMenuOptions.slice(0, 3))}
            </ul>
          </div>
          <div class="show-sm-desktop show-desktop">
            <ul class="links-list">
              ${MenuLinks(menuItems.rightMenuOptions.slice(3, 6))}
            </ul>
          </div>
          <div class="show-mobile">
            <div class="menu-title">
              <p>${menuItems.title}</p>
            </div>
            <ul class="links-list">
              ${MenuLinks(menuItems.rightMenuOptions)}
            </ul>
          </div>
        </div>
      </section>
    `;

    shadowRoot.append(menuTemplate.content.cloneNode(true));
  }
}

customElements.define("menu-component", Menu);
