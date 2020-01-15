import React from 'react';
import './CompanyCard.css';
class CompanyCard extends React.Component {

    handleCompanyClick(){
        this.props.onClick();
    }


    render() {
        let {name, url} = this.props.company;
        return(
            <div className="company-container" onClick={() => this.handleCompanyClick()}>
                <div className="company-logo">
                    <img style={{width : 32, height : 'auto'}}src={`https://${url}/favicon.ico`} alt="company logo" />
                </div>
                <div className="company-name">
                    {name}
                </div>
            </div>
        );
    }
}

export default CompanyCard;