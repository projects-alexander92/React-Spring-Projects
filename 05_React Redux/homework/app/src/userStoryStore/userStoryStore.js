import {createStore, applyMiddleware} from 'redux'
import storyReducer from './userStoryReducer'
import logger from 'redux-logger'

const myLogger = (store) => (next) => (action) => {
    console.log('action logged ' + action);
    next(action);
};
const store = createStore(storyReducer, [], applyMiddleware(logger));

export default store;