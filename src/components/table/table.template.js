import {toInlineStyle} from '@/core/utils';
import {DEFAULT_STYLES} from '@/constants';
import {parse} from '@/core/parse';

const CODES = {
    A: 65,
    Z: 90
};

const DEFAULT_WIDTH = '120px';
const DEFAULT_HEIGHT = '24px';

function getWidth(colState, index) {
    return colState[index] || DEFAULT_WIDTH
}

function getHeight(rowState, index) {
    return rowState[index] || DEFAULT_HEIGHT;
}

function getData(dataState, id) {
    return dataState[id] || ''
}

function toColumn({col, index, width}) {
    return ` <div 
                   class="column"
                   data-type="resizable" 
                   data-col= ${index}
                   style = "width: ${width}"
                   >
              ${col}
               <div class="col-resize" data-resize="col"></div>
           </div>`
}

function toCell(state, row) {
    return function(_, col) {
        const id = `${row}:${col}`;
        const width = getWidth(state.colState, col);
        const data = getData(state.dataState, id);
        const styles = toInlineStyle({
            ...DEFAULT_STYLES,
            ...state.stylesState[id],
        });
        return `
             <div 
                 class="cell" 
                 contenteditable
                 data-value="${data || ''}"
                 data-type="cell" 
                 data-col=${col} 
                 data-id=${id}
                 style = "${styles}; width: ${width}"
                 >
                 ${parse(data) || ''}
            </div>
        `
    }
}

function createRow(content, index = '', state = {}) {
    const height = getHeight(state, index);
    const resize = index
        ? `<div class="row-resize" data-resize="row"></div>`
        : '';
    return `
            <div 
                class="row" 
                data-type="resizable" 
                data-row=${index}
                style = "height: ${height}"
            >
                <div class="row-info">
                    ${index}
                    ${resize}
                </div>
                <div class="row-data">${content}</div>
            </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(index + CODES.A)
}


function withWidthFrom(state) {
    return function(col, index) {
        return {col, index, width: getWidth(state.colState, index)}
    }
}

export function createTable(rowsCount = 15, state) {
    const columnCount = CODES.Z - CODES.A + 1;
    const rows = [];
    const cols = new Array(columnCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(toColumn)
        .join('');

    rows.push(createRow(cols));
    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(columnCount)
            .fill('')
            .map(toCell(state, row))
            .join('');
        rows.push(createRow(cells, row + 1, state.rowState));
    }

    return rows.join('');
}
