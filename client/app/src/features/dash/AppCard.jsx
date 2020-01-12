import React from 'react';
import './AppCard.css';
import Collapse from '@material-ui/core/Collapse';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import appService from '../../services/AppService';

class AppCard extends React.Component {
    constructor(props) {
        super(props);
        let {status} = this.props.application;
        let appContainerClass = `app-container ${status}-body`;
        this.state = {
            expanded: false,
            appContainerClass : appContainerClass,
        }
       
    }




    changeAppStatus(newStatus){
        let { status } = this.props.application;
        let newAppContainerClass = "";
        console.log('status', status, newStatus);
        if (newStatus == status){
            newStatus = 'Pending';
            newAppContainerClass = `app-container Pending-body`
        }else{
            newAppContainerClass = `app-container ${newStatus}-body`; 
        }
        
        let {_id} = this.props.application;
        this.props.application.status = newStatus; //To get the new status we need a refetch, but we change it locally to avoid refetching data.

        appService.changeStatus(_id, newStatus).then( res => {
            
            this.setState({
                expanded : false,
                appContainerClass : newAppContainerClass,
            })
        }).catch(err => {
            console.log('something bad happened in appcard.jsx', err);
        })
    }
    handleCollapseClick = (event) => {
        
        this.setState({
            expanded: !this.state.expanded,
        });
        
        
    }

    handleStatusClick = (event) => {
        let newStatus = event.target.value;
        this.changeAppStatus(newStatus);
    }
    handleHeaderClick = () => {
        console.log('header click')
        //This calls the on click in the dash compoenent (get the app url)
        this.props.onClick();
    }
    render() {
        const { expanded , appContainerClass} = this.state;
        //If application is undefined due to asynchronous operations
        if (!this.props.application) return null;

        const { company, location, position } = this.props.application;
        const companyName = company.name;
        const companyUrl = company.url;

        return (

            <div className={appContainerClass}>
                <div className="app-header-container" >
                    <div className="app-header" onClick={this.handleHeaderClick}>
                        {companyName}
                    </div>

                    <div className="icon-down">
                        <FontAwesomeIcon icon={faAngleDown} onClick={this.handleCollapseClick}/>
                    </div>

                </div>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <div className="app-body">
                        <div className="body-location">
                            {location}
                        </div>
                        <div className="body-position">
                            {position}
                        </div>

                        <div className="status-button-container">
                            
                            <button className="button-status" onClick={this.handleStatusClick} value="Ghosted">Ghosted</button>
                            <button className="button-status" onClick={this.handleStatusClick} value="Rejected">Rejected</button>
                            <button className="button-status" onClick={this.handleStatusClick} value="Offered">Offered</button>

                        </div>
                    </div>
                </Collapse>


            </div>


        );
    }
}

export default AppCard;