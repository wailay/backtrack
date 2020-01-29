import React from 'react';
import userService from '../../services/UserService';
import TextField from '@material-ui/core/TextField';
import './SignupForm.css';
import { Typography, Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {AuthContext} from '../../utils/context/AuthProvider';
import ReCAPTCHA from "react-google-recaptcha";

class SignupForm extends React.Component {
    static contextType = AuthContext;
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            alertOpen : false,
            alertMessage : "",
            alertDuration : 2000,
        }
    }


    handleChange = (event) => {
        let value = event.target.value;
        
        console.log(event.target.name);
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
                alertMessage : "Please Complete The Captcha !", 
                alertDuration : 1000, 
            });

           
        }else {
            
            const data = {
                username : this.state.username,
                password : this.state.password,
            }
            userService.signup(data).then(res => {
                if (res.data.alreadyRegistered){
                    this.setState({
                        alertOpen : res.data.alreadyRegistered,
                        alertMessage : "Username already registered !"
                    })
                }else if(res.data.success){
                    userService.login(data).then(res => {
                        this.context.setAuthStatus(res.data.success);
                        this.props.history.push('/dash');
                    }).catch(err => {
                        this.context.setAuthStatus(false);
                    });
                }
            }).catch(err => {
                console.log('error when signing up ', err);
            });
    }
    }

    handleLoginDialogClose = () => {
        this.setState({
            open: false,
        })
    }
    onCaptchaSuccess = (value) => {
        this.setState({notARobot : true});
    }
    handleAlertClose = () => {
        this.setState({alertOpen : false,});
    }

    render(){
        const {alertOpen} = this.state;
        return(
            <div>

                <Snackbar open={alertOpen} autoHideDuration={this.state.alertDuration} onClose={this.handleAlertClose}>
                    <Alert onClose={this.handleAlertClose} severity="error">
                        {this.state.alertMessage}
                    </Alert>
                </Snackbar>

                <div className="div-container">
                <div className="left">
                </div>
                
                <div className="signup-container">
                <Typography variant="h4" gutterBottom>
                    Sign up
                </Typography>
                    <form autoComplete="off" onSubmit={this.handleSubmit}>


                        
                        <TextField required id="outlined-user" label="Username" variant="outlined" name="username" onChange={this.handleChange}/>
                        <TextField required id="outlined-pass" label="Password" variant="outlined" name="password" onChange={this.handleChange} type="password"/>

                       
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="submit-button"
                            
                        >
                            Sign up
                        </Button>
                        
                        <ReCAPTCHA
                            style={{margin : 15}}
                            onChange={this.onCaptchaSuccess}
                            sitekey="6LfktNMUAAAAANpgYtUZ7Uyk2clL_RK5edG00mUI"
                            
                        />

                       

                    </form>
                </div>

                </div>

            
            </div>
        );
    }
}

export default SignupForm;