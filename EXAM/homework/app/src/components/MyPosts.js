import React, {Component} from 'react';
import ajax from '../config/ajax/getAjax'
import {Link} from "react-router-dom";
import covertDate from '../config/dateFormatter/dateFormatter'

class MyPosts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allPosts: []
        };
        this.deleteLink = this.deleteLink.bind(this);
    }

    componentDidMount() {
        let token = sessionStorage.getItem('userToken');
        if (token === null) {
            this.props.history.push("login")
        }
        ajax.get('links/by-username', 'json', token).then((e) => {
            this.setState({
                allPosts: e
            })
        })
    }

    deleteLink(ev) {
        ev.preventDefault();
        let token = sessionStorage.getItem('userToken');
        let id = ev.target.id;
        ajax.delete('links/delete/' + id, '', token).then((e) => {
            let allLinks = this.state.allPosts;
            console.log(allLinks);
            allLinks = allLinks.filter((e) => {
                return parseInt(e.id) !== parseInt(id);
            });
            console.log(allLinks);
            this.setState({
                allPosts: allLinks
            })
        })
    }

    render() {
        let allPosts = <h1>No posts in database</h1>;
        if (this.state.allPosts.length > 0) {
            allPosts = this.state.allPosts.map((e) => {
                return (
                    <div className="card col-sm-12 mr-2 my-2" key={e.id} style={style}>
                        <div className="card-body">
                            <img src={e.imageUrl} alt="img not found"/>
                            <a className="card-title" href={e.linkUrl}><h4>{e.title}</h4></a>
                            <h6 className="card-subtitle mb-2 text-muted">Submitted {covertDate.dateDifference(e.submissionDate)} ago
                                by {e.username}</h6>
                            <Link to={'/link/details/' + e.id} className="card-link">Comments</Link>
                            <Link to={'/link/edit/' + e.id} className="card-link">Edit</Link>
                            <a href="" className="card-link" onClick={this.deleteLink} id={e.id}>Delete</a>
                        </div>
                    </div>
                )
            })
        }
        return (
            <div className='row justify-content-sm-center my-2'>
                {allPosts}
            </div>
        )
    }
}
const style = {
    backgroundColor: '#C3E6CB'
};

export default MyPosts;