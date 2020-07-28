import {
    APPLY_STYLE,
    CHANGE_STYLES,
    CHANGE_TITLE,
    CHANGE_TEXT,
    TABLE_RESIZE,
    UPDATE_DATE
} from './types';

export const tableResize = data => {
    return {
        type: TABLE_RESIZE,
        data
    }
};

export const changeText = data => {
    return {
        type: CHANGE_TEXT,
        data
    }
};


export const changeStyles = data => {
    return {
        type: CHANGE_STYLES,
        data
    }
};

export const applyStyle = data => {
    return {
        type: APPLY_STYLE,
        data
    }
};

export const changeTitle = data => {
    return {
        type: CHANGE_TITLE,
        data
    }
};

export const updateDate = () => {
    return {
        type: UPDATE_DATE,
    }
};


