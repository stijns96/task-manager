class Collapsible extends HTMLElement {
  constructor(el) {
    this.el = el;
    this.el.addEventListener("click", this.toggle.bind(this));
  }

  toggle() {
    this.el.classList.toggle("is-open");
  }

  connectedCallback() {
    this.el.classList.add("collapsible");
  }

  disconnectedCallback() {
    this.el.removeEventListener("click", this.toggle);
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
  }

  adoptedCallback() {
    console.log("adopted");
  }

  get open() {
    return this.hasAttribute("open");
  }
}
