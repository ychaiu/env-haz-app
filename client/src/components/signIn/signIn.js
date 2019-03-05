// NOT YET IMPLEMENTED

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { openSignIn } from '../../redux/actions/openSignIn';
import SingleInput from '../eventForm/formPresentational/SingleInput';

class SignIn extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            userEmail: "",
            userPassword: "",
        }
        this.toggleOff = this.toggleOff.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    toggleOff() {
        this.props.openSignIn(false);
    }

    handleEmail(evt) {
        let value = evt.target.value;
        let name = evt.target.name;
        this.setState(prevState => ({
                ...prevState, [name]: value
        }), );
    }

    handlePassword(evt) {
        let value = evt.target.value;
        let name = evt.target.name;
        this.setState(prevState => ({
                ...prevState, [name]: value
        }), );
    }

    handleFormSubmit(evt) {
        evt.preventDefault();
        let formData = this.state
        console.log(formData);

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
    }

    render() {
            return (
                <div>
                    <Modal isOpen={this.props.signInState} toggle={this.toggleOff} className="modal-dialog-centered">
                        <ModalHeader className = "modal-title" toggle={this.toggleOff}>Sign In</ModalHeader>
                        <ModalBody>
                            <div class="signInWrapper fadeInDown">
                                <div id="signInContent">
                                    <form>
                                        <SingleInput
                                            type={'text'}
                                            title={'Email'}
                                            name={'userEmail'}
                                            value={this.state.userEmail}
                                            placeholder={'Enter Your Email'}
                                            handleChange={this.handleEmail}
                                            className={"form-control"}
                                            id={"sign-in-email"}
                                        />
                                        <SingleInput
                                            type={'text'}
                                            title={'Password'}
                                            name={'userPassword'}
                                            value={this.state.userPassword}
                                            placeholder={'Enter Your Password'}
                                            handleChange={this.handlePassword}
                                            className={"form-control"}
                                            id={"sign-in-password"}
                                        />
                                    </form>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button className = "sign-in-submit" color="primary" onClick={this.handleFormSubmit}>Sign In</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            )
    }
}

const mapStateToProps = state => {
    return { 
        signInState: state.userReducers.openSignIn,
    }
}

const mapDispatchToProps = dispatch => ({
    openSignIn: (state) => dispatch(openSignIn(state)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
