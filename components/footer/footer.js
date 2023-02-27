const footerTemplate = document.createElement("template");
const footerStyleTag = document.createElement("style");
footerStyleTag.innerHTML = "@import url(./components/footer/footer.css)";

const footerLinks = [
  {
    name: "Quick links",
    menuOptions: [
      "About",
      "Solutions",
      "Teams",
      "Transactions",
    ],
  },
  {
    name: "Explore solutions",
    menuOptions: [
      "Asset based lending",
      "Financial sponsors & leveraged finance",
      "Life sciences & technology venture finance",
      "Real estate lending",
      "Lender finance",
      "Franchise finance",
    ],
  },
  {
    name: "Get in touch",
    menuOptions: [
      "Careers",
      "Contact",
      "Investors",
    ],
  },
];

const footerItems = ["Terms & conditions", "Privacy policy", "Do not sell", "Disclaimer"];

const Links = () => (

  footerLinks.map((item) => `
    <div>
      <div class="mb-4">
        <span class="section-title">
          ${item.name}
        </span>
      </div>
      <div>
        <ul class="list">
          ${item.menuOptions.map((option) => `
            <li class="d-flex">
              <a class="link" href="#">${option}</a>
            </li>
          `).join(" ")}
        </ul>
      </div>
    </div>
  `).join("")
);

class Footer extends HTMLElement {

  constructor() {
    super();

    let shadowRoot = this.attachShadow({ mode: "open" });

    footerTemplate.innerHTML = `
      <section>
        <section>
          <div class="container links-container">
            ${Links()}
          </div>
        </section>
        <section class="logo-section">
          <a href="#">
            <img width="316" height="48" src="https://www.midcapfinancial.com/wp-content/uploads/2022/07/midcap-logo-KO-w-tag.svg" class="attachment-large size-large" alt="" loading="lazy">
          </a>
        </section>
        <section class="bottom-section">
          <div class="container justify-content-between">
            <div class="secondary-links">
              <ul class="d-flex flex-wrap bottom-list">
                <li>
                  <span class="d-flex">
                    Copyright ©2022
                    <span class="show-md-desktop show-desktop mx-2">
                      MidCap Financial Services, LLC
                    </span>
                  </span>
                </li>
                <li class="show-mobile">
                  <span>
                    MidCap Financial Services, LLC
                  </span>
                </li>
                ${footerItems.map((item) => `
                  <li class="link bottom-link position-relative mx-2">
                    <a href="#">
                      ${item}
                    </a>
                  </li>
                `).join("")}
              </ul>
            </div>
            <div>
              <a href="#">
                <i class="bi bi-linkedin linkedin-icon"></i>
              </a>
            </div>
          </div>
        </section>
      </section>
    `;

    shadowRoot.append(footerTemplate.content.cloneNode(true), footerStyleTag);
  }
}

customElements.define("footer-component", Footer);
