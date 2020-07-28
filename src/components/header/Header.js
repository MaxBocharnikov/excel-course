import {ExcelComponent} from '@core/ExcelComponent';
import * as actions from '@/redux/actions';
import {$} from '@/core/dom';
import {DEFAULT_TITLE} from '@/constants';
import {debounce} from '@/core/utils';
import {ActiveRoute} from '@/core/routes/ActiveRoute';

export class Header extends ExcelComponent {
    static className = 'excel__header';
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        })
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300)
    }

    toHTML() {
        const title = this.$getState().title || DEFAULT_TITLE;
        return `
            <input 
            type="text" 
            class="input" 
            value="${title}"
            >
            <div>
                <div class="button" data-button="remove">
                    <span data-button="remove" class="material-icons">
                        delete
                    </span>
                </div>
                
                <div class="button" data-button="exit">
                   <span class="material-icons" data-button="exit">
                        exit_to_app
                   </span>
                </div>
            </div>
        `
    }

    onInput(event) {
        const $target = $(event.target);
        this.$dispatch(actions.changeTitle($target.text()))
    }

    onClick(event) {
        const $target = $(event.target);
        const button = $target.data.button;
        if (button === 'remove') {
            const decision =
                confirm('Вы действительно хотите удалить эту таблицу?');
            if (decision) {
                localStorage.removeItem('excel:' + ActiveRoute.param);
                ActiveRoute.navigate('#');
            }
        } else if (button === 'exit') {
            ActiveRoute.navigate('#');
        }
    }
}
