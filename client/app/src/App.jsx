import React from 'react';
import Dash from './features/dash/Dash';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import CompanyDash from './features/company/Company';
import AppNavBar from './features/app-bar/AppNavBar';
import withAuth from './utils/HOC/withAuth';
import LoginForm from './features/login/LoginForm';
import SignupForm from './features/signup/SignupForm';
import Profile from './features/profile/Profile';
import Stats from './features/stats/Stats';
import userService from './services/UserService';
import {AuthContext} from './utils/context/AuthProvider';

import ReactGA from 'react-ga';
import AddCompany from './features/add-company/AddCompany';
ReactGA.initialize('UA-157220630-1');
ReactGA.pageview(window.location.pathname + window.location.search);
class App extends React.Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        console.log("constructor of Apps");
        this.state ={
            isUserLoggedIn : false,
            alertOpen : false,
        }
    }

    componentDidMount(){

        userService.checkAuth().then(res => {
            console.log('user seems to be logged in');
            this.context.setAuthStatus(res.data.isLoggedIn);
        }).catch(err => {
            this.context.setAuthStatus(false);
        })
    }


    handleLogout = () => {

        userService.logout().then(res => {
            this.props.history.push('/login');
            this.context.setAuthStatus(false);
        }).catch(err => {
            console.log('err ', err);
        })
    }

    render() {
        const {isLogged} = this.context;
        return (
            <div>
                
                    <AppNavBar isUserLoggedIn={isLogged} logout={this.handleLogout}/>
                        <div>
                            <Switch>   
                            
                                <Route exact path={["/", "/dash"]} component={withAuth(Dash)} />
                                <Route exact path="/login" component={LoginForm} />
                                <Route exact path="/signup" component={SignupForm} />
                                <Route exact path="/profile" component={withAuth(Profile)} />
                                <Route exact path="/stats" component={withAuth(Stats)} />
                                <Route exact path="/company" component={withAuth(CompanyDash)} />
                                <Route exact path="/company/add" component={withAuth(AddCompany)} />
                               

                            </Switch>
                           
                        </div>
            </div>
        );
    };
}


export default withRouter(App);