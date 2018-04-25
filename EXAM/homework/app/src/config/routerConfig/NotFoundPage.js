import React from 'react'
import {Link} from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <div className='container'>
            <div className='row my-5 justify-content-sm-center'>
                <img src="https://www.404.ie/assets/img/logo_blue.png" alt="....."/>
                <h1><Link to={'/'}> {'get back to home'}</Link></h1>
            </div>
        </div>
    )
};
export default NotFoundPage;