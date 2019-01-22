import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from '../components/comment/comment';
import TextArea from '../components/eventForm/formPresentational/TextArea';
import { changeCommentStateAction } from '../redux/actions/changeCommentStateAction';
// import Button from '../components/eventForm/formPresentational/Button';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class CommentContainer extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            newComment: {
                commentInput: '',
            },
            // modal: true

        }
        this.toggleOff = this.toggleOff.bind(this);
        this.handleCommentInput = this.handleCommentInput.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
    }

    // toggle() {
    //     this.setState({
    //         modal: !this.state.modal
    //     })
    // }

    toggleOff() {
        this.props.changeCommentStateAction(false);
    }

    handleCommentInput (evt) {
        let value = evt.target.value;
        let name = evt.target.name;
        this.setState(prevState => ({
            newComment:
            {
                ...prevState.newComment, [name]: value
            }
        }), );
    }

    handleFormSubmit(evt) {
        evt.preventDefault();
        let formData = this.state.newComment;

        fetch('http://localhost:5000/api/submit_comment', {
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
                        console.log(data);
                    })
            })
        this.handleClearForm(evt);
    }

    handleClearForm(evt) {
        evt.preventDefault();
        this.setState({
            newComment: {
                commentInput: '',
            }
        });
    }
    

    render() {
        if (this.props.comments) {
            return (
                <div>
                    <Button color="danger" onClick={this.toggleOff}>{this.props.buttonLabel}</Button>
                    <Modal isOpen={true} toggle={this.toggleOff} className={this.props.className}>
                        <ModalHeader toggle={this.toggleOff}>Comments</ModalHeader>
                        <ModalBody>
                            <div>
                                {this.props.comments.map((comment, i) => <Comment text={comment} key={i} />)}
                            </div>
                            <div className="container">
                                <form>
                                    <TextArea
                                        title={'Submit a Comment'}
                                        name={'commentInput'}
                                        rows={10}
                                        value={this.state.newComment.commentInput}
                                        handleChange={this.handleCommentInput}
                                        placeholder={"Enter a Comment"}
                                    />
                                </form>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.handleFormSubmit}>Submit</Button>{' '}
                            <Button color="secondary" onClick={this.toggleOff}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            )
        }
        else {
            return (null)
        }
    }
}

const mapStateToProps = state => {
    return { comments: state.commentReducers.comments,
            isCommentOpen: state.commentReducers.isCommentOpen }
}

const mapDispatchToProps = dispatch => {
    return {changeCommentStateAction: (commentState) => dispatch(changeCommentStateAction(commentState))}
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);




{/* <Button
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
/> */}