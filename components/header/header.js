const headerTemplate = document.createElement("template");
const navigationBar = document.createElement("template");
const mobileNavigation = document.createElement("template");
const headerStyleTag = document.createElement("style");
navigationBar.innerHTML = "<script src='components/navigation/navigation.js'></script>";
mobileNavigation.innerHTML = "<script src='components/navigationDrawer/navigationDrawer.js'></script>";
headerStyleTag.innerHTML = "@import url(./components/header/header.css)";

const rightMenuOptions = [
  "Asset based lending",
  "Financial sponsors & leveraged finance",
  "Life sciences & technology venture finance",
  "Real estate lending",
  "Lender finance",
  "Franchise finance",
];

const navigationData = [
  {
    name: "About",
  },
  {
    name: "Solutions",
    menu: {
      leftMenuOptions: ["Our approach"],
      rightMenuOptions,
      title: "Explore solutions",
      id: "solutions",
    },
  },
  {
    name: "Meet the Team",
    mobileName: "Teams",
    menu: {
      leftMenuOptions: ["Executive leadership <br> + Apollo advisors", "Corporate & <br> Infrastructure"],
      rightMenuOptions,
      title: "Teams by solution",
      id: "teams",
    },
  },
  {
    name: "Transactions",
    menu: {
      leftMenuOptions: ["All transactions"],
      rightMenuOptions,
      title: "Transactions by solution",
      id: "transactions",
    },
  },
];

class Header extends HTMLElement {

  constructor() {
    super();

    let shadowRoot = this.attachShadow({ mode: "open" });

    headerTemplate.innerHTML = `
      <section class='d-flex flex-row align-items-center justify-content-between'>
        <div class="show-sm-desktop show-mobile">
          <button class="menu-button" id="menu-button">
            <i class="bi bi-list"></i>
          </button>
        </div>
        <a href='/' title='Home' rel='Home'>
          <img 
            src="https://www.midcapfinancial.com/wp-content/uploads/2022/07/midcap-logo.svg" 
            alt="MidCap Financial Logo"
            class="logo"
          />
        </a>
        <navigation-component 
          navigation-data='${JSON.stringify(navigationData)}' 
          class="show-desktop"
        ></navigation-component>
        <div>
          <ul class="nav right-nav">
            <li class="show-desktop my-auto">
              <a href="#" aria-label="Careers" class="link-btn hover-effect">
                Careers
              </a>
            </li>
            <li class="show-desktop my-auto">
              <a href="#" aria-label="Contact" class="link-btn hover-effect">
                Contact
              </a>
            </li>
            <li>
              <a href="#" aria-label="Search" class="link-btn">
                <i class="bi bi-search"></i>
              </a>
            </li>
          </ul>
        </div>
      </section>
      <navigation-drawer
        id="drawer" 
        open="false"
        navigation-data='${JSON.stringify([...navigationData, {name: "Careers"}, {name: "Contact"}])}'
        class="show-sm-desktop show-mobile"
      ></navigation-drawer>
    `;

    shadowRoot.append(
      headerTemplate.content.cloneNode(true), 
      navigationBar.content.cloneNode(true), 
      mobileNavigation.content.cloneNode(true),
      headerStyleTag,
    );
  
    this.menuButton = shadowRoot.getElementById("menu-button");
    this.drawer = shadowRoot.getElementById("drawer");
    this.menuButton.addEventListener("click", this.handleMenuState);

    this.isMenuOpen = false;
  }

  handleMenuState = () => {

    this.isMenuOpen = !this.isMenuOpen;
    this.drawer.setAttribute("open", this.isMenuOpen);
    this.menuButton.innerHTML = `<i class="${this.isMenuOpen ? "bi bi-x-lg" : "bi bi-list"}"></i>`;
  }
}

customElements.define("header-component", Header);
