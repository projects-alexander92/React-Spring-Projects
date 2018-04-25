import React, {Component} from 'react'
import Input from "../common/Input"
import ajax from '../../config/ajax/getAjax'
import {Link} from "react-router-dom"
import * as actionCreators from "../../config/reduxConfig/actionCreators";
import {connect} from "react-redux";


class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userLoginModel: {
                username: '',
                password: '',
            },
            invalidCredentials: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitLoginForm = this.submitLoginForm.bind(this);

    }

    handleInputChange(ev) {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        let userLoginModel = this.state.userLoginModel;
        userLoginModel[name] = value;
        this.setState({
            userLoginModel: userLoginModel
        });
    }

    submitLoginForm(ev) {
        ev.preventDefault();
        ajax.post("authenticate", this.state.userLoginModel).then((data, textStatus, xhr) => {
            if (textStatus === 'success') {
                let token = "Bearer " + data.id_token;
                sessionStorage.clear();
                sessionStorage.setItem('userToken', token);
                sessionStorage.setItem('userName', this.state.userLoginModel.username);
                this.setState({
                    invalidCredentials: ''
                });
                this.props.logIn(true);
                this.props.history.push("/")
            }
        }).catch(() => {
            this.setState({
                invalidCredentials: 'Invalid Credentials'
            })
        })
    }

    render() {
        let isLoggedIn = sessionStorage.getItem('userName') !== null;
        if (isLoggedIn || (this.props.isLoggedIn !== undefined && this.props.isLoggedIn)) {
            this.props.history.push("/")
        }
        return (
            <div>
                <div className='row justify-content-md-center mt-2' style={style}>
                    <h3>Log in</h3>
                </div>
                <div className='row justify-content-md-center mt-2' style={style}>
                    <form className='col-md-4'>
                        <h1 style={errorStyle}> {this.state.invalidCredentials}</h1>
                        <Input inputType={'text'}
                               fieldAttributes={'username'}
                               labelValue={'Enter username'}
                               fieldValue={this.state.userLoginModel.username}
                               onChange={this.handleInputChange}
                               fieldClass={'form-control'}
                               errorMsg={'Must be at least 5 symbols long'}/>

                        <Input inputType={'password'}
                               fieldAttributes={'password'}
                               labelValue={'Enter password'}
                               fieldValue={this.state.userLoginModel.password}
                               onChange={this.handleInputChange}
                               fieldClass={'form-control'}
                               errorMsg={'Must be at least 8 symbols long'}/>

                        <button className="btn btn-secondary btn-block" type="submit"
                                onClick={this.submitLoginForm}>Login
                        </button>
                        <Link className="btn btn-secondary btn-block mb-2" to="/register" role="button">Register</Link>
                    </form>
                </div>
            </div>
        )
    }
}

const errorStyle = {
    color: '#dc3545'
};

const style = {
    backgroundColor: '#C3E6CB'
};

function mapStateToProps(state) {
    return {
        isLoggedIn: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logIn: (value) => dispatch(actionCreators.adjustLoginMenu(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);