import React from 'react';
import './CommentsList.scss';
import {getComments,deleteComment} from '../../services/actions/Comments/commentActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CommentsList extends React.Component{
    state = {
        comments:[]
    }

    componentDidMount(){
        this.props.getComments(this.props.slug);
    }

    handleClick = (id,e) => {
        this.props.deleteComment(id,this.props.slug);
    }
    render(){
        //const {id, createdAt, body, author} = this.props.comments;
        let list = this.props.comments && this.props.comments.map((comment,index)=>{
            return(
                <>
                <div className='card'>
                <input type='text' className='commentText' name='comment' value={comment.body}/>
                <div className='comment-list-footer'>
                    <span className='commentAuthor'>
                        <img src="https://static.productionready.io/images/smiley-cyrus.jpg"
                        style={{ height: "1rem", width: "1rem", marginTop:"0.3rem", borderRadius:"2rem" }}></img>&nbsp;&nbsp;
                        {comment.author.username} &nbsp; {comment.createdAt}
                    </span>
                    {comment.author.username === this.props.user.username &&
                    <button className='btn del-btn' onClick={this.handleClick.bind(this,comment.id)}>Delete</button>
                    }
                    </div>
                </div>
                <br/>
                </>
            )
        })
        return(
            <div className='comment-area' >
                {list}
            </div>
        )
    }
}

CommentsList.propTypes = {
    comments: PropTypes.array.isRequired,
    getComments: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    comments: state.comment.comments,
    user: state.auth.user
})

export default connect(mapStateToProps,{getComments,deleteComment})(CommentsList);