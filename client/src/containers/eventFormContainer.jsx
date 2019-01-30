import React, { Component } from 'react';
import SingleInput from '../components/eventForm/formPresentational/SingleInput';
import Select from '../components/eventForm/formPresentational/Select';
import DateTimeInput from '../components/eventForm/formPresentational/DateTime';
import TextArea from '../components/eventForm/formPresentational/TextArea';
import Button from '../components/eventForm/formPresentational/Button';
import { addNewMarker } from '../redux/actions/addNewMarker';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import config from '../config/config';
import classNames from 'classnames';

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
            files: [],
            formErrors: '',
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

    onDrop(files) {
      this.setState({
        files: files.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }))
      });
    }


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
        let eventId;

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
            .then(function(response) {
                if(response.ok) {
                    return response.json()} 
            })
            .then(data => {
                this.props.addNewMarker(data);
                eventId = data.event_id;
                console.log("handleformsubmit", eventId)
                return eventId
            })
            .then(eventId => {this.uploadPhotos(this.state.files, eventId)
            })
        // and catch to all promises. this is good practice!
    }

    uploadPhotos(files, eventId) {
        let storeEventId = eventId;
        let data;
        let fileURLS = new Array();
        // Push all the axios request promise into a single array
        const uploaders = files.map(file => {
          // Initial FormData
          const formData = new FormData();
          formData.append("file", file);
          formData.append("tags", `codeinfuse, medium, gist`);
          formData.append("upload_preset", cloudinaryPreset); // Replace the preset name with your own
          formData.append("api_key", cloudinaryAPI); // Replace API key with your own Cloudinary key
          formData.append("timestamp", (Date.now() / 1000) | 0);

          // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
          return axios
            .post(cloudinaryUploadURL, formData, {
              headers: { "X-Requested-With": "XMLHttpRequest" }
            })
            .then(response => {
              data = response.data;
              fileURLS.push(data.secure_url); // You should store this URL for future references in your app
            });
        });

        this.setState({
            files: files.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
            }))
        });        

        // Once all the files are uploaded 
        axios.all(uploaders).then(() => {
            let photoObj = {
                urls: fileURLS,
                eventId: storeEventId
            }

            fetch('http://localhost:5000/api/submit_photos', {
                method: "POST",
                body: JSON.stringify(photoObj),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
        });
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
            },
            files: [],
        });
    }
      
    componentWillUnmount() {
        // Make sure to revoke the data uris to avoid memory leaks
        this.state.files.forEach(file => URL.revokeObjectURL(file.preview))
      }

    render() {
        const {files} = this.state;
        const thumbs = files.map(file => (
          <div style={thumb} key={file.name}>
            <div style={thumbInner}>
              <img
                src={file.preview}
                style={img}
              />
            </div>
          </div>
        ));

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
                        <section>
                            <Dropzone
                                accept="image/*"
                                onDrop={this.onDrop.bind(this)}
                            >
                                {({getRootProps, getInputProps}) => (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Drop files here</p>
                                </div>
                                )}
                            </Dropzone>
                            <aside style={thumbsContainer}>
                                {thumbs}
                            </aside>
                        </section>
                        
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

const cloudinaryAPI = config.cloudinaryAPI;

const cloudinaryPreset = config.cloudinaryPreset;

const cloudinaryUploadURL = config.cloudinaryUploadURL;

const buttonStyle = {
    margin: "10px 10px 10px 10px"
};

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};
  
const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

const mapDispatchToProps = dispatch => ({
    addNewMarker: (newMarker) => dispatch(addNewMarker(newMarker))
})

export default connect(null, mapDispatchToProps)(EventFormContainer);