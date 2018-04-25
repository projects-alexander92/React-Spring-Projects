import React, {Component} from 'react';
import Input from "../common/Input";
import ajax from "../../ajax/getAjax"
import {Link} from "react-router-dom";

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
                this.setState({
                    invalidCredentials: ''
                });
                this.props.history.push("/pokemon")
            }
        }).catch(() => {
            this.setState({
                invalidCredentials: 'Invalid Credentials'
            })
        })
    }

    render() {

        return (
            <div>
                <div className='row justify-content-md-center'>
                    <h3>Log in</h3>
                </div>
                <div className='row justify-content-md-center'>
                    <form className='col-md-8'>
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

                        <button className="btn btn-outline-info btn-block" type="submit"
                                onClick={this.submitLoginForm}>Login
                        </button>
                        <Link className="btn btn-outline-primary btn-block" to="/register" role="button">Register</Link>
                    </form>
                </div>
            </div>
        )
    }
}

const errorStyle = {
    color: '#dc3545'
};
export default LoginForm;