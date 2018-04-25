import React, {Component} from 'react';
import Input from "../common/Input";
import ajax from '../../ajax/getAjax'
import $ from 'jquery'
import {Link} from "react-router-dom";

class RegistrationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userRegistrationModel: {
                email: '',
                confirmEmail: '',
                username: '',
                password: '',
                confirmPassword: ''
            },
            fieldClasses: {
                email: 'form-control',
                confirmEmail: 'form-control',
                username: 'form-control',
                password: 'form-control',
                confirmPassword: 'form-control'
            },
            userAllReadyExists: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitRegistrationForm = this.submitRegistrationForm.bind(this);
    }

    handleInputChange(ev) {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        let userRegistrationModel = this.state.userRegistrationModel;
        userRegistrationModel[name] = value;
        this.setState({
            userRegistrationModel: userRegistrationModel
        });
    }

    submitRegistrationForm(ev) {
        ev.preventDefault();
        let user = this.state.userRegistrationModel;
        let fieldClasses = this.state.fieldClasses;
        let sendAjax = true;
        //validate the user
        for (let key in fieldClasses) {
            fieldClasses[key] = 'form-control';
        }

        if (/^\S+@\S+$/.test(user.email) === false) {
            fieldClasses.email = 'form-control is-invalid';
            sendAjax = false;
        }
        if (user.email !== user.confirmEmail) {
            fieldClasses.confirmEmail = 'form-control is-invalid';
            sendAjax = false;
        }
        if (user.username.length < 5) {
            fieldClasses.username = 'form-control is-invalid';
            sendAjax = false;
        }
        if (user.password.length < 8) {
            fieldClasses.password = 'form-control is-invalid';
            sendAjax = false;
        }
        if (user.password !== user.confirmPassword) {
            fieldClasses.confirmPassword = 'form-control is-invalid';
            sendAjax = false;
        }
        this.setState({
            fieldClasses: fieldClasses
        });

        if (sendAjax) {
            let data = {
                username: user.username,
                email: user.email,
                password: user.password
            };
            ajax.post("register", data).then((data, textStatus, xhr) => {
                if (xhr.status === 200) {
                    this.props.history.push("/login")
                } else if (xhr.status === 205) {
                    this.setState({
                        userAllReadyExists: 'User with this name all Ready exists'
                    })
                }
            })
        }

    }

    render() {
        return (
            <div>
                <div className='row justify-content-md-center'>
                    <h3>Register</h3>
                </div>
                <div className='row justify-content-md-center'>
                    <form className='col-md-8'>
                        <h1 style={errorStyle}> {this.state.userAllReadyExists}</h1>
                        <Input inputType={'text'}
                               fieldAttributes={'email'}
                               labelValue={'Enter email'}
                               fieldValue={this.state.userRegistrationModel.email}
                               onChange={this.handleInputChange}
                               fieldClass={this.state.fieldClasses.email}
                               errorMsg={'Must match this pattern ^\\S+@\\S+$'}/>

                        <Input inputType={'text'}
                               fieldAttributes={'confirmEmail'}
                               labelValue={'Confirm Email'}
                               fieldValue={this.state.userRegistrationModel.confirmEmail}
                               onChange={this.handleInputChange}
                               fieldClass={this.state.fieldClasses.confirmEmail}
                               errorMsg={'Emails Mismatch'}/>

                        <Input inputType={'text'}
                               fieldAttributes={'username'}
                               labelValue={'Enter username'}
                               fieldValue={this.state.userRegistrationModel.username}
                               onChange={this.handleInputChange}
                               fieldClass={this.state.fieldClasses.username}
                               errorMsg={'Must be at least 5 symbols long'}/>

                        <Input inputType={'password'}
                               fieldAttributes={'password'}
                               labelValue={'Enter password'}
                               fieldValue={this.state.userRegistrationModel.password}
                               onChange={this.handleInputChange}
                               fieldClass={this.state.fieldClasses.password}
                               errorMsg={'Must be at least 8 symbols long'}/>

                        <Input inputType={'password'}
                               fieldAttributes={'confirmPassword'}
                               labelValue={'Confirm password'}
                               fieldValue={this.state.userRegistrationModel.confirmPassword}
                               onChange={this.handleInputChange}
                               fieldClass={this.state.fieldClasses.confirmPassword}
                               errorMsg={'Passwords do not match'}/>

                        <button className="btn btn-outline-primary btn-block" type="submit"
                                onClick={this.submitRegistrationForm}>Submit form
                        </button>
                        <Link className="btn btn-outline-info btn-block" to="/login" role="button">Allrdy Registerd?</Link>
                    </form>
                </div>
            </div>
        )
    }
}

const errorStyle = {
    color: '#dc3545'
};
export default RegistrationForm;