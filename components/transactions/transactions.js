const transactionsTemplate = document.createElement("template");
const transactionsStyleTag = document.createElement("style");
transactionsStyleTag.innerHTML = "@import url(./components/transactions/transactions.css)";

const transactions = [
  {
    name: "Financial sponsors & leveraged finance",
    type: "Senior credit facility",
    date: "January 2023",
    logo: "2023/01/redwood_software_logo.jpg",
    role: "Admin agent joint lead arranger joint bookrunner",
  },
  {
    name: "Life sciences & technology venture finance",
    type: "Senior credit & revolving facility",
    date: "November 2022",
    logo: "2023/01/VIEW4.png",
    role: "Lead arranger & admin agent",
    proceeds: "Refinance",
    companyName: "Viewray Technologies",
    companyDescription: "Medical devices",
    amount: "$115,000,000",
  },
  {
    name: "Asset based lending",
    type: "Senior revolving credit facility",
    date: "December 2022",
    logo: "2023/01/Trusted.png",
    role: "Sole lender",
    companyDescription: "Healthcare services",
    amount: "$150,000,000",
  },
];

class Transactions extends HTMLElement {

  constructor() {
    super();

    let shadowRoot = this.attachShadow({ mode: "open" });

    transactionsTemplate.innerHTML = `
      <section class="transactions-section">
        <div class="container">
          <div class="title-container">
            <h2>A proven ability to finance value creation</h2>
          </div>
          <div class="transactions-container">
            <div class="scroll-container">
              <div class="scroll-track">
                ${transactions.map((transaction) => `
                  <div class="transaction-card">
                    <div class="transaction-name">
                      ${transaction.name}
                    </div>
                    <div class="transaction-logo">
                      <img src="https://www.midcapfinancial.com/wp-content/uploads/${transaction.logo}" />
                    </div>
                    <div class="transaction-amount">
                      <h4>
                        ${transaction.amount || ""}
                      </h4>
                      <p>
                        ${transaction.type}
                      </p>
                    </div>
                    <div class="transaction-footer d-flex justify-content-between">
                      <span>
                        ${transaction.date}
                      </span>
                      <div class="details-button position-relative">
                        Details
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#00875E" class="bi bi-chevron-right" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" stroke="#00875E" stroke-width="1.5" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    shadowRoot.append(transactionsTemplate.content.cloneNode(true), transactionsStyleTag);
  }
}

customElements.define("transactions-component", Transactions);
