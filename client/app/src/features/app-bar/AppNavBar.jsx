import React, { Fragment } from 'react';
import './AppNavBar.css';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import TypoGraphy from '@material-ui/core/Typography';
import { withRouter } from "react-router";
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu'





class AppNavBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            anchorEl : null,
            drawerOpen : false,
        }
    }

    handleDrawerOpen = () => {
        this.setState({
            drawerOpen : true,
        })
    };

    handleDrawerClose = () => {
        this.setState({
            drawerOpen : false,
        })
    };

    handleProfileMenuClick = (event) => {
        this.setState({
            anchorEl : event.currentTarget,
        })
    }

    handleProfileMenuClose = () => {
        this.setState({
            anchorEl : null,
        })
    }
    handleTitleClick = () => {
        this.props.history.push('/');
    }

    handleLoginClick = () => {
        this.props.history.push('/login');
    }

    handleSignupClick = () => {
        this.props.history.push('/signup');
    }

    handleLogoutClick = () => {
        this.setState({
            anchorEl : null,
        })
        this.props.logout();
    }
    

    renderAuthButtons() {
        const {isUserLoggedIn} = this.props;
        if (!isUserLoggedIn){

            const buttons = (
                
                <Fragment>
                <div className="login-button"  onClick={this.handleLoginClick}>
                Log in
            </div>
             <div className="signup-button" onClick={this.handleSignupClick}>
                 Sign up
             </div>
             </Fragment>
                
            );

            return buttons;
        }
        else {
            const buttons = (
                     <Fragment>
                <div>
                    <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuClick}
                    color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>

                    <Menu
                    id="user-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleProfileMenuClose}
                    anchorReference={{vertical : 'bottom'}}
                >
                    <MenuItem onClick={this.handleProfileMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>
                </Menu>
                </div>
                
                </Fragment>
            );
            return buttons;
        }
    }
    render(){
        return(
            <div className="bar-container">
                <AppBar position="static" className="bar">
                    <ToolBar>
                                <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        // onClick={handleDrawerOpen}
                        edge="start"
                        className="menu-button"
                        >
                        <MenuIcon />
                        </IconButton>
                        <TypoGraphy variant='inherit' className="bar-title" onClick={this.handleTitleClick}>
                            Backtrack
                        </TypoGraphy>


                   
                    {this.renderAuthButtons()} 
                        
                    </ToolBar>
                </AppBar>
            </div>
        );
    }
}

export default withRouter(AppNavBar);