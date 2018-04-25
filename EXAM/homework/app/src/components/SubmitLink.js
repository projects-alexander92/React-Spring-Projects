import React, {Component} from 'react';
import Input from "./common/Input";
import ajax from '../config/ajax/getAjax'


class SubmitLink extends Component {
    constructor(props) {
        super(props);

        this.state = {
            linkModel: {
                title: '',
                linkUrl: '',
                imageUrl: '',
                optionalComment: ''
            },
            fieldClasses: {
                title: 'form-control',
                linkUrl: 'form-control',
                imageUrl: 'form-control'
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        let token = sessionStorage.getItem('userToken');
        if (token === null) {
            this.props.history.push("login")
        }
    }

    handleInputChange(ev) {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        let linkModel = this.state.linkModel;
        linkModel[name] = value;
        this.setState({
            linkModel: linkModel
        });
    }

    submitForm(ev) {
        ev.preventDefault();
        let linkModel = this.state.linkModel;
        let fieldClasses = this.state.fieldClasses;
        let sendAjax = true;
        for (let key in fieldClasses) {
            fieldClasses[key] = 'form-control';
        }
        if (!/^http.+$/.test(linkModel.linkUrl)) {
            fieldClasses.linkUrl = 'form-control is-invalid';
            sendAjax = false;
        }
        if (linkModel.title.length < 5) {
            fieldClasses.title = 'form-control is-invalid';
            sendAjax = false;
        }
        //Uncomment to add validation to the Link Thumbnail image url
        // if (linkModel.imageUrl.length < 5) {
        //     fieldClasses.imageUrl = 'form-control is-invalid';
        //     sendAjax = false;
        // }
        this.setState({
            fieldClasses: fieldClasses
        });
        if (sendAjax) {
            ajax.post('links/add', linkModel, sessionStorage.getItem('userToken')).then(() => {
                this.props.history.push("catalog")
            }).catch((e) => {
                console.log(e);
            })
        }
    }

    render() {
        return (
            <span>
            <div className='row justify-content-md-center mt-4' style={style}>
                <h1 className='col-12'>Submit Link</h1>
                <h6 className='col-12'>Please, fill out the form. A thumbnail image and optional comment are not required</h6>
            </div>
            <div className='row justify-content-md-center mt-4' style={style}>
                <form className='col-md-6 my-2'>
                    <Input inputType={'text'}
                           fieldAttributes={'linkUrl'}
                           labelValue={'Link URL'}
                           fieldValue={this.state.linkModel.linkUrl}
                           onChange={this.handleInputChange}
                           fieldClass={this.state.fieldClasses.linkUrl}
                           errorMsg={'Must start with http, and have some letters after it'}/>

                    <Input inputType={'text'}
                           fieldAttributes={'title'}
                           labelValue={'Link Title'}
                           fieldValue={this.state.linkModel.title}
                           onChange={this.handleInputChange}
                           fieldClass={this.state.fieldClasses.title}
                           errorMsg={'Must be at least 5 symbols long'}/>

                    <Input inputType={'text'}
                           fieldAttributes={'imageUrl'}
                           labelValue={'Link Thumbnail Image (optional)'}
                           fieldValue={this.state.linkModel.imageUrl}
                           onChange={this.handleInputChange}
                           fieldClass={this.state.fieldClasses.imageUrl}
                           errorMsg={'Must be at least 5 symbols long'}/>

                    <div className="form-group">
                        <label htmlFor="optionalComment">Optional comment</label>
                        <textarea className="form-control"
                                  name={'optionalComment'}
                                  id="optionalComment" rows="5"
                                  onChange={this.handleInputChange}
                                  placeholder={'Add an optional Comment if you wish'}
                                  value={this.state.linkModel.optionalComment}/>
                    </div>
                    <button type="submit" className="btn btn-secondary mb-2 btn-block" onClick={this.submitForm}>Submit
                        Link
                    </button>
                </form>
            </div>
        </span>
        )
    }
}

const style = {
    backgroundColor: '#C3E6CB'
};
export default SubmitLink;