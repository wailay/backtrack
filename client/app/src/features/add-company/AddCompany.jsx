import React from 'react';
import './AddCompany.css';
import { Button, TextField, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import ReCAPTCHA from "react-google-recaptcha";
class AddCompany extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            notARobot : false,
            alertOpen : false,
            mailto : "",
        }
    }


    onCaptchaSuccess = (value) => {
        this.setState({notARobot : true});
    }
    handleAlertClose = () => {
        this.setState({alertOpen : false,});
    }

    handleChange = (event) => {
        let value = event.target.value;
    }
    handleSubmit = () => {
        if(!this.state.notARobot){
            this.setState({
                alertOpen : true,
            });
        }else{
            const {name, icon} = this.state;
            const mailto = `mailto:b2bdomain@protonmail.com?subject=Add company track&body=Name : ${name}%0D%0Aurl : ${icon}`;
            window.open(mailto);
        }
    }
    render(){
        const {alertOpen} = this.state; 
        return(
            <div>
                <Snackbar open={alertOpen} autoHideDuration={1000} onClose={this.handleAlertClose}>
                        <Alert onClose={this.handleAlertClose} severity="error">
                            {"Please submit the captcha :)"}
                        </Alert>
                </Snackbar>
                <div className="div-main">
                    <p>Hi, here you can send me an email if there is a company not listed and I will make sure to add it in the database. </p>


                    <p>In the url form, please fill the favicon path. For example the Twitter favicon path is :   
                        
                        <a href= "https://abs.twimg.com/favicons/favicon.ico"> https://abs.twimg.com/favicons/favicon.ico </a>
                        
                        </p>


                        <div className="form-company">
                    
                        <form>
                                <div>
                                <TextField required id="outlined-user" label="Company Name" variant="outlined" name="name" onChange={this.handleChange}/>
                                </div>
                                <div>
                                <TextField required id="outlined-pass" label="Company Icon" variant="outlined" name="icon" onChange={this.handleChange}/>
                                </div>   
                        </form>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="submit-button"
                                onClick={this.handleSubmit}
                                
                            >
                                Submit
                            </Button>

                            <ReCAPTCHA
                                style={{margin : 15}}
                                onChange={this.onCaptchaSuccess}
                                sitekey="6LfktNMUAAAAANpgYtUZ7Uyk2clL_RK5edG00mUI"
                                
                            />
                            </div>
                           
                        
                </div>
            </div>
        ); 
    };
}

export default AddCompany;