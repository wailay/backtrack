import React from 'react';
import userService from './services/UserService';
import LoginForm from './features/login/LoginForm';
import Dash from './features/dash/Dash';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CompanyDash from './features/company/Company';
import Home from './features/home/Home';
import AppNavBar from './features/app-bar/AppNavBar';
class App extends React.Component {

  constructor(){
    super();
    this.state = {
      logged : false,
      user : {},
    }
  }

  componentDidMount(){
   console.log('component mounted');
  userService.checkAuth().then(res => {
    
      let logged = res.data.isLoggedIn;
      this.setState({
        logged : logged,
      })
    });
    
   
    
  }

  handleClick = () => {
    userService.logout().then(res => {
      console.log(res, 'logout successful');
    })
  }

  render() {
    var status = this.state.logged ? "True" : "False";
  return (
    <div>
      <AppNavBar />
    <div>
    Track your job appplications
    </div>

<Router>


  <div>
    <Switch>

      <Route exact path="/dash">
          <Dash />
      </Route>

      <Route exact path="/company">
          <CompanyDash />
      </Route>

      <Route path="/">
        <div>
          <Home />
          <LoginForm />
    <button onClick={this.handleClick}> Logout </button>


    <div>
      Is the user logged in : {status}
    </div>
        </div>
      </Route>
    </Switch>
    </div>
</Router>

    
  </div>
  );
  };
}

export default App;
