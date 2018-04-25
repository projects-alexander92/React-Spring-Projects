import React, {Component} from 'react'
import Routes from './rauter-config/Routes'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <div className="container">
                <Routes/>
            </div>
        );
    }
}

export default App;
