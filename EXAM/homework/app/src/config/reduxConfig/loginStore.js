import {createStore, applyMiddleware} from 'redux'
import loginReducer from './loginReducer'

let isLoggedIn = true;
if (sessionStorage.getItem('userName') === null) {
    isLoggedIn = false;
}
const store = createStore(loginReducer, isLoggedIn, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;