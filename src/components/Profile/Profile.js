import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../ArticleCard/ArticleCard';
import {getProfile, followAuthor, unFollowAuthor} from '../../services/actions/Profile/profileActions';
import {listArticlesByAuthor, listFavoritedArticles, markFavourite, markUnFavourite} from '../../services/actions/Article/articleActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Profile.scss';
import Skeleton from 'react-loading-skeleton';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myFeed: true,
            profile: this.props.profile,
            param: this.props.match.params.username,
            followed: this.props.profile.following,
            loading:true
        }
    }

    componentDidMount() {
        this.setState({loading:true});
        this.props.listArticlesByAuthor(this.props.match.params.username);
        this.props.getProfile(this.props.match.params.username);
        this.setState({loading:false});
    }

    static getDerivedStateFromProps(props, state) {
        if (props.match.params.username !== state.param) {
            console.log(props.match.params.username);
            console.log(state.param);
            return {
                param: props.match.params.username
            }
        }
        return null;
    }

    shouldComponentUpdate() {
        return true
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.username !== prevProps.match.params.username) {
            this.props.getProfile(this.props.match.params.username);
            if(this.state.myFeed === true){
                this.props.listArticlesByAuthor(this.props.match.params.username);
            }
            else{
                this.props.listFavoritedArticles(this.props.match.params.username);
            }
            
        }
    }

    editProfile = () => {
        this.props.history.push('/profilesettings');
    }

    followProfile = () => {
        this.setState({
            followed:!this.state.followed
        });
        if(this.props.profile.following){
            this.props.unFollowAuthor(this.props.match.params.username)
        }
        else{
            this.props.followAuthor(this.props.match.params.username);
        }
    }

    handleClick = (status,e) => {
        this.setState({loading:true});
        if(status === 'myArticles'){
            this.setState({myFeed:true});
            this.props.listArticlesByAuthor(this.props.match.params.username);
        }
        else{
            this.setState({myFeed:false});
            this.props.listFavoritedArticles(this.props.match.params.username);
        }
        this.setState({loading:false});
    }

    changeFav = (slug,status,e) => {
        if(status === 'mark_fav')
            this.props.markFavourite(slug); 
        else{
            this.props.markUnFavourite(slug)
        }     
    }


    render() {
        const {articles} = this.props;
        let articlesList = articles && articles.map((article,index)=>{
            return <ArticleCard key = {index} article={article} changeFav={this.changeFav} isAuthenticated = {this.props.isAuthenticated}/>
        });
        const globalClass = this.state.myFeed ? 'links myFeed' : 'links';
        const localClass = !this.state.myFeed ? 'links favArticles' : 'links';
        const followUnfollow = this.state.followed ? 'Unfollow' : 'Follow';
        return (
            <>
                <div className='profile-header'>
                    <div className='profile-header-content'>
                    <img src="https://static.productionready.io/images/smiley-cyrus.jpg"
                        style={{ height: "5rem", width: "5rem", borderRadius: "5rem" }}></img>
                    <h3>{this.props.match.params.username}</h3>
                    <h6>{this.state.loading ? 'Loading..' : this.props.profile.bio}</h6>
                    </div>
                    <div className='button'>
                        <button className='btn btn-secondary' 
                        onClick={this.props.user && this.props.match.params.username === this.props.user.user.username ?
                        this.editProfile :
                        this.followProfile}>
                            {this.props.user && this.props.match.params.username === this.props.user.user.username ?
                            <><i className='fa fa-cog'></i>&nbsp;Edit Profile Settings</>
                            : 
                            <><i className='fa fa-plus'></i>&nbsp;{followUnfollow}</>}
                        </button>
                    </div>
                </div>
                <br />
                <div className='container'>
                    <ul className='custom-nav-links'>
                        <li className={globalClass} onClick={this.handleClick.bind(this,'myArticles')}>My articles</li>
                        <li className={localClass} onClick={this.handleClick.bind(this,'favArticles')}>Favourite Articles</li>
                    </ul>
                    <hr style={{marginTop:"-1px"}}></hr>
                    {this.state.loading ? <Skeleton count={5}/> :
                    articlesList}
                </div>
            </>
        )
    }
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    followAuthor:PropTypes.func.isRequired,
    unFollowAuthor: PropTypes.func.isRequired,
    listArticlesByAuthor: PropTypes.func.isRequired,
    markUnFavourite: PropTypes.func.isRequired,
    markFavourite: PropTypes.func.isRequired,
    listFavoritedArticles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile.profile,
    user: state.auth.user,
    articles: state.article.articles,
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { getProfile, followAuthor, unFollowAuthor,listArticlesByAuthor, listFavoritedArticles, markFavourite, markUnFavourite })(Profile);