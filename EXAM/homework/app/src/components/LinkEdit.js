import React, {Component} from 'react';
import ajax from '../config/ajax/getAjax'
import Input from "./common/Input";

class LinkEdit extends Component {
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
        this.submitLinkForm = this.submitLinkForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        ajax.get('links/details/' + id, 'json', sessionStorage.getItem('userToken')).then((e) => {
            this.setState({
                linkModel: e
            })
        })
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

    submitLinkForm(ev) {
        ev.preventDefault();
        let sendAjax = true;
        let linkModel = this.state.linkModel;
        let fieldClasses = this.state.fieldClasses;
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
        this.setState({
            fieldClasses: fieldClasses
        });
        if (sendAjax) {
            let id = this.props.match.params.id;
            let token = sessionStorage.getItem('userToken');
            let data = this.state.linkModel;

            ajax.put('links/edit/' + id, data, token).then(() => {
                this.props.history.push("/my-posts")
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    render() {
        return (
            <span>
                <div className='row justify-content-md-center my-4' style={style}>
                    <h1 className='col-sm-12'>Edit post</h1>
                    <h6 className='col-sm-12'>Please fill out the form, a thumb nail image and optional comment is not required</h6>
                </div>
            <div className='row justify-content-md-center' style={style}>
                <form className='col-md-5 my-2'>
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
                                  placeholder={'add an optional comment if you wish'}
                                  value={this.state.linkModel.optionalComment}/>
                    </div>
                    <button type="submit" className="btn btn-secondary btn-block my-2" onClick={this.submitLinkForm}>Submit
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

export default LinkEdit;