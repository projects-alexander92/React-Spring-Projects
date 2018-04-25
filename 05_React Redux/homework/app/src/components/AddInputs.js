import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from "../userStoryStore/actionCreaters";
import {Link} from 'react-router-dom'

class AddInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newInputValue: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteLastInput = this.deleteLastInput.bind(this);
    }

    handleInputChange(ev) {
        const target = ev.target;
        let inputValue = target.value;
        this.setState({
            newInputValue: inputValue
        })
    }

    onSubmit(ev) {
        ev.preventDefault();
        let value = this.state.newInputValue;
        if (value === '' || value === undefined) {
            return;
        }
        this.props.addNewInput(value);
        this.setState({
            newInputValue: ''
        })
    }

    deleteLastInput() {
        let id = this.props.allUserInputs.length - 1;
        this.props.deleteLast(id);
    }

    render() {
        let formsArray;
        if (this.props.allUserInputs !== undefined) {
            formsArray = this.props.allUserInputs.map((e, i) => {
                return (
                    <form key={i}>
                        <div className="row my-2 justify-content-sm-center">
                            <div className="col-sm-6">
                                <input type="text"
                                       className="form-control"
                                       name={'newInputValue'}
                                       id={i}
                                       value={e}
                                       readOnly={true}/>
                            </div>
                            <div className="col-sm-2">
                                <Link className="btn btn-primary" to={'/edit/' + i + '/' + e} role="button">Edit</Link>
                            </div>
                        </div>
                    </form>
                )
            })
        }
        return (
            <div className="container">
                <form>
                    <div className="row my-2 justify-content-sm-center">
                        <div className="col-sm-6">
                            <input type="text"
                                   className="form-control"
                                   placeholder="First name"
                                   name={'newInputValue'}
                                   onChange={this.handleInputChange}
                                   value={this.state.newInputValue}
                                   required={true}/>
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-outline-info" onClick={this.onSubmit}>Add input
                            </button>
                        </div>
                    </div>
                </form>
                {formsArray}
                <div className="row my-2 justify-content-sm-center">
                    <button type="button"
                            className="btn btn-outline-danger"
                            onClick={this.deleteLastInput}>
                        Delete last
                    </button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        allUserInputs: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addNewInput: (value) => dispatch(actionCreators.addInput(value)),
        deleteLast: () => dispatch(actionCreators.deleteLast())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddInput);