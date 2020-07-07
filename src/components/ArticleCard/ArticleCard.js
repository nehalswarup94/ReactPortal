import React from 'react';
import './ArticleCard.scss';
import { Redirect, Link } from 'react-router-dom';

class ArticleCard extends React.Component{
    render(){
        const {article} = this.props;
        const btnClass = article.favorited ? 'btn btn-sm fav-btn' : 'btn btn-sm not-fav-btn';
        return(
            <div className='card article-card'>
                <div style={{display:"flex"}}>
                <span style={{flexBasis:"95%"}}>
                <img src="https://static.productionready.io/images/smiley-cyrus.jpg"
                style={{height:"1rem", width:"1rem"}}></img>&nbsp;&nbsp;{article.author.username}
                </span>
                {/* <Link to='/create'>Delete</Link> */}
                <button className={btnClass} onClick={this.changeFav}>{article.favoritesCount}</button>
                </div>
                <h3>{article.title}</h3>
                <h2>{article.description}</h2>
                <Link to='/article/nehal' className='read-more'>Read More..</Link>
                
            </div>
        )
    }
}

export default ArticleCard;