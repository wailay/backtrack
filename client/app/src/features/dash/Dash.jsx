import React from 'react';
import AppCard from './AppCard';
import appService from '../../services/AppService';
import companyService from '../../services/CompanyService';
import './Dash.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
class Dash extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            applications: [],

        }
    }

    componentDidMount() {

        appService.getApplications().then(res => {
            this.setState({
                applications: res.data,
            })
        });

    }

    
    handleCompanyClick(app) {
        window.open(`https://${app.company.url}`, "_blank");        
    }

    handleAddCompany(){
        console.log('Add company');
        companyService.getCompanies().then(res =>{
            console.log(res.data);
        });
    }   
   

    render() {
        const {applications, expanded} = this.state;
        const applicationDiv = applications.map((app) => 
            <AppCard key={app._id} application={app} onClick={() => this.handleCompanyClick(app)}/>
        ); 
        return (
            <div>
                
            <div className="flex-container">
          
                {applicationDiv}
                <div className="add-container">
                    <FontAwesomeIcon className="action-button" icon={faPlusCircle} onClick={() => this.handleAddCompany()}/>
                </div>

            </div>

            </div>
           
        );
    }

}

export default Dash;