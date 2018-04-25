import React from 'react'
import {Route, Switch} from 'react-router-dom'
import AddInput from "../components/AddInputs";
import EditInput from "../components/EditInput";

const Routes = () => {
    return (
        <Switch>
            <Route exact path={'/'} component={AddInput}/>
            <Route exact path={'/edit/:id/:name'} component={EditInput}/>
        </Switch>
    )
};

export default Routes;