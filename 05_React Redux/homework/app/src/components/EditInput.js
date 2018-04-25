import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actionCreators from '../userStoryStore/actionCreaters'

class EditInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newInputValue: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        let params = this.props.match.params;
        let name = params.name;
        this.setState({
            newInputValue: name
        })
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
        let params = this.props.match.params;
        let id = params.id;
        let obj = {
            value, id
        };
        this.props.editCurrentInput(obj);
        this.props.history.push("/")
    }

    render() {
        let params = this.props.match.params;
        let id = params.id;
        let form;
        if (this.props.allUserInputs !== undefined) {
            form =
                <form>
                    <div className="row my-2 justify-content-sm-center">
                        <div className="col-sm-6">
                            <input type="text"
                                   className="form-control"
                                   name={'newInputValue'}
                                   onChange={this.handleInputChange}
                                   value={this.state.newInputValue}
                                   id={id}/>
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-outline-info" onClick={this.onSubmit}>Edit and
                                return
                            </button>
                        </div>
                    </div>
                </form>
        }
        return (
            <div className='container'>
                {form}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        allUserInputs: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        editCurrentInput: (value) => dispatch(actionCreators.editInput(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditInput);