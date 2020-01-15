import React from 'react';
import userService from '../../services/UserService';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
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
        
        userService.login(this.state);
        event.preventDefault();
        let checkAuth = userService.checkAuth();
        console.log('check auth', checkAuth);
    }

    handleLoginDialogClose = () => {
        this.setState({
            open: false,
        })
    }
    render(){
        const {open} = this.state;
        return(
            <div>
                <Dialog open={open} onClose={this.handleLoginDialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <DialogContent>

                        <DialogContentText>
                            Username
                        </DialogContentText>
                    </DialogContent>
                </Dialog>


                {/* <form onSubmit={this.handleSubmit}>
                    <input type="username" name="email" onChange={this.handleChange} />
                    <input type="password" name="password" onChange={this.handleChange} />
                    <button type="submit"> Login </button>
                </form> */}
            </div>
        );
    }
}

export default LoginForm;