import React from 'react';
import Dash from './features/dash/Dash';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CompanyDash from './features/company/Company';
import AppNavBar from './features/app-bar/AppNavBar';
import withAuth from './utils/HOC/withAuth';
import withTracker from './utils/HOC/withTracker';
import LoginForm from './features/login/LoginForm';
import SignupForm from './features/signup/SignupForm';
import Profile from './features/profile/Profile';
import Stats from './features/stats/Stats';
import userService from './services/UserService';
import {AuthContext} from './utils/context/AuthProvider';
import AddCompany from './features/add-company/AddCompany';
import Home from './features/home/Home';



class App extends React.Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state ={
            isUserLoggedIn : false,
            alertOpen : false,
        }
    }
    
    componentDidMount(){

        userService.checkAuth().then(res => {
            this.context.setAuthStatus(res.data.isLoggedIn);
        }).catch(err => {
            this.context.setAuthStatus(false);
        })
    }


    handleLogout = () => {

        userService.logout().then(res => {
            this.context.setAuthStatus(false);
        }).catch(err => {
            console.log('error');
        })
    }

    render() {
        const {isLogged} = this.context;
        return (
            <div>
                
                    
                        <div>
                            <Router>
                            <AppNavBar isUserLoggedIn={isLogged} logout={this.handleLogout}/>
                            <Switch>   
                                <Route exact path="/login" component={withTracker(LoginForm)} />
                                <Route exact path="/signup" component={withTracker(SignupForm)} />
                                <Route exact path={["/","/home"]} component={withTracker(Home)} />
                                <Route exact path="/dash" component={withTracker(withAuth(Dash))} />
                                <Route exact path="/profile" component={withTracker(withAuth(Profile))} />
                                <Route exact path="/stats" component={withTracker(withAuth(Stats))} />
                                <Route exact path="/company" component={withTracker(withAuth(CompanyDash))} />
                                <Route exact path="/company/add" component={withTracker(withAuth(AddCompany))} />
                               

                            </Switch>
                            </Router>
                        </div>
            </div>
        );
    };
}


export default App;