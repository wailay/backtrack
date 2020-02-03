import React from 'react';
import AppCard from './AppCard';
import appService from '../../services/AppService';
import './Dash.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import emptyImage from '../../assets/empty.svg';
class Dash extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            applications: [],
            loading : true,
        }
        
    }

    componentDidMount() {
        
        this._isMounted = true;

        console.log('comp mounted dash');
        this.renderChart();
        
        appService.getApplications().then(res => {

            if(this._isMounted){
            console.log('getting data ', res.data);
            
                this.setState({
                applications: res.data,
                loading : false,
            })
            }
        });

    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    renderChart() {
        var ctx = document.getElementById("dStats");
        console.log("ctx" , ctx);
    }
    handleDeleteApp(app){
        
        let { _id } = app;
        appService.deleteApplication(_id).then(res => {
            const {applications} = this.state;
            const appIndex = applications.indexOf(app);
            applications.splice(appIndex, 1);
            this.setState({
                applications : applications,
            })
        }).catch(err => {
            console.log('Error happened when deleting application ', err);
        });
        
    }

    handleAddCompany(){
        console.log('Add company');
    }   
   
    renderNoApplications(){
        return (
            <div className="empty-image-container">
                <img src={emptyImage} alt="empty image" className="empty-image"/>
                <div className="empty-app-button">
                    Add new applications
                </div>
                
            </div>
        );
    }

    render() {
        const {applications, loading} = this.state;
        const applicationDiv = applications.map((app) => 
            <AppCard key={app._id} application={app} onClick={() => this.handleDeleteApp(app)}/>
        ); 

        if (loading) return null;
        if (applications.length === 0){
            return this.renderNoApplications();
        }
       
        return (
            <div>

                {/* <div className="quick-stats">
                    <canvas id="dStats" width="10" height="10"></canvas>
                </div> */}

             <ReactCSSTransitionGroup
                transitionName="application"
                transitionAppear={true}
                transitionAppearTimeout={2000}
                transitionEnter={false}
                transitionLeave={false}>
            
                <ReactCSSTransitionGroup
                    className="flex-container"
                    transitionName="application"
                    transitionEnter={false}
                    transitionLeaveTimeout={300}
                >
                    {applicationDiv}
                </ReactCSSTransitionGroup>
            

            
            </ReactCSSTransitionGroup>
            </div>
           
        );
    }

}

export default Dash;