import {$} from '@core/dom';
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@/core/storeSubscriber';

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector);
        this.components = options.components || [];
        this.store = options.store;
        this.emitter = new Emitter();
        this.subscriber = new StoreSubscriber(this.store);
    }

    getRoot() {
      const $root = $.create('div', 'excel');
      const componenrOptios = {
        emitter: this.emitter,
        store: this.store
      };
      this.components = this.components.map(Component => {
          const $el = $.create('div', Component.className);
          const component = new Component($el, componenrOptios);
          $el.html(component.toHTML());
          $root.append($el);
          return component;
      });
      return $root;
    }

    render() {
        this.$el.append(this.getRoot());
        this.subscriber.subscribeComponents(this.components);
        this.components.forEach(component => component.init());
    }

    destroy() {
        this.subscriber.unSubscribeFromStore();
        this.components.forEach(component => component.destroy())
    }
}


