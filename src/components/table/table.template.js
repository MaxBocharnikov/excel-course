const CODES = {
    A: 65,
    Z: 90
};

function toColumn(columnContent, index) {
    return ` <div class="column" data-type="resizable" data-col=${index}>
                ${columnContent}
                <div class="col-resize" data-resize="col"></div>
            </div>`
}

function toCell(row) {
    return function(_, col) {
        return `
             <div 
                 class="cell" 
                 contenteditable
                 data-type="cell" 
                 data-col=${col} 
                 data-id=${row}:${col}>
            </div>
        `
    }
}

function createRow(content, index = '') {
    const resize = index
        ? `<div class="row-resize" data-resize="row"></div>`
        : '';
    return `
            <div class="row" data-type="resizable">
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

export function createTable(rowsCount = 15) {
    const columnCount = CODES.Z - CODES.A + 1;
    const rows = [];
    const cols = new Array(columnCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('');
    rows.push(createRow(cols));
    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(columnCount)
            .fill('')
            //.map((_, col) => toCell(row, col))
            .map(toCell(row))
            .join('');
        rows.push(createRow(cells, row + 1));
    }

    return rows.join('');
}
