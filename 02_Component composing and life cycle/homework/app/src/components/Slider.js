import React, {Component} from 'react'
import left from './../resources/left.png'
import right from './../resources/right.png'
import './../resources/slider.css'
import PropTypes from 'prop-types'
import ajax from './../ajax/getAjax'

class Slider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            episodeId: 0,
            imageUrl: ''
        };
        this.getLeftPicture = this.getLeftPicture.bind(this);
        this.getRightPicture = this.getRightPicture.bind(this);
    }

    componentDidMount() {
        ajax.get('episodePreview/' + this.state.episodeId, 'text').then((imageUrl) => {
            this.setState({
                imageUrl: imageUrl,
            })
        });

    }

    getLeftPicture() {
        if (this.state.episodeId <= 0) {
            ajax.get('episodePreview/' + this.props.maxIndex, 'text').then((imageUrl) => {
                this.setState({
                    episodeId: this.props.maxIndex,
                    imageUrl: imageUrl
                })
            });
        } else {
            ajax.get('episodePreview/' + (this.state.episodeId - 1), 'text').then((imageUrl) => {
                this.setState({
                    episodeId: this.state.episodeId - 1,
                    imageUrl: imageUrl
                })
            });
        }
    }

    getRightPicture() {
        if (this.state.episodeId >= this.props.maxIndex) {
            ajax.get('episodePreview/' + 0, 'text').then((imageUrl) => {
                this.setState({
                    episodeId: 0,
                    imageUrl: imageUrl
                })
            });
        } else {
            ajax.get('episodePreview/' + (this.state.episodeId + 1), 'text').then((imageUrl) => {
                this.setState({
                    episodeId: this.state.episodeId + 1,
                    imageUrl: imageUrl
                })
            });
        }
    }

    render() {
        return (
            <div className="wrapper">
                <img src={this.state.imageUrl} alt="img not found"
                     className="center" height={400} width={900}/>
                <img src={left} alt="img not found" className="left"
                     height={150} width={150} onClick={this.getLeftPicture}/>
                <img src={right} alt="img not found" className="right"
                     height={150} width={150} onClick={this.getRightPicture}/>
            </div>
        )
    }
}

Slider.propTypes = {
    maxIndex: PropTypes.number.isRequired
};
export default Slider;