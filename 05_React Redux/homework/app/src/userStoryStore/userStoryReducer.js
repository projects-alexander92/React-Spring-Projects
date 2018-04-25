import * as actionTypes from './actionTypes'

let newState = [];
export default function storyReducer(state = [], action) {
    switch (action.type) {
        case actionTypes.ADD_INPUT:
            newState = state.slice();
            newState.push(action.value);
            return newState;
        case actionTypes.EDIT_INPUT:
            newState = state.slice();
            newState[action.value.id] = action.value.value;
            return newState;
        case actionTypes.DELETE_LAST:
            newState = state.slice();
            newState.pop();
            return newState;
    }
}
