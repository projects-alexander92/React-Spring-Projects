import * as actionTypes from './actionTypes'

export function adjustLoginMenu(value) {
    return {
        type: actionTypes.IS_LOGGED_IN,
        isUserLoggedIn: value
    }
}