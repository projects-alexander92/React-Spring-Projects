import React, {Component} from 'react';
import ajax from '../config/ajax/getAjax'
import {Link} from 'react-router-dom'
import covertDate from '../config/dateFormatter/dateFormatter'

class LinkDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            linkDetails: {
                id: -1,
                imageUrl: '',
                submissionDate: '',
                title: '',
                username: '',
                comments: []
            },
            newCommentValue: '',
            isCommentValid: true
        };
        this.addNewComment = this.addNewComment.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.deleteLink = this.deleteLink.bind(this);
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        let userToken = sessionStorage.getItem('userToken');
        ajax.get('links/details/' + id, 'json', userToken).then((response) => {
            console.log(response);
            this.setState({
                linkDetails: response
            })
        })
    }

    handleInputChange(ev) {
        let target = ev.target;
        let value = target.value;
        this.setState({
            newCommentValue: value
        })
    }

    addNewComment(ev) {
        ev.preventDefault();
        let data = {
            commentValue: this.state.newCommentValue,
            linkId: this.props.match.params.id
        };
        let token = sessionStorage.getItem('userToken');
        if (data.commentValue.length < 5) {
            this.setState({
                isCommentValid: false
            })
        } else {
            this.setState({
                isCommentValid: true
            });
            ajax.post('comment/add', data, token).then((e) => {
                let comment = {
                    id: e.id,
                    value: e.value,
                    submissionDate: e.submissionDate,
                    username: e.username
                };
                let comments = this.state.linkDetails.comments;
                comments.push(comment);
                let linkDetails = this.state.linkDetails;
                linkDetails.comments = comments;
                this.setState({
                    linkDetails: linkDetails
                })
            })
        }
    }

    deleteComment(ev) {
        let id = ev.target.id;
        let token = sessionStorage.getItem('userToken');
        ajax.delete("comment/delete/" + id, {}, token).then((e) => {
            let comments = this.state.linkDetails.comments;
            comments = comments.filter((comment) => {
                console.log(comment);
                return parseInt(comment.id) !== parseInt(id);
            });
            let linkDetails = this.state.linkDetails;
            linkDetails.comments = comments;
            this.setState({
                linkDetails: linkDetails
            });
        })
    }

    deleteLink(ev) {
        ev.preventDefault();
        let token = sessionStorage.getItem('userToken');
        let id = this.props.match.params.id;
        ajax.delete('links/delete/' + id, '', token).then((e) => {
            this.props.history.push("/catalog");
        })
    }

    render() {
        let date = covertDate.dateDifference(this.state.linkDetails.submissionDate);
        let username = sessionStorage.getItem('userName');
        let commentsArray = this.state.linkDetails.comments;
        let linkMenu;
        let allComments;

        //check if we have comments to iterate them and add them to the view
        if (commentsArray !== undefined) {
            allComments = commentsArray.map((e) => {
                //check if the the current logged in user is the owner of the comment to allow him to delete it
                let deleteComment;
                if (username.toLowerCase() === e.username.toLowerCase()) {
                    deleteComment = <button type="button" className="btn btn-secondary my-1" id={e.id}
                                            onClick={this.deleteComment}>Delete comment</button>;
                }
                return (
                    <li className='list-group-item list-group-item-success my-1' key={e.id} id={e.id}>
                        <p>{e.value}</p>
                        <div className='mr-auto'>Submitted {covertDate.dateDifference(e.submissionDate)} ago
                            by {e.username}</div>
                        {deleteComment}
                    </li>
                )
            })
        }

        //check if the current logged in user owns the link to allow him to delete or edit the link
        if (username === this.state.linkDetails.username) {
            linkMenu =
                <span>
                        <Link to={'/link/edit/' + this.state.linkDetails.id} className="card-link">Edit</Link>
                        <a href="" className="card-link" onClick={this.deleteLink}>Delete</a>
                </span>
        }

        return (
            <span>
                <div className='row'>
                    <div className="card col-sm-12 mr-2 my-2" key={this.state.linkDetails.id} style={style}>
                        <div className="card-body">
                            <img src={this.state.linkDetails.imageUrl} alt="img not found"/>
                            <a className="card-title" href={this.state.linkDetails.linkUrl}>
                                <h4>{this.state.linkDetails.title}</h4></a>
                            <h6 className="card-subtitle mb-2 text-muted">Submitted {date} ago
                                by {this.state.linkDetails.username}</h6>
                            {linkMenu}
                        </div>
                    </div>
                </div>
                <div className="row" style={style}>
                    <form className='col-sm-5 my-1'>
                          <div className="form-group mb-0">
                            <label htmlFor="addNewComment">Add new comment</label>
                            <textarea className="form-control" id="addNewComment" rows="3"
                                      onChange={this.handleInputChange}/>
                          </div>
                        <div style={this.state.isCommentValid ? commentSuccess : commentError}>Comment length must be at least 5</div>
                        <button type="button" className="btn btn-secondary btn-block my-1" onClick={this.addNewComment}>Add new comment</button>
                    </form>
                </div>
                <div className='row'>
                    <ul className='list-group col-sm-12'>
                        {allComments}
                    </ul>
                </div>

         </span>
        )
    }
}

const style = {
    backgroundColor: '#C3E6CB'
};
const commentError = {
    display: 'block',
    color: '#e83e8c'
};
const commentSuccess = {
    display: 'none'
};
export default LinkDetails;