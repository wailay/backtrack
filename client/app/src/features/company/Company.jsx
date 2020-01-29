import React from 'react';
import companyService from '../../services/CompanyService';
import LoadingSpinner from '../../shared/LoadingSpinner';
import CompanyCard from './CompanyCard';
import AddCompanyDialog from './AddCompanyDialog';
import './Company.css';
class CompanyDash extends React.Component {
    _isMounted = true;
    constructor(props){
        super(props);
        this.state = {
            companies : [],
            currentCompany : {},
            loading : true,
            dialogOpen : false,
        }
    }
    componentDidMount(){
        this._isMounted = true;
        companyService.getCompanies().then(res => {
            if(this._isMounted){
            this.setState({
                companies : res.data,
                loading : false,
            });
        }
        }).catch(err => {
            console.log("error when fetching companies ", err);
        })
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    handleSearch(event) {
        console.log(event.target)
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
                    <input disabled type="text" placeholder="Search not implemented yet..." onChange={this.handleSearch}/>
                </form>
                </div>

                <div className="companies-container">
                {companiesCard}
                
                </div>
                
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