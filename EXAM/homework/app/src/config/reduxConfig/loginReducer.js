import * as actionTypes from './actionTypes'


export default function loginReducer(state, action) {
    switch (action.type) {
        case (actionTypes.IS_LOGGED_IN):
            const newState = action.isUserLoggedIn;
            return newState;
    }
}