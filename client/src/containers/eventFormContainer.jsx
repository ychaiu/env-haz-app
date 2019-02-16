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
import LoadingSpinner from '../components/map/loadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'reactstrap';


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
                "Chemical Exposure", "Hazardous Waste", "Food Safety"],
            files: [],
            loading: false,
            alertVisible: false
        }

        this.handleEventTitle = this.handleEventTitle.bind(this);
        this.handleSelectedHaz = this.handleSelectedHaz.bind(this);
        this.handleDateTimeSeen = this.handleDateTimeSeen.bind(this);
        this.handleDateTimeStart = this.handleDateTimeStart.bind(this);
        this.handleEventDescription = this.handleEventDescription.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
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
        console.log(formData);

        formData['latitude'] = this.props.newMarker.lat
        formData['longitude'] = this.props.newMarker.lng
        
        this.setState({ loading: true }, () => { 
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
            .then(()=> this.handleClearForm(evt))
            .then(() => this.setState ({ alertVisible: true }))
            // and catch to all promises. this is good practice!
        })
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

    onDismiss() {
        this.setState({alertVisible: false})
    }
      
    componentWillUnmount() {
        // Make sure to revoke the data uris to avoid memory leaks
        this.state.files.forEach(file => URL.revokeObjectURL(file.preview))
      }

    render() {
        console.log(this.state);
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
            <div>
                <Alert className = "warning" color="success" isOpen={this.state.alertVisible} toggle={this.onDismiss}>
                Thank you for submitting your report!
                </Alert>
            <div id="sidebar">
                <div className ="sidebar-header-box" id="event-sidebar-image">
                    <div className="sidebar-header">
                        <h3>Report an Event</h3>
                    </div>
                </div>
                <div className ="form-summary-text">
                    <img id = "report-marker-icon" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2238%22%20height%3D%2257%22%20viewBox%3D%220%200%2038%2057%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%3Cdefs%3E%3Cfilter%20x%3D%22-50%25%22%20y%3D%22-50%25%22%20width%3D%22200%25%22%20height%3D%22200%25%22%20filterUnits%3D%22objectBoundingBox%22%20id%3D%22a%22%3E%3CfeGaussianBlur%20stdDeviation%3D%223%200%22%20in%3D%22SourceGraphic%22%2F%3E%3C%2Ffilter%3E%3Cpath%20d%3D%22M18.8860735%200C8.61100338%200%20.25126726%207.98542124.25126726%2017.7998965c0%203.2495066.92687906%206.4298405%202.69475502%209.2208772L18.2298042%2049.5147594c.1490785.221996.4018637.3539067.6708531.3539067.2706097%200%20.5217745-.1335194.6724734-.3555153L34.8488105%2026.985383c1.748431-2.765298%202.6720692-5.9424146%202.6720692-9.1854865C37.5208797%207.98542124%2029.1611436%200%2018.8860735%200z%22%20id%3D%22b%22%2F%3E%3Cfilter%20x%3D%22-50%25%22%20y%3D%22-50%25%22%20width%3D%22200%25%22%20height%3D%22200%25%22%20filterUnits%3D%22objectBoundingBox%22%20id%3D%22c%22%3E%3CfeGaussianBlur%20stdDeviation%3D%222%22%20in%3D%22SourceAlpha%22%20result%3D%22shadowBlurInner1%22%2F%3E%3CfeOffset%20dy%3D%22-2%22%20in%3D%22shadowBlurInner1%22%20result%3D%22shadowOffsetInner1%22%2F%3E%3CfeComposite%20in%3D%22shadowOffsetInner1%22%20in2%3D%22SourceAlpha%22%20operator%3D%22arithmetic%22%20k2%3D%22-1%22%20k3%3D%221%22%20result%3D%22shadowInnerInner1%22%2F%3E%3CfeColorMatrix%20values%3D%220%200%200%200%200.450980392%200%200%200%200%200.176470588%200%200%200%200%200.0901960784%200%200%200%200.2%200%22%20in%3D%22shadowInnerInner1%22%2F%3E%3C%2Ffilter%3E%3Cpath%20d%3D%22M26.369446%2018.3953073c0%203.9134615-3.1611233%207.09925-7.0481092%207.09925s-7.0497933-3.1857885-7.0497933-7.09925c0-3.9152365%203.1628074-7.0992501%207.0497933-7.0992501s7.0481092%203.1840136%207.0481092%207.0992501z%22%20id%3D%22d%22%2F%3E%3Cfilter%20x%3D%22-50%25%22%20y%3D%22-50%25%22%20width%3D%22200%25%22%20height%3D%22200%25%22%20filterUnits%3D%22objectBoundingBox%22%20id%3D%22e%22%3E%3CfeGaussianBlur%20stdDeviation%3D%221%22%20in%3D%22SourceAlpha%22%20result%3D%22shadowBlurInner1%22%2F%3E%3CfeOffset%20dy%3D%222%22%20in%3D%22shadowBlurInner1%22%20result%3D%22shadowOffsetInner1%22%2F%3E%3CfeComposite%20in%3D%22shadowOffsetInner1%22%20in2%3D%22SourceAlpha%22%20operator%3D%22arithmetic%22%20k2%3D%22-1%22%20k3%3D%221%22%20result%3D%22shadowInnerInner1%22%2F%3E%3CfeColorMatrix%20values%3D%220%200%200%200%200.349019608%200%200%200%200%200.137254902%200%200%200%200%200.0705882353%200%200%200%200.2%200%22%20in%3D%22shadowInnerInner1%22%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M19.0817717%2056.5765766c3.0827274%200%205.5817717-1.9199321%205.5817717-4.2882883C24.6635434%2049.9199321%2022.1644991%2048%2019.0817717%2048S13.5%2049.9199321%2013.5%2052.2882883c0%202.3683562%202.4990443%204.2882883%205.5817717%204.2882883z%22%20fill-opacity%3D%22.13%22%20fill%3D%22%23282C35%22%20filter%3D%22url(%23a)%22%2F%3E%3Cg%3E%3Cuse%20fill%3D%22%23F86820%22%20xlink%3Ahref%3D%22%23b%22%2F%3E%3Cuse%20fill%3D%22%23000%22%20filter%3D%22url(%23c)%22%20xlink%3Ahref%3D%22%23b%22%2F%3E%3C%2Fg%3E%3Cg%3E%3Cuse%20fill%3D%22%23BF4C28%22%20xlink%3Ahref%3D%22%23d%22%2F%3E%3Cuse%20fill%3D%22%23000%22%20filter%3D%22url(%23e)%22%20xlink%3Ahref%3D%22%23d%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"></img>
                    <div>Click on your place of interest to place a marker. Fill in the form below to submit details about the hazard.</div>
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
                            className={"form-control"}
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
                                    <label className="form-label">Upload Photos</label>
                                    <div id="dropzone-text">
                                    Drop files here &nbsp;
                                        <FontAwesomeIcon icon= "upload" size="sm" color= '#ffffffb3'/>
                                    </div>

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
                            className = {"form-control"}
                            classNameTitle= {"form-label"}
                        />
                        <Button
                            action={this.handleFormSubmit}
                            type={"primary"}
                            title={"Submit"}
                            className = {"btn btn-primary form-submit-button"}
                        />
                    </form>
                </div>
            </div>
        </div>
        );
    }
}


const cloudinaryAPI = config.cloudinaryAPI;

const cloudinaryPreset = config.cloudinaryPreset;

const cloudinaryUploadURL = config.cloudinaryUploadURL;

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