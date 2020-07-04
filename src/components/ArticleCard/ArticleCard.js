import React from 'react';
import './ArticleCard.scss';
import { Redirect, Link } from 'react-router-dom';

class ArticleCard extends React.Component{
    render(){
        return(
            <div className='card article-card'>
                <div style={{display:"flex"}}>
                <span style={{flexBasis:"90%"}}>
                <img src="https://static.productionready.io/images/smiley-cyrus.jpg"
                style={{height:"1rem", width:"1rem"}}></img>Name
                </span>
                {/* <Link to='/create'>Delete</Link> */}
                <Link to='/edit'>Edit</Link>&nbsp;
                Delete
                </div>
                <h3>Hello world</h3>
                <h2>Hello</h2>
                <Link to='/article/nehal'>Read More..</Link>
                
            </div>
        )
    }
}

export default ArticleCard;