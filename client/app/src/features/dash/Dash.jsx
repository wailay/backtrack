import React from 'react';
import AppCard from './AppCard';
import appService from '../../services/AppService';
import './Dash.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

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
    handleDeleteApp = (app) => {
        console.log('delete app');

        let { _id } = app;
        appService.deleteApplication(_id).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log('Error happened when deleting application ', err);
        })
        const {applications} = this.state;
        const appIndex = applications.indexOf(app);
        applications.splice(appIndex, 1);
        this.setState({
            applications : applications,
        })
        
    }

    handleAddCompany(){
        console.log('Add company');
    }   
   

    render() {
        const {applications} = this.state;
        const applicationDiv = applications.map((app) => 
            <AppCard key={app._id} application={app} onClick={() => this.handleDeleteApp(app)}/>
        ); 
        return (
            <div>
                
            <div className="flex-container">

                {applicationDiv}
                <div className="add-container">
                    <FontAwesomeIcon className="action-button" icon={faPlus} onClick={() => this.handleAddCompany()}/>
                </div>

            </div>

            </div>
           
        );
    }

}

export default Dash;