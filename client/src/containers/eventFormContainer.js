import React, { Component } from 'react';
import SingleInput from '../components/eventForm/formPresentational/SingleInput';
import Select from '../components/eventForm/formPresentational/Select';
import TextArea from '../components/eventForm/formPresentational/TextArea';

class EventFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventTitle: '',
            hazardSelection: '',
            eventDescription: ''
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
    }
    componentDidMount() {
        fetch('./whatisthis.json')
            .then(results => results.json())
            .then(data => {
                this.setState({
                    eventTitle: data.eventTitle,
                    hazardSelection: data.hazardSelection,
                    eventDescription: data.eventDescription
                });

            });
    }

    handleFullNameChange(evt) {
        this.setState({ userName: evt.target.value });
    }

    handl

    handleFormSubmit() {

    }

    handleClearForm() {

    }

    render() {
        return (
            <form className="eventFormContainer" onSubmit={this.handleFormSubmit}>
                <SingleInput />
                <Select />
                <TextArea />
                <input type="submit" className="btn-primary float-right" value="Submit" />
            <button className="btn btn-link float-left"
            onClick={this.handleClearForm}>Clear form</button>
            </form>
        );
    }
}

export default EventFormContainer;
