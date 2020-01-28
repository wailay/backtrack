import React from 'react';
import userService from '../../services/UserService';
import TextField from '@material-ui/core/TextField';
import './SignupForm.css';
import { Typography, Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {AuthContext} from '../../utils/context/AuthProvider';

class SignupForm extends React.Component {
    static contextType = AuthContext;
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            alreadyRegistered : false,
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
        
        const data = {
            username : this.state.username,
            password : this.state.password,
        }
        userService.signup(data).then(res => {
            if (res.data.alreadyRegistered){
                this.setState({
                    alreadyRegistered : res.data.alreadyRegistered,
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
        event.preventDefault();
    }

    handleLoginDialogClose = () => {
        this.setState({
            open: false,
        })
    }

    handleAlertClose = () => {
        this.setState({alreadyRegistered : false});
    }

    render(){
        const {alreadyRegistered} = this.state;
        return(
            <div>

                <Snackbar open={alreadyRegistered} autoHideDuration={2000} onClose={this.handleAlertClose}>
                    <Alert onClose={this.handleAlertClose} severity="error">
                        Username already registered !
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
                        <TextField required id="outlined-pass" label="Password" variant="outlined" name="password" onChange={this.handleChange}/>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="submit-button"
                            
                        >
                            Sign up
                        </Button>

                    </form>
                </div>

                </div>

            
            </div>
        );
    }
}

export default SignupForm;