import React from 'react';
import './Article.scss';
import { Link, Redirect } from 'react-router-dom';
import { getArticle, markFavourite, markUnFavourite, deleteArticle } from '../../services/actions/Article/articleActions';
import { followAuthor, unFollowAuthor } from '../../services/actions/Profile/profileActions';
import Comments from '../Comments/Comments.js';
import CommentsList from '../Comments/CommentsList.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Article extends React.Component {

    state = {
        followed: this.props.article.article ? this.props.article.article.author.following : false,
        btnClicked: false,
        loading: true
    }

    async componentDidMount() {
        await this.setState({ loading: true });
        if (this.props.match.params.slug !== 'default') {
            this.props.getArticle(this.props.match.params.slug);
        }
        await this.setState({ loading: false });
        // else{
        //     this.props.getArticle(this.props.article.article.slug)
        // }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.article.article && props.article.article.author.following !== state.followed && state.btnClicked === false) {
            return {
                followed: props.article.article.author.following
            }
        }
        return null;
    }

    changeFav = (slug, status, e) => {
        if (status === 'mark-fav') {
            this.props.markFavourite(slug)
        }
        else {
            this.props.markUnFavourite(slug);
        }
    }

    changeFollow = (username, status, e) => {
        this.setState({
            btnClicked: true,
            followed: !this.state.followed
        });
        if (status === 'follow') {
            this.props.followAuthor(username)
        }
        else {
            this.props.unFollowAuthor(username);
        }
    }

    deleteArticle = (slug, e) => {
        this.props.deleteArticle(slug);
        this.props.history.push('/');
    }

    editArticle = (title, body, description, slug, e) => {
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
        const { article, user } = this.props;
        const followClass = this.state.followed ? 'btn btn-follow' : 'btn btn-unfollow';
        const favClass = article.article && article.article.favorited ? 'btn btn-fav' : 'btn btn-unfav';
        return (
            !this.props.isAuthenticated ?
                <Redirect to='/' />
                :
                <>
                    <div className='article-heading-div'>
                        <h1 className='article-name'>{this.state.loading?'Loading..':article.article && article.article.title}</h1><br />
                        <div style={{ display: "flex" }}>
                            <img src="https://static.productionready.io/images/smiley-cyrus.jpg"
                                style={{ height: "1rem", width: "1rem", marginTop: "0.3rem", borderRadius: "2rem" }}></img>&nbsp;&nbsp;
                        <p>{this.state.loading?'Loading..':article.article && article.article.author.username}</p>

                            {/* Follow Buttons */}
                            {article.article && user.user.username !== article.article.author.username && this.state.followed ?
                                <button onClick={this.changeFollow.bind(this, article.article.author.username, 'unfollow')} className={followClass}>
                                    <i className="fa fa-plus" aria-hidden="true"></i>&nbsp;UnFollow {this.state.loading?'Loading..':article.article && article.article.author.username}</button>
                                :
                                article.article &&
                                user.user.username !== article.article.author.username &&
                                <button onClick={this.changeFollow.bind(this, article.article.author.username, 'follow')} className={followClass}>
                                    <i className="fa fa-plus" aria-hidden="true"></i>&nbsp;Follow {this.state.loading?'Loading..':article.article && article.article.author.username}</button>}

                            {/* Favourite Buttons */}
                            {article.article && user.user.username !== article.article.author.username && article.article.favorited ?
                                <button className={favClass} onClick={this.changeFav.bind(this, article.article.slug, 'mark-unfav')}>
                                    <i className="fa fa-heart" aria-hidden="true"></i>&nbsp;UnFavourite Article ({this.state.loading?'Loading..':article.article && article.article.favoritesCount})</button>
                                :
                                article.article
                                && user.user.username !== article.article.author.username
                                && <button className={favClass} onClick={this.changeFav.bind(this, article.article.slug, 'mark-fav')}>
                                    <i className="fa fa-heart" aria-hidden="true"></i>&nbsp;Favourite Article ({this.state.loading?'Loading..':article.article && article.article.favoritesCount})</button>}


                            {/* Edit Delete buttons */}
                            {article.article && user.user.username === article.article.author.username &&
                                <>
                                    <button className='btn edit-btn'
                                        onClick={this.editArticle.bind(this, article.article.title, article.article.body, article.article.description, article.article.slug)}>
                                        Edit Article</button>
                                    <button className='btn del-btn' onClick={this.deleteArticle.bind(this, article.article.slug)}>Delete Article</button>
                                </>}

                        </div>
                    </div>

                    <div className='container'>
                        <h3>{this.state.loading?'Loading..':article.article && article.article.description}</h3>
                        <br /><br />
                        <hr />
                        <div className='container comment-section'>
                            {/* <p><Link className='redirect-link' to='/login'>Sign In</Link> or <Link className='redirect-link' to='/register'>Sign Up</Link> to add comments.</p> */}
                            {article.article && article.article.slug &&
                                <>
                                    <Comments slug={this.props.article.article && this.props.article.article.slug} />
                                    <br />
                                    <CommentsList slug={this.props.article.article && this.props.article.article.slug} />
                                </>
                            }
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
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { getArticle, markFavourite, markUnFavourite, followAuthor, unFollowAuthor, deleteArticle })(Article);