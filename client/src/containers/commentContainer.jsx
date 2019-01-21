import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from '../components/comment/comment';

class CommentContainer extends Component {

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
                </div>
            )
        }
        else {
            return (null)
        }
    }
}

const mapStateToProps = state => {
    return { comments: state.commentReducer.comments }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);
