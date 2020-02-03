import React from 'react';
import companyService from '../../services/CompanyService';
import LoadingSpinner from '../../shared/LoadingSpinner';
import CompanyCard from './CompanyCard';
import AddCompanyDialog from './AddCompanyDialog';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Fuse from 'fuse.js';
import './Company.css';

var fuse;
class CompanyDash extends React.Component {
    _isMounted = true;
    constructor(props){
        super(props);
        this.state = {
            companies : [],
            unchangedCompanies : [],
            currentCompany : {},
            loading : true,
            dialogOpen : false,
        }
    }

    initFuzzySearch(){
        var options = {
            threshold: 0.3,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
                "name"
            ]
          };

          fuse = new Fuse(this.state.companies, options);
    }
    componentDidMount(){
        this._isMounted = true;
        companyService.getCompanies().then(res => {
            if(this._isMounted){
            this.setState({
                companies : res.data,
                unchangedCompanies : res.data,
                loading : false,
            });

            this.initFuzzySearch();

        }
        }).catch(err => {
            console.log("error when fetching companies ", err);
        })
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    handleSearch = (event) => {
        // console.log(event.target.value);/
        var newSearch = fuse.search(event.target.value);
        if(newSearch.length > 0){
            console.log("yoooo" ,newSearch);
            this.setState({
                companies : newSearch,
            })


        }else{
            this.setState({
                    companies : this.state.unchangedCompanies,
                })
        }
        

    }
    handleAddCompanyClick(company) {
        this.setState({
            dialogOpen : true,
            currentCompany : company,
        })
    }

    handleCompanyDialogClose = () => {
        console.log("closing dialog");
        this.setState({
            dialogOpen : false,
        })
    }
    render(){
        const {companies, loading, dialogOpen} = this.state;
        console.log(companies);
        const companiesCard = companies.map(company => 
                
                <CompanyCard key={company._id} company={company} onClick={() => this.handleAddCompanyClick(company)}/>);

        if(loading) return this.loadingSpinner();

        
        return(
            <div>
                <div className="search">
                <form >
                    <input type="text" placeholder="Search company..." onChange={this.handleSearch}/>
                </form>
                </div>


                <ReactCSSTransitionGroup
                transitionName="company"
                transitionAppear={true}
                transitionAppearTimeout={2000}
                transitionEnter={false}
                transitionLeave={false}>

                <ReactCSSTransitionGroup
                    className="companies-container"
                    transitionName="company"
                    transitionEnter={false}
                    transitionLeaveTimeout={300}
                >
                {companiesCard}
                
                </ReactCSSTransitionGroup>

                </ReactCSSTransitionGroup>
                
            <AddCompanyDialog open={dialogOpen} onClick={this.handleCompanyDialogClose} company={this.state.currentCompany} />
                
            </div>
        );
    }
    loadingSpinner(){
        return(
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }
}

export default CompanyDash;