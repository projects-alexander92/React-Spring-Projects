import $ from 'jquery'

let ajax = (function () {
    const baseUrl = 'http://localhost:8080/';
    return {
        get: (url, dataType) => {
            let ajaxParams = {
                type: 'GET',
                url: baseUrl + url,
                dataType: dataType
            };
            return $.ajax(ajaxParams);
        }
    }
}());

export default ajax;