function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

class StarWarsPeople extends HTMLElement {
  constructor() {
    super();

    this.peopleCount = 0;

    let shadowRoot = this.attachShadow({ mode: "open" });

    shadowRoot.innerHTML = `
      <style>
        h2 {
          margin-bottom: 5px;
          font-size: 2rem;
        }
        .countSummary {
          font-size: 1.6rem;
          color: #868484;
        }
        .hidden {
          display: none;
        }
        ul {
          padding: 5px;
          max-height: 50rem;
          overflow-y: scroll;
          border: #ece9e9 solid 1px;
          font-size: 1.6rem;
        }
        li {
          list-style: none;
        }
        button {
          background-color: #048cfb;
          color: #fff;
          border: 0;
          box-shadow: none;
          border-radius: 0px;
          padding: 1rem 1.5rem;
        }
        button:hover {
            background-color: #0059C8;
        }
      </style>
      <div>
        <h2>Star Wars People</h2>
        <div class="countSummary hidden">Showing <strong class="peopleCount"></strong> out of <strong class="count"></strong></div>
        <ul></ul>
        <button>Load More</button>
      </div>`;

    this.render = people => {
      let frag = document.createDocumentFragment();

      people.forEach(person =>
        frag.appendChild(htmlToElement(`<li>${person.name}</li>`))
      );

      let ul = shadowRoot.querySelector("ul");
      ul.appendChild(frag);

      shadowRoot.querySelector(".peopleCount").textContent = this.peopleCount;
      shadowRoot.querySelector(".count").textContent = this.count;

      ul.scrollTo(0, ul.scrollHeight);

      if (this.count > 0) {
        shadowRoot.querySelector(".countSummary").classList.remove("hidden");
      }

      if (this.count === this.peopleCount) {
        shadowRoot.querySelector("button").remove();
      }
    };

    this.getPeople = url => {
      fetch(this.next || this.url)
        .then(response => response.json())
        .then(json => {
          this.next = json.next;
          this.count = json.count;
          this.peopleCount += json.results.length;
          this.render(json.results);
        });
    };

    shadowRoot.querySelector("button").addEventListener("click", e => {
      this.getPeople(this.next || this.url);
    });

    this.url = "https://swapi.co/api/people";
    this.next = "";
  }

  connectedCallback() {
    this.getPeople(this.next || this.url);
  }
}

customElements.define("star-wars-people", StarWarsPeople);
