import React, {Component} from 'react'
import Input from "../common/Input"
import ajax from '../../config/ajax/getAjax'
import {Link} from "react-router-dom"

class RegistrationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userRegistrationModel: {
                username: '',
                password: '',
                confirmPassword: ''
            },
            fieldClasses: {
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

        if (!/^[a-zA-Z]{3,}$/.test(user.username)) {
            fieldClasses.username = 'form-control is-invalid';
            sendAjax = false;
        }

        if (!/^[\w]{6,}$/.test(user.password)) {
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
                <div className='row justify-content-md-center  mt-2' style={style}>
                    <h3>Register</h3>
                </div>
                <div className='row justify-content-md-center mt-2' style={style}>
                    <form className='col-md-5'>
                        <h1 style={errorStyle}> {this.state.userAllReadyExists}</h1>

                        <Input inputType={'text'}
                               fieldAttributes={'username'}
                               labelValue={'Enter username'}
                               fieldValue={this.state.userRegistrationModel.username}
                               onChange={this.handleInputChange}
                               fieldClass={this.state.fieldClasses.username}
                               errorMsg={'Must contain at least 3 chars and no digits or special symbols'}/>

                        <Input inputType={'password'}
                               fieldAttributes={'password'}
                               labelValue={'Enter password'}
                               fieldValue={this.state.userRegistrationModel.password}
                               onChange={this.handleInputChange}
                               fieldClass={this.state.fieldClasses.password}
                               errorMsg={'Must be at least 6 symbols long and can contain only digits and letters'}/>

                        <Input inputType={'password'}
                               fieldAttributes={'confirmPassword'}
                               labelValue={'Confirm password'}
                               fieldValue={this.state.userRegistrationModel.confirmPassword}
                               onChange={this.handleInputChange}
                               fieldClass={this.state.fieldClasses.confirmPassword}
                               errorMsg={'Passwords do not match'}/>

                        <button className="btn btn-secondary btn-block" type="submit"
                                onClick={this.submitRegistrationForm}>Submit form
                        </button>
                        <Link className="btn btn-secondary btn-block mb-2" to="/login" role="button">All ready
                            Registered?</Link>
                    </form>
                </div>
            </div>
        )
    }
}

const style = {
    backgroundColor: '#C3E6CB'
};
const errorStyle = {
    color: '#dc3545'
};
export default RegistrationForm;