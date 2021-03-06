import React from 'react';
import './CommentsList.scss';
import {getComments,deleteComment} from '../../services/actions/Comments/commentActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CommentsList extends React.Component{
    state = {
        comments:[],
        slug:this.props.slug
    }

    componentDidMount(){
        this.props.getComments(this.props.slug);
    }

    static getDerivedStateFromProps(props,state){
        if(props.slug!==state.slug){
            return{
                state:props.slug
            }
        }
        return null;
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.slug!==this.state.slug){
            return true
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.slug !== prevProps.slug) {
            this.props.getComments(this.props.slug);
        }
      }

    handleClick = (id,e) => {
        this.props.deleteComment(id,this.props.slug);
    }
    render(){
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
                    {comment.author.username === this.props.user.user.username &&
                    <button className='btn del-btn' onClick={this.handleClick.bind(this,comment.id)}>
                    <i className="fa fa-trash" aria-hidden="true"></i></button>
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