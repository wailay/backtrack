import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText';
import cities from '../../cities.json';
import AutoSuggestWrapper from '../../shared/AutoSuggestWrapper';
import Button from '@material-ui/core/Button';
import appService from '../../services/AppService';
import './Company.css';

//TODO REFACTOR THIS CLASS NAME TO AddApplicationDialog

class AppCompanyDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selectedSuggestion: false,
            location: '',
            position: '',
        };
    }

    handleDialogClose = () => {
        this.setState({
            location : '',
        })
        this.props.onClick();
    }

    componentWillUnmount() {
        console.log('dialog unmounted');
    }

    getAutoSuggestValue = (value) => {
        this.setState({
            location: value,
        })
    }
    handlePositionChange = (event) => {
        this.setState({
            position: event.target.value,
        })
    }


    handleAddCompany = () => {
        const { company } = this.props;
        const { location, position } = this.state;
        const data = {
            company: {
                name: company.name,
                url: company.url,
            },
            location: location,
            position: position,
        };

        appService.addApplication(data).then(res => {
            console.log(res.data);
            //Close the dialog
            this.handleDialogClose();
        }).catch(err => {
            console.log("an error happened while adding an apps ", err);
        });

    }
    renderSubmitButton() {
        const { location, position } = this.state;
        if (location === '' || position === '') {
            return <Button disabled> Add Company </Button>;
        } else {
            return <Button onClick={this.handleAddCompany}> Add Company </Button>;
        }

    };

    render() {
        let { open, company } = this.props;

        return (
            <div>
                <Dialog open={open} onClose={this.handleDialogClose} aria-labelledby="form-dialog-title" className="dialog">
                    <DialogTitle id="form-dialog-title">Add Job Application</DialogTitle>

                    <DialogContent>
                        <DialogContentText style={{ marginBottom: 25 }}>
                            <img style={{ verticalAlign: 'middle', marginRight: 10, height: 32, width: 32 }} alt="Company Logo" src={`https://${company.url}/favicon.ico`} />
                            {company.name}
                        </DialogContentText>
                        <div className="group-input-container">
                            <div className="input-container">
                                <label style={{ marginRight: 23 }}>
                                    Position
                                </label>
                                <input className="position-input" placeholder="Position..." value={this.state.position} onChange={this.handlePositionChange} />
                            </div>
                            <div className="input-container">
                                <div className="label">
                                    Location
                                </div>
                                <AutoSuggestWrapper sendValueToParent={this.getAutoSuggestValue} locations={cities} />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogClose}>Cancel</Button>
                        {this.renderSubmitButton()}
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

export default AppCompanyDialog;