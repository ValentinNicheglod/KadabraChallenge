const mobileMenuImport = document.createElement("template");
const navigationDrawerTemplate = document.createElement("template");
const navigationDrawerStyleTag = document.createElement("style");
mobileMenuImport.innerHTML = "<script src='components/menu/menu.js'></script>";
navigationDrawerStyleTag.innerHTML = "@import url(./components/navigationDrawer/navigationDrawer.css";

let drawerItems = [];

const MobileNavigationList = () => (
  
  drawerItems.map((item) => `
    <li class="navigation-item">
      <a
        href="#"
        aria-label="${item.name}"
        name="${item.menu ? item.menu.id : ""}"
        id="${item.menu ? `link-${item.menu.id}` : ""}"
        class="link-btn justify-content-between ${item.menu ? "expandable" : ""}"
      >
        <span class="d-flex">
          ${item.menu
            ? `<i class="bi bi-chevron-left position-absolute start-0"></i>`
            : ``
          }
          <span class="link-span">
            ${item.mobileName ? item.mobileName : item.name}
          </span>
        </span>
        
        ${item.menu
          ? `<i class="bi bi-chevron-right"></i>`
          : ``
        }
      </a>
      ${item.menu
        ? `<div class="menu-wrapper" id="${item.menu.id}">
            <menu-component 
              menu-data='${JSON.stringify(item.menu)}'
            ></menu-component>
           </div>`
        : ``
      }
    </li>
  `).join("")
)

class NavigationDrawer extends HTMLElement {
  
  constructor() {
    super();

    let shadowRoot = this.attachShadow({ mode: "open" });

    drawerItems = JSON.parse(this.getAttribute("navigation-data"));

    navigationDrawerTemplate.innerHTML = `
      <div class="drawer-wrapper" id="wrapper">
        <nav role="navigation">
          <ul>
            ${MobileNavigationList()}
          </ul>
        </nav>
      </div>
    `;

    shadowRoot.append(
      navigationDrawerTemplate.content.cloneNode(true),
      mobileMenuImport.content.cloneNode(true),
      navigationDrawerStyleTag,
    );
  }

  static get observedAttributes() {

    return ["open"];
  }

  connectedCallback() {

    const expandableSections = this.shadowRoot.querySelectorAll(".expandable");
    expandableSections.forEach((section) => {

      section.addEventListener("click", this.handleExpandableMenu)
    })
  }

  attributeChangedCallback(attributeName, oldValue, actualValue) {

    const wrapper = this.shadowRoot.getElementById("wrapper");
    const isMenuOpen = actualValue === "true";
    
    if (attributeName === "open") {

      wrapper.classList[isMenuOpen ? "add" : "remove"]("drawer-active");
    }
  }

  handleExpandableMenu = (event) => {

    const clickedMenu = this.shadowRoot.getElementById(event.target.name);
    const optionLink = this.shadowRoot.getElementById(`link-${event.target.name}`);
    clickedMenu.classList.toggle("menu-active");
    optionLink.classList.toggle("link-active");
  }
}

customElements.define("navigation-drawer", NavigationDrawer);
