import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {shouldResize, isCell, matrix, nextSelector} from './table.functions';
import {TableSelection} from './TableSelection';
import * as actions from '@/redux/actions';
import {DEFAULT_STYLES} from '@/constants';
import {parse} from '@/core/parse';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }

    toHTML() {
        return createTable(20, this.$getState());
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        this.selectCell(this.$root.find('[data-id="0:0"]'));
        this.$on('formula:input', value => {
            this.selection.current
                .attr('data-value', value)
                .text(parse(value));
            this.updateTextInStore(value);
        });
        this.$on('formula:done', () => {
            this.selection.current.focus();
        });
        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value);
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }));
        });
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);
        const styles = $cell.getStyles(Object.keys(DEFAULT_STYLES));
        this.$dispatch(actions.changeStyles(styles));
    }

    selectGroup($cells) {
        this.selection.select(this.selection.current);
        this.selection.selectGroup($cells);
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event);
            this.$dispatch(actions.tableResize(data));
        } catch (e) {
            console.warn(e.message);
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event);
        } else if (isCell(event)) {
            const $target = $(event.target);
            if (event.shiftKey) {
              const $cells = matrix($target, this.selection.current)
                  .map(id =>this.$root.find(`[data-id="${id}"]`));
              this.selectGroup($cells);
            } else {
                this.selectCell($target);
            }
        }
    }

    onKeydown(event) {
       const keys = [
           'ArrowLeft',
           'ArrowUp',
           'ArrowRight',
           'ArrowDown',
           'Tab',
           'Enter'
       ];
       const key = event.key;
       if (keys.includes(key) && !event.shiftKey) {
           event.preventDefault();
           const id = this.selection.current.id(true);
           const $next = this.$root.find(nextSelector(key, id));
           this.selectCell($next);
       }
    }

    updateTextInStore(text) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value: $(event.target).text()
        }));
    }

    onInput(event) {
        const text = $(event.target).text();
        this.updateTextInStore(text);
    }
}

