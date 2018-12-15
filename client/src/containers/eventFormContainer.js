import React, { Component } from 'react';
import SingleInput from '../components/eventForm/formPresentational/SingleInput';
import Select from '../components/eventForm/formPresentational/Select';
import TextArea from '../components/eventForm/formPresentational/TextArea';

class EventFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newEvent: {
                eventTitle: '',
                selectedHaz: '',
                eventDescription: ''
            },

            hazardOptions: ["Air", "Water", "Noise", "Pest", 
                "Chemical exposure", "Hazardous waste", "Food safety"]
        }

        // alternatively, can write functions with fat arrow, which in
        // ES6 automatically binds
        this.handleEventTitle = this.handleEventTitle.bind(this);
        this.handleSelectedHaz = this.handleSelectedHaz.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
    }
    // componentDidMount() {
    //     fetch('localhost:5000/hazardSelection.json')
    //         .then(results => results.json())
    //         .then(data => {
    //             this.setState({
    //                 // eventTitle: data.eventTitle,
    //                 hazardSelections: data.hazlist
    //                 // eventDescription: data.eventDescription
    //             });

    //         });
    // }

    handleEventTitle(evt) {
        let value = evt.target.value;
        this.setState (prevState => ({newEvent:
            {...prevState.newEvent, eventTitle: value
            }
        }))
    }

    handleSelectedHaz(evt) {
        let value = evt.target.value;
        this.setState (prevState => ({ newEvent: 
            {...prevState.newEvent, selectedHaz: value
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
                eventDescription: ''
            }
        });
    }

    render() {
        return (
            <form className="col-md-6 offset-md-6" onSubmit={this.handleFormSubmit}>
                <SingleInput 
                    type = {'text'}
                    title = {'Event Title'}
                    name = {'eventTitle'}
                    value = {this.state.newEvent.eventTitle}
                    placeholder = {'Brief Title'}
                    handleChange = {this.handleEventTitle}
                />
                <Select title = {'Hazard Type'}
                    name = {'hazardSelections'}
                    options = {this.state.hazardOptions}
                    value = {this.state.newEvent.selectedHaz}
                    placeholder = {'Select Hazard Type'}
                    handleChange = {this.handleSelectedHaz}
                />
                <TextArea
                    name = {'eventDescription'}
                    rows = {10}
                    value = {this.state.newEvent.eventDescription}
                    name = {"eventDescription"}
                    handleChange = {this.handleEventDescription}
                    placeholder = {"Description"}
                />
                <input type="submit" className="btn-primary float-right" value="Submit" 
                />
                <button className="btn btn-link float-left"
                onClick={this.handleClearForm}>Clear form
                </button>
            </form>
        );
    }
}

export default EventFormContainer;
