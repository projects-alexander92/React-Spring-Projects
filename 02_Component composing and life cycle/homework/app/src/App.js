import React, {Component} from 'react'
import Slider from "./components/Slider";
import DetailsMenu from "./components/DetailsMenu";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="container-fluid">
                <Slider maxIndex={2}/>
                <DetailsMenu/>
            </div>
        )
    }
}

export default App;
