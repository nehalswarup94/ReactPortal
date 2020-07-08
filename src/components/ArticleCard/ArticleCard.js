import React from 'react';
import './ArticleCard.scss';
import { Redirect, Link } from 'react-router-dom';
import Article from '../Article/Article';

class ArticleCard extends React.Component{


    changeFav = (slug,status,e) =>{
        this.props.changeFav(slug,status);
    }
    render(){
        console.log('after click')
        const {article} = this.props;
        const btnClass = article.favorited ? 'btn btn-sm fav-btn' : 'btn btn-sm not-fav-btn';
        return(
            <div className='card article-card'>
                <div style={{display:"flex"}}>
                <span style={{flexBasis:"95%"}}>
                <img src="https://static.productionready.io/images/smiley-cyrus.jpg"
                style={{height:"1rem", width:"1rem",  borderRadius:"2rem"}}></img>&nbsp;&nbsp;{article.author.username}
                </span>
                
                <button className={btnClass} 
                onClick={!article.favorited ? this.changeFav.bind(this,article.slug,'mark_fav') 
                : this.changeFav.bind(this,article.slug,'mark_unfav')}>
                {article.favoritesCount}</button>
   
                </div>
                <h3><Link to={`/article/${article.slug}`} className='article-title'>{article.title}</Link></h3>
                <p className='article-desc'>{article.description}</p>
                <Link to={`/article/${article.slug}`} className='read-more'>Read More..</Link>
                
            </div>
        )
    }
}

export default ArticleCard;