import {DEFAULT_STYLES, DEFAULT_TITLE} from '@/constants';
import {clone} from '@/core/utils';

const defaultState = {
    title: DEFAULT_TITLE,
    currentText: '',
    colState: {},
    rowState: {},
    stylesState: {},
    dataState: {},
    currentStyles: DEFAULT_STYLES,
    openedDate: new Date().toJSON()
};

const normalize = state => ({
    ...state,
    currentStyles: DEFAULT_STYLES,
    currentText: '',
});


export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState);
}
