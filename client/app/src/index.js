import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './utils/context/AuthProvider';


import * as serviceWorker from './serviceWorker';


const myTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#212121",
        },
        secondary: {
            main: "#3d1d27",
        }

    }
});
ReactDOM.render(
    <AuthProvider>
    <ThemeProvider theme={myTheme}>
        <Router>
            <App />
        </Router>
    </ThemeProvider>
    </AuthProvider>
        
        ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
