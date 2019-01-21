import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from '../components/comment/comment';

class CommentContainer extends Component {

    displayComments() {
        const comments = this.props.comments;
        console.log(comments);

        // let comments_array = this.Array.from(this.props.comments);
        // comments_array.map(function (comment) {
        //     return (
        //         <div>{comment}</div>
        //     );
        // })
    }

    render() {
        return (
            <div>
                {this.displayComments()}
            </div>
        )

    }
}

const mapStateToProps = state => {
    return { comments: state.commentReducer.comments }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);
