import React from 'react';
import './Comments.scss';
import {createComment} from '../../services/actions/Comments/commentActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Comments extends React.Component{
    
    state = {
        comment:''
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

    handleClick = (e) =>{
        e.preventDefault();
        const comment = {
            comment : {
                body: this.state.comment
            }
        }
        this.setState({
            comment:''
        })
        this.props.createComment(this.props.slug,comment);
    }
    render(){
        const {slug} = this.props;
        return(
            <div className='card comment-area' >
                <textarea className='comment' 
                rows='3'cols='10' name='comment' value={this.state.comment}
                onChange={this.handleChange} placeholder='Write a Comment...'/>
                <div className='comment-footer'>
                    <button className='btn' onClick={this.handleClick}>Post Comment</button>
                </div>
            </div>

        )
    }
}

Comments.propsTypes = {
    createComment: PropTypes.func.isRequired
}

export default connect(null,{createComment})(Comments);