import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
        this.prepare();
        this.emitter = options.emitter;
        this.store = options.store;
        this.unSubscribers = [];
        this.subscribe = options.subscribe || []
    }

    prepare() {}

    // Возвращает шаблон компонента
    toHTML() {
        return '';
    }

    $emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }

    $on(event, fn) {
        const unSub = this.emitter.subscribe(event, fn);
        this.unSubscribers.push(unSub);
    }

    $dispatch(action) {
        this.store.dispatch(action);
    }

    storeChange() {}

    isWatching(key) {
        return this.subscribe.includes(key);
    }

    $getState() {
        return this.store.getState();
    }

    init() {
        this.initDomListeners();
    }

    destroy() {
        this.removeDomListeners();
        this.unSubscribers.forEach(unSub => unSub());
    }
}
