import React from 'react';

export const AuthContext = React.createContext();

class AuthProvider extends React.Component {
    state = {
        isLogged : false,
    }
    setAuthStatus = (status) => {
        this.setState({
            isLogged : status,
        })
    }
    render(){
        return(
            <AuthContext.Provider value={{ ...this.state, setAuthStatus : this.setAuthStatus}}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export default AuthProvider;