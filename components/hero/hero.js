const heroTemplate = document.createElement("template");
const heroStyleTag = document.createElement("style");
heroStyleTag.innerHTML = "@import url(./components/hero/hero.css)";

const statistics = [
  {
    id: "year",
    name: "Year founded",
    value: 2008,
  },
  {
    finalValue: 45,
    id: "capital",
    name: "Commited capital*",
    prefix: "$",
    suffix: "B+",
    value: 0,
  },
  {
    finalValue: 250,
    id: "employees",
    name: "Employees",
    suffix: "+",
    value: 0,
  },
  {
    finalValue: 520,
    id: "transactions",
    name: "Current transactions",
    suffix: "+",
    value: 0,
  },
];

const StatisticsCards = () => (

  statistics.map((item) => `
    <div class="statistics-card">
      <div class="d-flex justify-content-center statistics-value">
        <span>
          ${item.prefix || ""}
        </span>
        <span id="${item.id}-counter">
          ${item.value}
        </span>
        <span>
          ${item.suffix || ""}
        </span>
      </div>
      <div class="d-flex justify-content-center">
        <a href="#" class="statistics-title">
          <span class="position-relative">
            ${item.name}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#00AF74" class="bi bi-chevron-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" stroke="#00AF74" stroke-width=".5" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </a>
      </div>
    </div>
  `).join("")
);

class Hero extends HTMLElement {

  constructor() {
    super();

    let shadowRoot = this.attachShadow({ mode: "open" });

    heroTemplate.innerHTML = `
      <section>
        <section class="hero-section">
          <div class="container hero-container">
            <div>
              <div class="hero-content">
                <h1>Meeting opportunity with creative debt capital to support every need.</h1>
              </div>
            </div>
          </div>
        </section>
        <section class="subhero-section" id="subhero">
          <div class="container position-relative">
            <section class="statistics-section position-relative">
              <div class="statistics-container">
                ${StatisticsCards()}
              </div>
            </section>
          </div>
        </section>
      </section>
    `;

    shadowRoot.append(heroTemplate.content.cloneNode(true), heroStyleTag);
  }

  connectedCallback() {

    this.addEventListener("load", this.loadStatistics());
  }

  loadStatistics = () => {

    const animationDuration = 2000;

    statistics.forEach((indicator) => {

      if (indicator.finalValue) {

        const counter = this.shadowRoot.getElementById(`${indicator.id}-counter`);
        const intervalTime = animationDuration / indicator.finalValue;
        let counterValue = parseInt(counter.textContent);

        const interval = setInterval(() => {

            counterValue++;
            counter.textContent = counterValue;

            if (counterValue === indicator.finalValue) {

              clearInterval(interval);
            }
        }, intervalTime);
      }
    })
  }
}

customElements.define("hero-component", Hero);
