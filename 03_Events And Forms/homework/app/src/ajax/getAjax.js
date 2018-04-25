import $ from 'jquery'

let ajax = (function () {
    const baseUrl = 'http://localhost:8080/';
    return {
        get: (url, dataType, auth) => {
            let ajaxParams = {
                async: true,
                url: baseUrl + url,
                method: 'GET',
                dataType: dataType,
                headers: {
                    "authorization": auth || ''
                }
            };
            return $.ajax(ajaxParams);
        },
        post: (url, data, auth) => {
            const ajaxParams = {
                async: true,
                url: baseUrl + url,
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                    "authorization": auth || ''
                },
                data: JSON.stringify(data)
            };
            console.log(ajaxParams);
            return $.ajax(ajaxParams)
        }
    }
}());

export default ajax;