const CODES = {
    A: 65,
    Z: 90
};

function toColumn(columnContent) {
    return ` <div class="column">${columnContent}</div>`
}

function toCell() {
    return `<div class="cell" contenteditable></div>`
}

function createRow(content, index = '') {
    return `
            <div class="row">
                <div class="row-info">${index}</div>
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
    for (let i = 1; i <= rowsCount; i++) {
        const cells = new Array(columnCount)
            .fill('')
            .map(toCell)
            .join('');
        rows.push(createRow(cells, i));
    }
    return rows.join('');
}
