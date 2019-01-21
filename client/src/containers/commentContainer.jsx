import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from '../components/comment/comment';
import TextArea from '../components/eventForm/formPresentational/TextArea';
import Button from '../components/eventForm/formPresentational/Button';

class CommentContainer extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            newComment: {
                commentInput: '',
            },
        }

        this.handleCommentInput = this.handleCommentInput.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
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
                <div id="sidebar">
                    <div className="sidebar-header">
                        <h3>Comments</h3>
                    </div>
                    <div>
                        {this.props.comments.map((comment, i) => <Comment text = {comment} key ={i} />)}
                    </div>
                    <div className="container">
                        <form onSubmit={this.handleFormSubmit}> 
                            <TextArea
                                title={'Submit a Comment'}
                                name={'commentInput'}
                                rows={10}
                                value={this.state.newComment.commentInput}
                                handleChange={this.handleCommentInput}
                                placeholder={"Enter a Comment"}
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
                            />
                        </form>
                    </div>
                </div>
            )
        }
        else {
            return (null)
        }
    }
}
const buttonStyle = {
    margin: "10px 10px 10px 10px"
};

const mapStateToProps = state => {
    return { comments: state.commentReducer.comments }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);
