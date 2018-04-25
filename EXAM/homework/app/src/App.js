import React, {Component} from 'react';
import Routes from './config/routerConfig/Routes'
import NavBar from "./components/NavBar";

class App extends Component {
    render() {
        return (
            <div className="container justify-content-sm-center">
                <NavBar/>
                <Routes/>
            </div>
        );
    }
}

export default App;
