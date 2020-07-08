import React from 'react';
import './Posts.scss';
import ArticleCard from '../ArticleCard/ArticleCard.js';
import Tags from '../Tags/Tags';
import {Link} from 'react-router-dom';
import {listArticles, markFavourite, markUnFavourite} from '../../services/actions/Article/articleActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

class Posts extends React.Component {
    state={
        global:true
    }
    componentDidMount(){
        this.props.listArticles();
    }

    fetchArticles = (activeLink,e) => {
        if(activeLink === 'global'){
            this.setState({
                global:true
            });
            this.props.listArticles();
        }
        else{
            this.setState({
                global:false
            });
        }
    }

    changeFav = (slug,status,e) => {
        if(status === 'mark_fav')
            this.props.markFavourite(slug); 
        else{
            this.props.markUnFavourite(slug)
        }     
    }

    render() {
        console.log(this.props.articles);
        const {articles} = this.props;
        let articlesList = articles && articles.map((article,index)=>{
            return <ArticleCard key = {index} article={article} changeFav={this.changeFav}/>
        });
        const globalClass = this.state.global ? 'links globalClass' : 'links';
        const localClass = !this.state.global ? 'links localClass' : 'links';
        return (
            <>
                <div className='post-heading-div'>
                    <h1 className='my-portal'>Knowledge Portal</h1>
                    <p className='headline'>A Place to share your knowledge</p>
                </div>

                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-10'>
                            <ul className='custom-nav-links'>
                                {this.props.isAuthenticated===true && <li className={localClass} onClick={this.fetchArticles.bind(this,'myFeed')}>Your Feed</li>}
                                <li className={globalClass} onClick={this.fetchArticles.bind(this,'global')}>Global Feed</li>
                            </ul>
                            <hr style={{marginTop:"-1px"}}></hr>
                            {this.state.global &&
                            articlesList}
                        </div>
                        <div className='col-xs-12 col-sm-2'>
                            <Tags/>
                    </div>
                    </div>
                </div>
            </>
        )
    }
}

Posts.propTypes = {
    listArticles: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    articles: PropTypes.array.isRequired,
    markFavourite: PropTypes.func.isRequired,
    markUnFavourite:  PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    articles:state.article.articles,
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps,{listArticles,markFavourite, markUnFavourite})(Posts);