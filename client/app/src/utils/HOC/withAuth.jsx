import React from 'react';
import userService from '../../services/UserService';
import {Redirect} from 'react-router-dom';

function withAuth(WrappedComponent){
    
    return class extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                loading : true,
                isloggedIn : false,
            }
        };

    componentDidMount(){
        userService.checkAuth().then(res => {
            console.log('checking auth ', res);
            this.setState({
                isLoggedIn : res.data.isLoggedIn,
                loading : false,
            })
        }).catch(err => {
            console.log("error when checking auth, ", err);
            this.setState({
                isLoggedIn : false,
                loading : false,
            })
        });
    }
    
    render(){
        const {loading, isLoggedIn} = this.state;
        if(loading) return null;

        if(!isLoggedIn) {
            return <Redirect to="/login" /> ;
        }else{
            return <WrappedComponent {...this.props} /> ;
        }
    }
}

}

export default withAuth;