import React from 'react';
import userService from '../../services/UserService';
import TextField from '@material-ui/core/TextField';
import './LoginForm.css';
import { Typography, Button, Link } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {AuthContext} from '../../utils/context/AuthProvider';
import ReCAPTCHA from "react-google-recaptcha";

class LoginForm extends React.Component {
    
    static contextType = AuthContext;
    
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            alertOpen : false,
            alertMessage : "",
            alertDuration : 2000,
            notARobot : false,
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

        event.preventDefault();
        if(!this.state.notARobot){
            this.setState({
                alertOpen : true,
                alertDuration : 1000,
                alertMessage : "Please Complete The Captcha !",
            })
        }
        else {
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
                alertOpen : true,
                alertMessage : "Username or Password is incorrect :(",
            })
            this.context.setAuthStatus(false);
            
        });
    }
    }

    handleAlertClose = () => {
        this.setState({
            alertOpen : false,
        })
    }

    onCaptchaSuccess = (value) => {
        this.setState({notARobot : true});
    }

    componentDidMount(){

    }
    render(){
       
        const {alertOpen, alertDuration, alertMessage} = this.state;
        
        return(
            <div>

                <Snackbar open={alertOpen} autoHideDuration={alertDuration} onClose={this.handleAlertClose}>
                    <Alert onClose={this.handleAlertClose} severity="error">
                        {alertMessage}
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
                        <TextField required id="outlined-pass" label="Password" name="password" variant="outlined" onChange={this.handleChange}  type="password"/>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="submit-button"
                        >
                            LogIn
                        </Button>

                        <ReCAPTCHA
                            style={{margin : 15}}
                            onChange={this.onCaptchaSuccess}
                            sitekey="6LfktNMUAAAAANpgYtUZ7Uyk2clL_RK5edG00mUI"
                            
                        />

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
