class CardTitle extends HTMLElement {
    constructor() {
      super();
  
      let shadowRoot = this.attachShadow({ mode: "open" });
  
      shadowRoot.innerHTML = `
      <style>
        h2 {
          margin-bottom: 5px;
          font-size: 2rem;
       }
      span {
        display: none;
      }
      </style>
      <h2>${this.getAttribute("text")}</h2>
    `;

    }
  }
  
  customElements.define("card-title", CardTitle);