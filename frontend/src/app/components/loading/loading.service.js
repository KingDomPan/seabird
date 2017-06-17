export default class Loading {

  constructor() {
    this.events = {};
  }

  on(event, cb) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(cb);
  }

  trigger(event) {
    if (!this.events[event]) {
      return;
    }
    this.events[event].map((cb) => {
      cb();
    });
  }

  show() {
    this.trigger('show');
  }

  hide() {
    this.trigger('hide');
  }

}
