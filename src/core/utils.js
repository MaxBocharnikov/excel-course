export function capitalize(string) {
    if (typeof string !== 'string') return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, end) {
    if (start > end) {
        [end, start] = [start, end]
    }
    const rangeArr = new Array(end - start + 1)
        .fill('')
        .map((_, index) => start + index);
    return rangeArr;
}

export function storage(key, data = null) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key))
    } else {
       localStorage.setItem(key, JSON.stringify(data));
    }
}

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
}

export function camelToDashCase(str) {
    return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
}

export function toInlineStyle(style = {}) {
    return Object.keys(style)
        .map(key => `${camelToDashCase(key)}: ${style[key]}`)
        .join(';');
}

export function debounce(fn, wait) {
  let timeout;
  return function(...args) {
      const later = () => {
          clearTimeout(timeout);
          //eslint-disable-next-line
          fn.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
  }
}

