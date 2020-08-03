import {$} from '../dom';
import {ActiveRoute} from './ActiveRoute';

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selector is not provided in Router');
        }

        this.page = null;
        this.$placeholder = $(selector);
        this.routes = routes;

        this.changePageHandler = this.changePageHandler.bind(this);

        this.init();
    }

    init() {
        window.addEventListener('hashchange', this.changePageHandler);
        this.changePageHandler();
    }

    changePageHandler() {
        this.clearPage();
        const Page = ActiveRoute.path.includes('excel')
            ? this.routes.excel
            : this.routes.dashboard;
        this.page = new Page(ActiveRoute.param);
        this.$placeholder.append(this.page.getRoot());
        this.page.afterRender();
    }

    clearPage() {
        this.$placeholder.clear();
        if (this.page) this.page.destroy();
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler)
    }
}
