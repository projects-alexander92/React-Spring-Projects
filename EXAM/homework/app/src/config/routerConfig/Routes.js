import React from 'react'
import {Switch, Route, Redirect} from "react-router-dom"
import NotFoundPage from "./NotFoundPage";
import LoginForm from "../../components/user/LoginForm";
import RegistrationForm from "../../components/user/RegistrationForm";
import SubmitLink from "../../components/SubmitLink";
import Catalog from "../../components/Catalog";
import LinkDetails from "../../components/LinkDetails";
import MyPosts from "../../components/MyPosts";
import LinkEdit from "../../components/LinkEdit";
import Greeting from "../../components/Greeting";

const Routes = () => {
    return (
        <Switch>
            <Route exact path={'/login'} component={LoginForm}/>
            <Route exact path={'/register'} component={RegistrationForm}/>
            <Route exact path={'/submit-link'} component={SubmitLink}/>
            <Route exact path={'/catalog'} component={Catalog}/>
            <Route exact path={'/link/details/:id'} component={LinkDetails}/>
            <Route exact path={'/link/edit/:id'} component={LinkEdit}/>
            <Route exact path={'/my-posts'} component={MyPosts}/>
            <Route exact path={'/'} component={Greeting}/>
            <Route component={NotFoundPage}/>
        </Switch>
    )
};

export default Routes;