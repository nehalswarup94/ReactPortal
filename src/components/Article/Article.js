import React from 'react';
import './Article.scss';
import {Link } from 'react-router-dom';
import Comments from '../Comments/Comments.js';
import AddComments from '../Comments/AddComments.js';

class Article extends React.Component {
    render() {
        return (
            <>
            <div className='article-heading-div'>
                <h1 className='article-name'>Name</h1>
                <p className='article-details'>A Place to share your knowledge</p>
            </div>

            <div className='container'>
                <h3>Name</h3>
                <br/><br/>
                <hr/>
                <div className='container comment-section'> 
                    <p><Link className='redirect-link' to='/login'>Sign In</Link> or <Link className='redirect-link' to='/register'>Sign Up</Link> to add comments.</p>
                    <Comments/>
                    <AddComments/>
                </div>
            </div>
            </>
        )
    }
}

export default Article;