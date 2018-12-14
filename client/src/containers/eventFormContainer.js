import React, { Component } from 'react';
import SingleInput from '../components/eventForm/formPresentational/SingleInput';
import Select from '../components/eventForm/formPresentational/Select';
import TextArea from '../components/eventForm/formPresentational/TextArea';

class EventFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventTitle: '',
            hazardSelections: [],
            selectedHaz: '',
            eventDescription: ''
        },

        // alternatively, can write functions with fat arrow, which in
        // ES6 automatically binds
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
    }
    componentDidMount() {
        fetch('localhost:5000/hazardSelection.json')
            .then(results => results.json())
            .then(data => {
                this.setState({
                    // eventTitle: data.eventTitle,
                    hazardSelections: data.hazlist
                    // eventDescription: data.eventDescription
                });

            });
    }

    handleFormSubmit(evt) {
        evt.preventDefault()
        this.handleClearForm(evt);

    //   fetch('http://example.com',{
    //     method: "POST",
    //     body: JSON.stringify(userData),
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //   }).then(response => {
    //     response.json().then(data =>{
    //       console.log("Successful" + data);
    //     })
    // })

    }

    handleClearForm(evt) {
        evt.preventDefault();
        this.setState({
            eventTitle: '',
            selectedHaz: '',
            eventDescription: ''
        });
    }

    render() {
        return (
            <form className="eventFormContainer" onSubmit={this.handleFormSubmit}>
                <SingleInput 
                type={'text'}
                title=
     
                <input type="submit" className="btn-primary float-right" value="Submit" />
            <button className="btn btn-link float-left"
            onClick={this.handleClearForm}>Clear form</button>
            </form>
        );
    }
}

export default EventFormContainer;
