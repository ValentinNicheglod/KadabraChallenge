const navigationTemplate = document.createElement("template");
const desktopMenuImport = document.createElement("template");
const navigationStyleTag = document.createElement("style");
desktopMenuImport.innerHTML = "<script src='components/menu/menu.js'></script>";
navigationStyleTag.innerHTML = "@import url(./components/navigation/navigation.css)";

let navigationItems = [];

const NavigationList = () => (

  navigationItems.map((item) => `
    <li class="navigation-item d-flex align-items-center">
      <a href="#" aria-label="${item.name}" class="link-btn hover-effect">
        ${item.name}
        ${item.menu
          ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-chevron-down menu-icon" viewBox="-2 -2 22 16">
              <path fill-rule="evenodd" stroke="currentColor" stroke-width="1.5" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
              </svg>`
          : ``
        }
      </a>
      ${item.menu 
        ? `<div class="menu-wrapper show-desktop">
            <menu-component 
              menu-data='${JSON.stringify(item.menu)}'
            ></menu-component>
          </div>`
        : ``
      }
    </li>
  `).join("")
);

class Navigation extends HTMLElement {

  constructor() {
    super();

    let shadowRoot = this.attachShadow({ mode: "open" });

    navigationItems = JSON.parse(this.getAttribute("navigation-data"));

    navigationTemplate.innerHTML = `
      <nav role="navigation">
        <ul class="nav flex-column flex-lg-row">
          ${NavigationList()}
        </ul>
      </nav>
    `;

    shadowRoot.append(
      navigationTemplate.content.cloneNode(true), 
      desktopMenuImport.content.cloneNode(true), 
      navigationStyleTag,
    );
  }
}

customElements.define("navigation-component", Navigation);
