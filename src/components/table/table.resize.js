import {$} from '@core/dom'

export function resizeHandler($root, event) {
    return new Promise(resolve => {
        const $resizer = $(event.target);
        const type = $resizer.data.resize;
        const $parent = $resizer.closest('[data-type="resizable"]');
        const coords = $parent.getCoords();
        const colNumber = $parent.data.col;
        const sideProp = type === 'col' ? 'bottom' : 'right';
        let value;
        $resizer.css({
            opacity: 1,
            [sideProp]: '-5000px'
        });
        document.onmousemove = e => {
            if (type === 'col') {
                const delta = e.pageX - coords.right;
                value = coords.width + delta + 'px';
                $resizer.css({right: -delta + 'px'});
            } else {
                const delta = e.pageY - coords.bottom;
                value = coords.height + delta + 'px';
                $resizer.css({bottom: -delta + 'px'});
            }
        };

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
            $resizer.css({
                opacity: 0,
                bottom: 0,
                right: 0
            });
            if (type === 'col') {
                $root
                    .findAll(`[data-col="${colNumber}"]`)
                    .forEach(el => $(el).css({width: value}));
            } else {
                $parent.css({height: value});
            }
            resolve({
                id: $parent.data[type],
                type,
                value,
            })
        }
    })
}

