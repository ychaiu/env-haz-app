import React, { Component } from 'react';
import SingleInput from '../components/eventForm/formPresentational/SingleInput';
import Select from '../components/eventForm/formPresentational/Select';
import DateTimeInput from '../components/eventForm/formPresentational/DateTime';
import TextArea from '../components/eventForm/formPresentational/TextArea';
import ImageUpload from '../components/eventForm/formPresentational/ImageUpload';


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

    // handlePhotoUpload(evt) { 
    //     let value = evt.target.files[0]
    //     this.setState (prevState => ({ newEvent:
    //         {...prevstate.newEvent, selectedFile: value}
    //     })
    // }

    handleEventDescription(evt, props) {
        let value = evt.target.value;
        this.setState (prevState => ({ newEvent: 
            {...prevState.newEvent, eventDescription: value
            }
        }), () => console.log(this.state.newEvent))
    }

    handleFormSubmit(evt) {
        evt.preventDefault();
        let formData = this.state.newEvent;
        formData['latitude'] = this.props.newMarker.lat
        formData['longitude'] = this.props.newMarker.lng

        console.log(formData);

        fetch('http://localhost:5000/api/submit_event_data',{
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
        })
            .then(response => {
                response.json()
                .then(data =>{
                    console.log("Successful " + data);
                })
            })
    this.handleClearForm(evt);
    }

    handleClearForm(evt) {
        evt.preventDefault();
        this.setState({
            newEvent: {
                eventTitle: '',
                selectedHaz: '',
                dateTimeSeen: '',
                dateTimeStart: '',
                eventDescription: '',
                latitude: '',
                longitude: ''
            }
        });
    }

    render() {
        return (
                <div id="sidebar">
                    <div className="sidebar-header">
                        <h3>Report an Event</h3>
                    </div>
                    <div>
                        <p>Click on your area of interest to place a marker. Fill in the form below to submit details about the hazard.</p>
                    </div>
                    <div className="container">
                        <form onSubmit={this.handleFormSubmit}>
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
                                title = {'Date and Time Seen'}
                                value = {this.state.newEvent.dateTimeSeen}
                                handleChange = {this.handleDateTimeSeen}
                            />
                            <DateTimeInput
                                name = {'dateTimeStart'}
                                title = {'When Did This Event Start?'}
                                value = {this.state.newEvent.dateTimeStart}
                                handleChange = {this.handleDateTimeStart}
                            />
                            <ImageUpload />
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
                </div>
        );
    }
}

export default EventFormContainer;
