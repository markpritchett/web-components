import { buttonCss } from "../css.js";

class CopyToClipboardButton extends HTMLElement {
  constructor() {
    super();

    let shadowRoot = this.attachShadow({ mode: "open" });

    shadowRoot.innerHTML = `
      <style>
        ${buttonCss}
        span {
          display: none;
        }
      </style>
      <button disabled>Copy</button>
      <span>Copied</span>
    `;

    let button = shadowRoot.querySelector("button");

    let targetControl = document.querySelector(
      this.getAttribute("data-target")
    );

    targetControl.addEventListener("input", e => {
      if (button.textContent === "Copied!") {
        button.textContent = "Copy";
      }
      if (e.srcElement.value.length === 0 && !button.hasAttribute("disabled")) {
        button.setAttribute("disabled", "disabled");
      }
      if (e.srcElement.value.length > 0 && button.hasAttribute("disabled")) {
        button.removeAttribute("disabled");
      }
    });

    this.addEventListener("click", e => {
      targetControl.select();

      document.execCommand("Copy");
      button.textContent = "Copied!";
    });
  }
}

customElements.define("copy-to-clipboard-button", CopyToClipboardButton);
