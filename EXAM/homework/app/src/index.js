import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './config/reduxConfig/loginStore'
import './css/main.css'
import $ from 'jquery'
import toastr from 'toastr'
import toastrOptions from './config/toastrOptions/toastrOptions'

toastr.options = toastrOptions.defaultAjaxOptions;
$(document).ajaxSuccess((e, response) => {
    toastr.success(response.status)
});
$(document).ajaxError((e, response) => {
    if (response.status === 0) {
        toastr.error(403);
    } else {
        toastr.error(response.status);
    }
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
