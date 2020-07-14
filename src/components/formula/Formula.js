import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        });
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div 
            class="input" 
            data-type="input" 
            contenteditable 
            spellcheck="false"> 
            </div>
        `
    }

    init() {
        super.init();
        this.$formula = this.$root.find('[data-type="input"]');
        this.$on('table:select', text => this.$formula.text(text.text()));
        this.$on('table:input', text => this.$formula.text(text.text()));
    }

    onInput(event) {
        this.$emit('formula:input', $(event.target).text());
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab'];
        if (keys.includes(event.key)) {
            event.preventDefault();
            this.$emit('formula:done');
        }
    }
}
