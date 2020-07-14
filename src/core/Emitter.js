export class Emitter {
    constructor() {
        this.listeners = {};
    }

    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false;
        }
        this.listeners[event].forEach(listener => {
            listener(...args);
        });
        return true;
    }

    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);

        return () => {
            this.listeners[event] =
                this.listeners[event].filter(listener => listener !== fn)
        }
    }
}
// Example
// const emitter = new Emitter();
//
// const unSub = emitter.subscribe('click', (data) => console.log('sub', data));
// emitter.subscribe('click', (data) => console.log('sub2', data));
//
//
// emitter.emit('click', 24);
// emitter.emit('123', 222);
//
// setTimeout(() => {
//     emitter.emit('click', 'after 2 sec');
// }, 2000);
//
// setTimeout(() => {
//     unSub();
// }, 3000);
//
// setTimeout(() => {
//     emitter.emit('click', 'after 4 sec');
// }, 4000);
