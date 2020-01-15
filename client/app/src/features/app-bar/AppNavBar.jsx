import React from 'react';
import './AppNavBar.css';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import TypoGraphy from '@material-ui/core/Typography';

class AppNavBar extends React.Component {
    
    render(){
        return(
            <div className="bar-container">
                <AppBar position="static">
                    <ToolBar>
                        <TypoGraphy variant='h6' >
                            Backtrack
                        </TypoGraphy>
                    </ToolBar>
                </AppBar>
            </div>
        );
    }
}

export default AppNavBar;