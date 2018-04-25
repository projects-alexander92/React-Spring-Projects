import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './userStoryStore/userStoryStore'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();



