export default class Store {
    state = {};
    callbacks = [];

    constructor(state) {
        this.state = { ...state };
    }

    set(newState) {
        this.state = { ...this.state, ...newState };
        this.callbacks.forEach(callback => callback(this.state));
    }

    get(key) {
        return this.state[key];
    }

    subscribe(callback) {
        this.callbacks.push(callback);
    }
}
