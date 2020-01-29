import React from 'react';
import AutoSuggest from 'react-autosuggest';
import './AutoSuggest.css'



class AutoSuggestWrapper extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value : '',
            suggestions : [],
        };
       
    }

    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        
        return inputLength === 0 ? [] : this.props.data.filter(data => 
            data.value.toLowerCase().slice(0, inputLength) === inputValue
        );
    };
    
    getSuggestionValue = suggestion => suggestion.value;
    
    renderSuggestion = suggestion => (
        <div>
            {suggestion.value};
        </div>
    );


    
    onChange = (event, {newValue}) => {

        //In case the user changes or deletes the suggestion, tell the parent
        if(newValue === '' || this.state.value !== newValue) {
            this.props.sendValueToParent('');
        }
        this.setState({
            value : newValue,
        });
        

    };

    onSuggestionsFetchRequested = ({ value , reason}) => {
        this.setState({
          suggestions: this.getSuggestions(value)
        });


      };

    onSuggestionsClearRequested = () => {
    this.setState({
        suggestions: []
    });
    };

    onSuggestionSelected = (event, {suggestionValue}) => {
        console.log(suggestionValue);
        this.props.sendValueToParent(suggestionValue); 
    };

    

    render(){
        const {value, suggestions } = this.state;
        const inputProps = {
            placeholder : this.props.placeholder,
            value,
            onChange : this.onChange,
        };


        return(
            <div>
                <AutoSuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    onSuggestionSelected={this.onSuggestionSelected}
                    inputProps={inputProps}
                />
            </div>
        );
    }
}

export default AutoSuggestWrapper;