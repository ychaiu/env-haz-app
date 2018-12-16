import React, { Component } from 'react';
import SingleInput from '../../components/eventForm/formPresentational/SingleInput';
import Select from '../../components/eventForm/formPresentational/Select';
import DateTimeInput from '../../components/eventForm/formPresentational/DateTime';
import TextArea from '../../components/eventForm/formPresentational/TextArea';

class EventFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newEvent: {
                eventTitle: '',
                selectedHaz: '',
                dateTimeSeen: '',
                dateTimeStart: '',
                eventDescription: ''
            },

            hazardOptions: ["Air", "Water", "Noise", "Pest", 
                "Chemical exposure", "Hazardous waste", "Food safety"]
        }

        // alternatively, can write functions with fat arrow, which in
        // ES6 automatically binds
        this.handleEventTitle = this.handleEventTitle.bind(this);
        this.handleSelectedHaz = this.handleSelectedHaz.bind(this);
        this.handleDateTimeSeen = this.handleDateTimeSeen.bind(this);
        this.handleDateTimeStart = this.handleDateTimeStart.bind(this);
        this.handleEventDescription = this.handleEventDescription.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
    }

    handleEventTitle(evt) {
        let value = evt.target.value;
        this.setState (prevState => ({newEvent:
            {...prevState.newEvent, eventTitle: value
            }
        }), () => console.log(this.state.newEvent))
    }

    handleSelectedHaz(evt) {
        let value = evt.target.value;
        this.setState (prevState => ({ newEvent: 
            {...prevState.newEvent, selectedHaz: value
            }
        }), () => console.log(this.state.newEvent))
    }

    handleDateTimeSeen(date) {
        this.setState (prevState => ({ newEvent:
            {...prevState.newEvent, dateTimeSeen: date
            }
        }), () => console.log(this.state.newEvent))
    }

    handleDateTimeStart(date) {
        this.setState (prevState => ({ newEvent:
            {...prevState.newEvent, dateTimeStart: date
            }
        }), () => console.log(this.state.newEvent))
    }

    handleEventDescription(evt) {
        let value = evt.target.value;
        this.setState (prevState => ({ newEvent: 
            {...prevState.newEvent, eventDescription: value
            }
        }), () => console.log(this.state.newEvent))
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
            newEvent: {
                eventTitle: '',
                selectedHaz: '',
                dateTimeSeen: '',
                eventDescription: ''
            }
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <form className="float-left" onSubmit={this.handleFormSubmit}>
                <h5>Report an Event</h5>
                    <SingleInput 
                        type = {'text'}
                        title = {'Event Title'}
                        name = {'eventTitle'}
                        value = {this.state.newEvent.eventTitle}
                        placeholder = {'Enter a Title'}
                        handleChange = {this.handleEventTitle}
                    />
                    <Select 
                        title = {'Hazard Type'}
                        name = {'hazardSelections'}
                        options = {this.state.hazardOptions}
                        value = {this.state.newEvent.selectedHaz}
                        placeholder = {'Select Type'}
                        handleChange = {this.handleSelectedHaz}
                    />
                    <DateTimeInput
                        name = {'dateTimeSeen'}
                        title = {'When Did You See This?'}
                        value = {this.state.newEvent.dateTimeSeen}
                        handleChange = {this.handleDateTimeSeen}
                        placeholder = {'Select a Date and Time'}
                    />

                    <DateTimeInput
                        name = {'dateTimeStart'}
                        title = {'When Did This Event Start? (Optional)'}
                        value = {this.state.newEvent.dateTimeStart}
                        handleChange = {this.handleDateTimeStart}
                    />

                    <TextArea
                        title={'Description'}
                        name = {'eventDescription'}
                        rows = {10}
                        value = {this.state.newEvent.eventDescription}
                        handleChange = {this.handleEventDescription}
                        placeholder = {"Describe the event"}
                    />
                    <input type="submit" className="btn-primary float-right" value="Submit" 
                    />
                    <button className="btn btn-link float-left"
                    onClick={this.handleClearForm}>Clear form
                    </button>
                </form>
            </div>
        );
    }
}

export default EventFormContainer;
