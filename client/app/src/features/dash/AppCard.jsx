import React from 'react';
import './AppCard.css';
class AppCard extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props)
    }


    
    render(){
        //If application is undefined due to asynchronous operations
        if(!this.props.application) return null;

        const {status, date, company, location, position} = this.props.application;
        const companyName = company.name;
        const companyUrl = company.url;
        
        return(

            <div className="app-container">
                <div className="app-header" onClick={() => this.props.onClick()}>
                    {companyName}
                </div>

                <div className="app-body">
                    {location}
                </div>
              
            </div>
          
            
        );
    }
}

export default AppCard;