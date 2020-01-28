import React from 'react';
import userService from '../../services/UserService';
import TextField from '@material-ui/core/TextField';
import './LoginForm.css';
import { Typography, Button, Link } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {AuthContext} from '../../utils/context/AuthProvider';
class LoginForm extends React.Component {
    
    static contextType = AuthContext;
    
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            open : false,
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
        
        const data = {
            username : this.state.username,
            password : this.state.password,
        }
        userService.login(data).then(res => {
            if (res.data.success) {
                this.context.setAuthStatus(true);
                this.props.history.push('/dash');
            }
        }).catch(err => {
        this.setState({
            open : true,
        })
        this.context.setAuthStatus(false);
        
    });
        event.preventDefault();
    }

    handleAlertClose = () => {
        this.setState({
            open : false,
        })
    }

    componentDidMount(){

    }
    render(){
       
        const {open} = this.state;
        
        return(
            <div>

                <Snackbar open={open} autoHideDuration={2000} onClose={this.handleAlertClose}>
                    <Alert onClose={this.handleAlertClose} severity="error">
                        Username or Password is incorrect
                    </Alert>
                </Snackbar>
                <div className="div-container">
                <div className="left">
                </div>
                
                <div className="login-container">
                <Typography variant="h4" gutterBottom>
                    Log in
                </Typography>
                    <form autoComplete="off" onSubmit={this.handleSubmit}>
                        
                        <TextField required id="outlined-user" label="Username" name="username" variant="outlined" onChange={this.handleChange} />
                        <TextField required id="outlined-pass" label="Password" name="password" variant="outlined" onChange={this.handleChange} />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="submit-button"
                        >
                            LogIn
                        </Button>

                        <div className="no-account">
                            <div>
                                <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                                </Link>
                            </div>
                        </div>

                    </form>
                </div>

                </div>
            
            </div>
        );
    }
}

export default LoginForm;