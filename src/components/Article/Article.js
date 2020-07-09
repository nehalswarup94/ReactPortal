import React from 'react';
import './Article.scss';
import { Link } from 'react-router-dom';
import { getArticle, markFavourite, markUnFavourite,  deleteArticle } from '../../services/actions/Article/articleActions';
import {followAuthor, unFollowAuthor} from '../../services/actions/Profile/profileActions';
import Comments from '../Comments/Comments.js';
import AddComments from '../Comments/AddComments.js';
import store from '../../store';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Article extends React.Component {

    state = {
        followed: this.props.article.article ? this.props.article.article.author.following : false,
        btnClicked:false
    }

    componentDidMount() {
        if(this.props.match.params.slug !== 'default'){
            this.props.getArticle(this.props.match.params.slug);
        }
    }

    static getDerivedStateFromProps(props,state){
        if(props.article.article && props.article.article.author.following !== state.followed && state.btnClicked===false){
            return {
                followed: props.article.article.author.following
            }
        }
        return null;
    }

    changeFav = (slug,status,e) => {
        if(status === 'mark-fav'){
            this.props.markFavourite(slug)
        }
        else{
            this.props.markUnFavourite(slug);
        }
    }

    changeFollow = (username,status,e) => {
        this.setState({
            btnClicked:true,
            followed:!this.state.followed
        });
        if(status === 'follow'){
            this.props.followAuthor(username)
        }
        else{
            this.props.unFollowAuthor(username);
        }
    }

    deleteArticle = (slug,e) => {
        this.props.deleteArticle(slug);
        this.props.history.push('/');
    }

    editArticle = (title,body,description,slug,e) => {
        this.props.history.push({
            pathname: '/createarticle',
            state: {
                title,
                body,
                description,
                slug
            }
        })
    }

    render() {
        console.log(this.state.followed);
        const { article,user } = this.props;
        const followClass = this.state.followed ? 'btn btn-follow' : 'btn btn-unfollow';
        const favClass = article.article && article.article.favorited ? 'btn btn-fav' : 'btn btn-unfav';
       
        return (
            <>
                <div className='article-heading-div'>
                    <h1 className='article-name'>{article.article && article.article.title}</h1><br/>
                    <div style={{display:"flex"}}>
                        <img src="https://static.productionready.io/images/smiley-cyrus.jpg"
                        style={{ height: "1rem", width: "1rem", marginTop:"0.3rem", borderRadius:"2rem" }}></img>&nbsp;&nbsp;
                        <p>{article.article && article.article.author.username}</p>

                    {/* Follow Buttons */}
                        {article.article && user.user.username !== article.article.author.username && this.state.followed ?
                        <button onClick={this.changeFollow.bind(this,article.article.author.username,'unfollow')} className={followClass}>UnFollow {article.article && article.article.author.username}</button>
                        :
                        article.article && 
                        user.user.username !== article.article.author.username && 
                        <button onClick={this.changeFollow.bind(this,article.article.author.username,'follow')} className={followClass}>Follow {article.article && article.article.author.username}</button>}
                        
                    {/* Favourite Buttons */}
                        {article.article && user.user.username !== article.article.author.username && article.article.favorited ?
                        <button className={favClass} onClick={this.changeFav.bind(this,article.article.slug,'mark-unfav')}>UnFavourite Article ({article.article && article.article.favoritesCount})</button>
                        :
                        article.article 
                        && user.user.username !== article.article.author.username 
                        && <button className={favClass} onClick={this.changeFav.bind(this,article.article.slug,'mark-fav')}>Favourite Article ({article.article && article.article.favoritesCount})</button>}
                        

                    {/* Edit Delete buttons */}
                        {article.article && user.user.username === article.article.author.username &&
                        <>
                        <button className='btn edit-btn' 
                        onClick={this.editArticle.bind(this,article.article.title,article.article.body,article.article.description,article.article.slug)}>
                        Edit Article</button>
                        <button className='btn del-btn' onClick={this.deleteArticle.bind(this,article.article.slug)}>Delete Article</button>
                        </>}
                        
                    </div>
                </div>

                <div className='container'>
                    <h3>{article.article && article.article.description}</h3>
                    <br /><br />
                    <hr />
                    <div className='container comment-section'>
                        <p><Link className='redirect-link' to='/login'>Sign In</Link> or <Link className='redirect-link' to='/register'>Sign Up</Link> to add comments.</p>
                        <Comments />
                        <AddComments />
                    </div>
                </div>
            </>
        )
    }
}

Article.propsTypes = {
    article: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getArticle: PropTypes.func.isRequired,
    markFavourite: PropTypes.func.isRequired,
    markUnFavourite: PropTypes.func.isRequired,
    followAuthor: PropTypes.func.isRequired,
    unFollowAuthor: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    article: state.article.article,
    user: state.auth.user
})
export default connect(mapStateToProps, { getArticle,markFavourite,markUnFavourite, followAuthor, unFollowAuthor, deleteArticle })(Article);