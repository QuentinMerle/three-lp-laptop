import EventEmitter from "./EventEmitter.js";

export default class Color extends EventEmitter {
  constructor(items) {
    // Setup
    super();
    this.currentColor = "ffffff";

    // Click event
    for (const item of items) {
      item.addEventListener("click", (event) => {
        this.currentColor = event.target.getAttribute("data-color");
        this.trigger("click");
      });
    }
  }
}
