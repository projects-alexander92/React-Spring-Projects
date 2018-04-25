import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actionCreators from '../config/reduxConfig/actionCreators'

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.initLogout = this.initLogout.bind(this);
    }

    initLogout(ev) {
        ev.preventDefault();
        sessionStorage.clear();
        this.props.logOut(false);
        window.location.href = '/';
    }

    render() {
        let navMenu;
        let isLoggedIn = this.props.isLoggedIn;
        let username = sessionStorage.getItem('userName');

        if ((isLoggedIn !== undefined && isLoggedIn) || username !== null) {
            navMenu =
                <form className="form-inline my-2 my-lg-0">
                    <Link className="btn btn-outline-danger my-2 my-sm-0" to="/"
                          role="button" onClick={this.initLogout}>Logout {username}</Link>
                </form>
        } else {
            navMenu =
                <span>
                <Link className="btn btn-outline-success my-2 my-sm-0 mr-2" to="/login"
                      role="button">Login</Link>
                <Link className="btn btn-outline-primary my-2 my-sm-0 mr-2" to="/register"
                      role="button">Register</Link>
                </span>
        }
        return (
            <div className='row'>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark col-sm-12">
                    <Link className="navbar-brand" to="/">SeenIt</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        Toggle Menu
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/catalog">Catalog</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/submit-link">Submit Link</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/my-posts">My posts</Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            {navMenu}
                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isLoggedIn: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logOut: (value) => dispatch(actionCreators.adjustLoginMenu(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);