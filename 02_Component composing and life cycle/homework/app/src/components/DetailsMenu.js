import React, {Component} from 'react';
import ajax from './../ajax/getAjax'
import './../resources/detailsMenu.css'

class DetailsMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            episodePictureUrls: [],
            episodeIds: [],
            episodeBios: [],
            detailsPictureUrl: '',
            detailsBio: ''
        };
        this.displayEpisodeDetails = this.displayEpisodeDetails.bind(this);
    }

    componentDidMount() {
        ajax.get('episodePreview/rosters/all', 'json').then((response) => {
            let urlArr = [];
            let idArr = [];
            let bioArr = [];
            response.forEach((e) => {
                urlArr.push(e.url);
                idArr.push(e.id);
                bioArr.push(e.bio)
            });
            this.setState({
                episodePictureUrls: urlArr,
                episodeIds: idArr,
                episodeBios: bioArr
            })

        })
    }

    displayEpisodeDetails(ev) {
        let id = ev.target.id;
        this.setState({
            detailsPictureUrl: this.state.episodePictureUrls[id],
            detailsBio: this.state.episodeBios[id]
        })
    }

    render() {
        return (
            <div className="wrapper">
                <img id={this.state.episodeIds[0]} className="smallPic" src={this.state.episodePictureUrls[0]}
                     alt="Picture not found" height={200} width={210} onClick={this.displayEpisodeDetails}/>
                <img id={this.state.episodeIds[1]} className="smallPic" src={this.state.episodePictureUrls[1]}
                     alt="Picture not found" height={200} width={210} onClick={this.displayEpisodeDetails}/>
                <img id={this.state.episodeIds[2]} className="smallPic" src={this.state.episodePictureUrls[2]}
                     alt="Picture not found" height={200} width={210} onClick={this.displayEpisodeDetails}/>
                <img id={this.state.episodeIds[3]} className="smallPic" src={this.state.episodePictureUrls[3]}
                     alt="Picture not found" height={200} width={210} onClick={this.displayEpisodeDetails}/>
                <div className="episodeInfo" id={"episodeInfo"}>
                    <img src={this.state.detailsPictureUrl} alt="Click one of the top Images" height={200} width={210}/>
                    <p>{this.state.detailsBio}</p>
                </div>
            </div>
        )
    }
}

DetailsMenu.propTypes = {};

export default DetailsMenu;