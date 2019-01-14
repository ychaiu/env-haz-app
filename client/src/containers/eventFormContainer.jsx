import React, { Component } from 'react';
import SingleInput from '../components/eventForm/formPresentational/SingleInput';
import Select from '../components/eventForm/formPresentational/Select';
import DateTimeInput from '../components/eventForm/formPresentational/DateTime';
import TextArea from '../components/eventForm/formPresentational/TextArea';
// import ImageUpoad from '../components/eventForm/formPresentational/ImageUpload';
import FormErrors from '../components/eventForm/formPresentational/FormErrors';
import { newMarkerPostAction } from '../redux/actions/newMarkerPostAction';
import { connect } from 'react-redux';

class EventFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newEvent: {
                eventTitle: '',
                selectedHaz: '',
                dateTimeSeen: '',
                dateTimeStart: '',
                eventDescription: '',
                eventTitleValid: false,
                seletedHazValid: false,
                dateTimeSeenValid: false,
                eventDescriptionValid: false,
                formValid: false,
                formErrors: { eventTitle: '', selectedHaz: '', dateTimeSeen: '', eventDescription: '' }
            },

            hazardOptions: ["Air", "Water", "Noise", "Pest",
                "Chemical exposure", "Hazardous waste", "Food safety"],
        }

        this.handleEventTitle = this.handleEventTitle.bind(this);
        this.handleSelectedHaz = this.handleSelectedHaz.bind(this);
        this.handleDateTimeSeen = this.handleDateTimeSeen.bind(this);
        this.handleDateTimeStart = this.handleDateTimeStart.bind(this);
        this.handleEventDescription = this.handleEventDescription.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.newEvent.formErrors;
        let eventTitleValid = this.state.newEvent.eventTitleValid;
        let selectedHazValid = this.state.newEvent.selectedHazValid;
        let dateTimeSeenValid = this.state.newEvent.dateTimeSeenValid;
        let eventDescriptionValid = this.state.newEvent.eventDescriptionValid;

        switch (fieldName) {
            case 'eventTitle':
                eventTitleValid = value.length <= 100;
                //this is a JS conditional statement. after ?, first statement executed if true, second is false
                fieldValidationErrors.eventTitle = eventTitleValid ? '' : 'Title should not exceed 100 characters';
                break;
            case 'selectedHaz':
                selectedHazValid = value !== '';
                fieldValidationErrors.selectedHaz = selectedHazValid ? '' : 'Please select one hazard category';
                break;
            case 'dateTimeSeen':
                dateTimeSeenValid = value !== '';
                fieldValidationErrors.dateTimeSeen = dateTimeSeenValid ? '' : 'Please estimate the date and time that you witnessed this event';
                break;
            case 'eventDescription':
                eventDescriptionValid = value.length <= 1000;
                fieldValidationErrors.eventDescription = eventDescriptionValid ? '' : 'Description should not exceed 1000 characters';
                break;
            default:
                break;
        }
        this.setState({
            newEvent:{formErrors: fieldValidationErrors,
            eventTitleValid: eventTitleValid,
            selectedHazValid: selectedHazValid,
            dateTimeSeenValid: dateTimeSeenValid,
            eventDescriptionValid: eventDescriptionValid},
        }, this.validateForm);
    }

    validateForm() {
        console.log(this.state);
        this.setState({
            formValid: this.state.newEvent.eventTitleValid &&
                this.state.newEvent.selectedHazValid &&
                this.state.newEvent.dateTimeSeenValid &&
                this.state.newEvent.eventDescriptionValid
        });
    }

    handleEventTitle(evt) {
        let value = evt.target.value;
        this.setState(prevState => ({
            newEvent:
            {
                ...prevState.newEvent, eventTitle: value
            }
        }), () => {
            this.validateField('eventTitle', value)
        });
    }

    handleSelectedHaz(evt) {
        let value = evt.target.value;
        this.setState(prevState => ({
            newEvent:
            {
                ...prevState.newEvent, selectedHaz: value
            }
        }), () => {
            this.validateField('selectedHaz', value)
        });
    }

    handleDateTimeSeen(date) {
        this.setState(prevState => ({
            newEvent:
            {
                ...prevState.newEvent, dateTimeSeen: date
            }
        }), () => {
            this.validateField('dateTimeSeen', date)
        });
    }

    handleDateTimeStart(date) {
        this.setState(prevState => ({
            newEvent:
            {
                ...prevState.newEvent, dateTimeStart: date
            }
        }));
    }

    // handlePhotoUpload(evt) { 
    //     let value = evt.target.files[0]
    //     this.setState (prevState => ({ newEvent:
    //         {...prevstate.newEvent, selectedFile: value}
    //     })
    // }

    handleEventDescription(evt) {
        let value = evt.target.value;
        this.setState(prevState => ({
            newEvent:
            {
                ...prevState.newEvent, eventDescription: value
            }
        }), () => {
            this.validateField('eventDescription', value)
        });
    }

    handleFormSubmit(evt) {
        console.log(this.state);
        evt.preventDefault();
        let formData = this.state.newEvent;
        formData['latitude'] = this.props.newMarker.lat
        formData['longitude'] = this.props.newMarker.lng

        fetch('http://localhost:5000/api/submit_event_data', {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                response.json()
                    .then(data => {
                        this.props.newMarkerPostAction(data);
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
            }
        });
    }

    render() {
        console.log(this.state);
        return (
            <div id="sidebar">
                <div className="sidebar-header">
                    <h3>Report an Event</h3>
                </div>
                <div>
                    <p>Click on your area of interest to place a marker. Fill in the form below to submit details about the hazard.</p>
                </div>
                <div className="container">
                    <div className="panel panel-default">
                        <FormErrors formErrors={this.state.newEvent.formErrors} />
                    </div>
                    <form onSubmit={this.handleFormSubmit}>
                        <SingleInput
                            type={'text'}
                            title={'Event Title'}
                            name={'eventTitle'}
                            value={this.state.newEvent.eventTitle}
                            placeholder={'Enter a Title'}
                            handleChange={this.handleEventTitle}
                            required
                        />
                        <Select
                            title={'Hazard Type'}
                            name={'hazardSelections'}
                            options={this.state.hazardOptions}
                            value={this.state.newEvent.selectedHaz}
                            placeholder={'Select Type'}
                            handleChange={this.handleSelectedHaz}
                        />
                        <DateTimeInput
                            name={'dateTimeSeen'}
                            title={'Date and Time Seen'}
                            value={this.state.newEvent.dateTimeSeen}
                            handleChange={this.handleDateTimeSeen}
                        />
                        <DateTimeInput
                            name={'dateTimeStart'}
                            title={'When Did This Event Start?'}
                            value={this.state.newEvent.dateTimeStart}
                            handleChange={this.handleDateTimeStart}
                        />
                        <TextArea
                            title={'Description'}
                            name={'eventDescription'}
                            rows={10}
                            value={this.state.newEvent.eventDescription}
                            handleChange={this.handleEventDescription}
                            placeholder={"Describe the event"}
                        />
                        <input type="submit" className="btn-primary float-right" value="Submit"
                        disabled={!this.state.newEvent.formValid}
                        />
                        <button className="btn btn-link float-left"
                            onClick={this.handleClearForm}
                        >
                            Clear form
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    newMarkerPostAction: (newMarker) => dispatch(newMarkerPostAction(newMarker))
})

export default connect(null, mapDispatchToProps)(EventFormContainer);
