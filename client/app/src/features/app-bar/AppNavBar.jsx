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
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WorkIcon from '@material-ui/icons/Work';
import BusinessIcon from '@material-ui/icons/Business';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import DashboardIcon from '@material-ui/icons/Dashboard';




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
        this.props.history.push('/login');
        this.props.logout();
    }

    handleAddAppClick = () => {

        this.props.history.push('/company');
        this.handleDrawerClose();
    }
    handleAddCompClick = () => {
        this.props.history.push('/company/add');
        this.handleDrawerClose();

    }

    handleDashClick = () => {
        this.props.history.push('/dash');
        this.handleDrawerClose();

    }
    handleStatsClick = () => {
        this.props.history.push('/stats');
        this.handleDrawerClose();

    }

    handleProfileClick = () => {
        this.props.history.push('/profile');
        this.handleProfileMenuClose();

    }

    renderMenuButton() {
        if(this.props.isUserLoggedIn){
            return (
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                edge="start"
                className="menu-button"
                >
                <MenuIcon />
                </IconButton>
                );
        }else{
            return null;
        }
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
                    <MenuItem onClick={this.handleProfileClick}>Profile</MenuItem>
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

                <Drawer className="drawer" open={this.state.drawerOpen} onClose={this.handleDrawerClose}>

                    <div className="list-action">
                <List>

                <ListItem button onClick={this.handleDashClick}>
                    <ListItemIcon> <DashboardIcon /> </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button onClick={this.handleAddAppClick}>
                    <ListItemIcon> <WorkIcon /> </ListItemIcon>
                    <ListItemText primary="Add Application" />
                </ListItem>
                <ListItem button onClick={this.handleAddCompClick}>
                    <ListItemIcon> <BusinessIcon /> </ListItemIcon>
                    <ListItemText primary="Add Company" />
                </ListItem>

                <ListItem button onClick={this.handleStatsClick}>
                    <ListItemIcon> <EqualizerIcon /> </ListItemIcon>
                    <ListItemText primary="Applications Statistics" />
                </ListItem>
                </List>
                </div>
                </Drawer>
                <AppBar position="static" className="bar">
                    <ToolBar>
                    

                    {this.renderMenuButton()}
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