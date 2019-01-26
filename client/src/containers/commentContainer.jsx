import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from '../components/comment/comment';
import TextArea from '../components/eventForm/formPresentational/TextArea';
import { commentState } from '../redux/actions/commentState';
import { addComment } from '../redux/actions/addComment';
import { renderComments } from '../redux/actions/renderComments';

// import Button from '../components/eventForm/formPresentational/Button';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class CommentContainer extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            newComment: {
                comment_text: '',
                comment_user_fn: '',
                comment_user_ln: '',
                comment_submitted: ''
            },
        }
        this.toggleOff = this.toggleOff.bind(this);
        this.handleCommentInput = this.handleCommentInput.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
    }

    toggleOff() {
        this.props.commentState(false);
    }

    handleCommentInput (evt) {
        let value = evt.target.value;
        let name = evt.target.name;
        this.setState(prevState => ({
            newComment:
            {
                // ...prevState.newComment, 
                comment_text: value,
                comment_user_fn: '',
                comment_user_ln: '',
                comment_submitted: '',
            }
        }), );
    }

    handleFormSubmit(evt) {
        evt.preventDefault();
        let postAPIURL = 'http://localhost:5000/api/submit_comment/';
        let eventId = this.props.activeEvent.event_id;
        let formData = this.state.newComment;

        fetch(postAPIURL + eventId, {
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
                        this.updateCommentUI(data, eventId);
                    })
            })
        this.handleClearForm(evt);
    }

    updateCommentUI(data, eventId){
        console.log(data);
        let APIURL = "http://localhost:5000/api/render_comments/";
    
        fetch(APIURL + eventId)
          .then(response => response.json())
          .then(data => this.props.renderComments(data))
      }
    
    handleClearForm(evt) {
        evt.preventDefault();
        this.setState({
            newComment: {
                comment_text: '',
                comment_user_fn: '',
                comment_user_ln: '',
                comment_submitted: '',
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
                                {this.props.comments.map((comment, i) => <Comment 
                                                                            text={comment.comment_text} 
                                                                            firstName={comment.comment_user_fn}
                                                                            lastName={comment.comment_user_ln}
                                                                            submitted={comment.comment_submitted}
                                                                            key={i} />)}
                            </div>
                            <div className="container">
                                <form>
                                    <TextArea
                                        title={'Submit a Comment'}
                                        name={'comment_text'}
                                        rows={10}
                                        value={this.state.newComment.comment_text}
                                        handleChange={this.handleCommentInput}
                                        placeholder={"Enter a Comment"}
                                    />
                                </form>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.handleFormSubmit}>Submit</Button>{' '}
                            <Button color="secondary" onClick= {(event) =>{
                                                        {this.toggleOff()};
                                                        {this.handleClearForm(event)};
                                                    }}>Cancel</Button>
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
    return { 
        comments: state.commentReducers.comments,
        isCommentOpen: state.commentReducers.isCommentOpen,
        activeEvent: state.mapReducers.activeEvent
    }
}

const mapDispatchToProps = dispatch => {
    return {
        commentState: (newState) => dispatch(commentState(newState)),
        addComment: (newComment) => dispatch(addComment(newComment)),
        renderComments: (comments) => dispatch(renderComments(comments))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);