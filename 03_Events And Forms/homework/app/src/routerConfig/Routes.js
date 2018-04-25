import React from 'react'
import {Switch, Route, Redirect} from "react-router-dom"
import LoginForm from "../components/user/LoginForm";
import RegistrationForm from "../components/user/RegistrationForm";
import NotFoundPage from "./NotFoundPage";
import PokemonForm from "../components/user/PokemonForm";

const Routes = () => {
    return (
        <Switch>
            <Route exact path='/login/' component={LoginForm}/>
            <Route exact path='/register/' component={RegistrationForm}/>
            <Route exact path={'/pokemon'} component={PokemonForm}/>
            <Redirect from={'/'} to={'/register'} strict/>
            <Route component={NotFoundPage}/>
        </Switch>
    )
};

export default Routes;