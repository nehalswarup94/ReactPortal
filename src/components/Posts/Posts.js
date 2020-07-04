import React from 'react';
import './Posts.scss';
import ArticleCard from '../ArticleCard/ArticleCard.js';
import {Link} from 'react-router-dom';

class Posts extends React.Component {
    render() {
        return (
            <>
                <div className='post-heading-div'>
                    <h1 className='my-portal'>Knowledge Portal</h1>
                    <p className='headline'>A Place to share your knowledge</p>
                </div>

                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-10'>
                            <Link to='/' className='load-feed'>Global Feed</Link>
                            <ArticleCard/>   
                        </div>
                        <div className='col-xs-12 col-sm-2'>
                            Hi
                    </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Posts;