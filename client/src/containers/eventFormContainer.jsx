import React, { Component } from 'react';
import SingleInput from '../components/eventForm/formPresentational/SingleInput';
import Select from '../components/eventForm/formPresentational/Select';
import DateTimeInput from '../components/eventForm/formPresentational/DateTime';
import TextArea from '../components/eventForm/formPresentational/TextArea';
// import ImageUpoad from '../components/eventForm/formPresentational/ImageUpload';
import Button from '../components/eventForm/formPresentational/Button';
import { FormErrors } from '../components/eventForm/formPresentational/FormErrors';
import { addNewMarker } from '../redux/actions/addNewMarker';
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

    handleEventTitle(evt) {
        let value = evt.target.value;
        let name = evt.target.name;
        this.setState(prevState => ({
            newEvent:
            {
                ...prevState.newEvent, [name]: value
            }
        }), );
    }

    handleSelectedHaz(evt) {
        let value = evt.target.value;
        let name = evt.target.name;
        this.setState(prevState => ({
            newEvent:
            {
                ...prevState.newEvent, [name]: value
            }
        }), );
    }

    handleDateTimeSeen(date) {
        this.setState(prevState => ({
            newEvent:
            {
                ...prevState.newEvent, dateTimeSeen: date
            }
        }), );
    }

    handleDateTimeStart(date) {
        this.setState(prevState => ({
            newEvent:
            {
                ...prevState.newEvent, dateTimeStart: date
            }
        }), );
    }

    // handlePhotoUpload(evt) { 
    //     let value = evt.target.files[0]
    //     this.setState (prevState => ({ newEvent:
    //         {...prevstate.newEvent, selectedFile: value}
    //     })
    // }

    handleEventDescription(evt) {
        let value = evt.target.value;
        let name = evt.target.name;
        this.setState(prevState => ({
            newEvent:
            {
                ...prevState.newEvent, [name]: value
            }
        }), );
    }

    handleFormSubmit(evt) {
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
                        this.props.addNewMarker(data);
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
        return (
            <div id="sidebar">
                <div className="sidebar-header">
                    <h3>Report an Event</h3>
                </div>
                <div className ="form-summary-text">
                    <p>Click on your area of interest to place a marker. Fill in the form below to submit details about the hazard.</p>
                </div>
                <div className="container">
                    <form onSubmit={this.handleFormSubmit}>
                        <SingleInput
                            type={'text'}
                            title={'Event Title'}
                            name={'eventTitle'}
                            value={this.state.newEvent.eventTitle}
                            placeholder={'Enter a Title'}
                            handleChange={this.handleEventTitle}
                        />
                        <Select
                            title={'Hazard Type'}
                            name={'selectedHaz'}
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
                        <Button
                            action={this.handleClearForm}
                            type={"secondary"}
                            title={"Clear Form"}
                            style={buttonStyle}
                        />
                        <Button
                            action={this.handleFormSubmit}
                            type={"primary"}
                            title={"Submit"}
                            style= {buttonStyle}
                            disabled= {!this.state.newEvent.formValid}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

const buttonStyle = {
    margin: "10px 10px 10px 10px"
};

const mapDispatchToProps = dispatch => ({
    addNewMarker: (newMarker) => dispatch(addNewMarker(newMarker))
})

export default connect(null, mapDispatchToProps)(EventFormContainer);
