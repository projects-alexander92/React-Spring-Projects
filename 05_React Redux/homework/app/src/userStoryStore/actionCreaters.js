import * as actionTypes from './actionTypes'

export function addInput(value) {
    return {
        type: actionTypes.ADD_INPUT,
        value: value
    }
}

export function editInput(value) {
    return {
        type: actionTypes.EDIT_INPUT,
        value: value
    }
}

export function deleteLast() {
    return {
        type: actionTypes.DELETE_LAST,
    }
}