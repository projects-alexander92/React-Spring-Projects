import React, {Component} from 'react'
import ajax from '../config/ajax/getAjax'
import {Link} from 'react-router-dom'
import covertDate from '../config/dateFormatter/dateFormatter'

class Catalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allLinks: []
        };
        this.deleteLink = this.deleteLink.bind(this);
    }

    componentDidMount() {

        let token = sessionStorage.getItem('userToken');
        if (token === null) {
            this.props.history.push("login")
        }
        ajax.get('links/all', 'json', token).then((e) => {
            this.setState({
                allLinks: e
            })
        })
    }

    deleteLink(ev) {
        ev.preventDefault();
        let token = sessionStorage.getItem('userToken');
        let id = ev.target.id;
        ajax.delete('links/delete/' + id, '', token).then((e) => {
            let allLinks = this.state.allLinks;
            console.log(allLinks);
            allLinks = allLinks.filter((e) => {
                return parseInt(e.id) !== parseInt(id);
            });
            console.log(allLinks);
            this.setState({
                allLinks: allLinks
            })
        })
    }

    render() {
        let allLinkItems = this.state.allLinks.map((link, i) => {
            let username = sessionStorage.getItem('userName');
            let linkMenu;

            //check if the user is the owner of the comment
            if (username.toLowerCase() !== link.username.toLowerCase()) {
                linkMenu = <Link to={'/link/details/' + link.id} className="card-link">Comments</Link>
            } else {
                linkMenu = <span>
                        <Link to={'/link/details/' + link.id} className="card-link">Comments</Link>
                        <Link to={'/link/edit/' + link.id} className="card-link">Edit</Link>
                        <a href="" className="card-link" onClick={this.deleteLink} id={link.id}>Delete</a>
                </span>
            }

            return (
                <div className="card col-sm-12 mr-2 my-2" key={link.id} style={style}>
                    <div className="card-body">
                        <img src={link.imageUrl} alt="img not found" className="mb-2"/>
                        <a className="card-title" href={link.linkUrl}><h4>{link.title}</h4></a>
                        <h6 className="card-subtitle mb-2 text-muted mt-2">Submitted {covertDate.dateDifference(link.submissionDate)} ago
                            by {link.username}</h6>
                        {linkMenu}
                    </div>
                </div>
            )
        });
        return (
            <div className='row'>
                {allLinkItems}
            </div>
        )
    }
}

const style = {
    backgroundColor: '#C3E6CB'
};

export default Catalog;