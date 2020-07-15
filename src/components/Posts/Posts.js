import React from 'react';
import './Posts.scss';
import ArticleCard from '../ArticleCard/ArticleCard.js';
import Tags from '../Tags/Tags';
import {Link} from 'react-router-dom';
import {listArticles, markFavourite, markUnFavourite, listMyArticles, listArticlesByTags} from '../../services/actions/Article/articleActions';
import {unSetTag} from '../../services/actions/Tags/tagActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Pagination from "react-js-pagination";

class Posts extends React.Component {
    state={
        global:true,
        loading:true,
        activePage: 1
    }
    componentDidMount(){
        this.props.listArticles(0);
        this.setState({
            loading:false
        });
    }

    fetchArticles = (activeLink,e) => {
        this.setState({
            loading:true,
            activePage:1
        });
        if(activeLink === 'global'){
            this.setState({
                global:true
            });
            this.props.listArticles(0);
        }
        else{
            this.setState({
                loading:true
            });
            this.props.listMyArticles(0);
            this.setState({
                global:false
            });
        }
        this.props.unSetTag();
        this.setState({
            loading:false
        });
    }

    changeFav = (slug,status,e) => {
        if(status === 'mark_fav')
            this.props.markFavourite(slug); 
        else{
            this.props.markUnFavourite(slug)
        }     
    }

    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
        let offset = (10*pageNumber)-10;
        if(this.state.global === true && this.props.tag===''){
            this.props.listArticles(offset);
        }
        else if(this.state.global === false && this.props.tag===''){
            this.props.listMyArticles(offset);
        }
        else if(this.props.tag!==''){
            this.props.listArticlesByTags(this.props.tag,offset);
        }
      }

    render() {
        const {articles} = this.props;
        let articlesList = articles && articles.map((article,index)=>{
            return <ArticleCard key = {index} article={article} changeFav={this.changeFav} isAuthenticated = {this.props.isAuthenticated}/>
        });
        const globalClass = this.state.global && this.props.tag==='' ? 'links globalClass' : 'links';
        const localClass = !this.state.global && this.props.tag===''? 'links localClass' : 'links';
        const tagClass = this.props.tag!=='' ? 'links tagClass' : 'links';
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
                                {this.props.isAuthenticated===true && 
                                <li className={localClass} onClick={this.fetchArticles.bind(this,'myFeed')}>Your Feed</li>}
                                <li className={globalClass} onClick={this.fetchArticles.bind(this,'global')}>Global Feed</li>
                                {this.props.tag!=='' && 
                                <li className={tagClass}>{this.props.tag}</li>}
                            </ul>
                            <hr style={{marginTop:"-1px"}}></hr>
                            {this.state.loading? 'Loading...':
                            articlesList}
                        </div>
                        <div className='col-xs-12 col-sm-2'>
                            <Tags activePage={this.state.activePage}/>
                    </div>
                    </div>

                    <br/>
                    {/* Pagination */}
                    {!this.state.loading && 
                    <div className='pagination-div'>
                        <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={10}
                        totalItemsCount={this.props.articlesCount}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)}
                        itemClass="page-item"
                        linkClass="page-link"
                        />
                    </div>}
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
    markUnFavourite: PropTypes.func.isRequired,
    unSetTag: PropTypes.func.isRequired,
    listArticlesByTags: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    articles:state.article.articles,
    articlesCount: state.article.articlesCount,
    isAuthenticated: state.auth.isAuthenticated,
    tag: state.tag.tag
});
export default connect(mapStateToProps,{listArticles, listMyArticles ,markFavourite, listArticlesByTags,markUnFavourite, unSetTag})(Posts);