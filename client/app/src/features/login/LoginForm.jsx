
import React from 'react';
import userService from '../../services/UserService';

class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
        }
    }


    handleChange = (event) => {
        let value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value,
        })
        
    }
    handleSubmit = (event) => {
        
        userService.login(this.state);
        event.preventDefault();
        let checkAuth = userService.checkAuth();
        console.log('check auth', checkAuth);
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="username" name="email" onChange={this.handleChange} />
                    <input type="password" name="password" onChange={this.handleChange} />
                    <button type="submit"> Login </button>
                </form>
            </div>
        );
    }
}

export default LoginForm;