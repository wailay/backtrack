import React from 'react';
import companyService from '../../services/CompanyService';
import LoadingSpinner from '../../shared/LoadingSpinner';

class CompanyDash extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            companies : [],
            loading : true,
        }
    }
    componentDidMount(){
        companyService.getCompanies().then(res => {
            this.setState({
                companies : res.data,
                loading : false,
            })
        })
    }
    render(){
        const {companies, loading} = this.state;
        if(loading) return <div>Loading ....</div>

        console.log(this.state.companies);
        return(

            <div>
                <LoadingSpinner />        
            </div>
        );
    }

}

export default CompanyDash;