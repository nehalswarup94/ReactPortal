import React from 'react';
import './createArticle.scss';
import {createArticle, editArticle} from '../../services/actions/Article/articleActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CreateArticle extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title: this.props.location.state ? this.props.location.state.title : '',
            description: this.props.location.state ? this.props.location.state.description : '',
            body:this.props.location.state? this.props.location.state.body :'',
            slug:this.props.location.state? this.props.location.state.slug :'',
            tagList:[]
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {title, description, body, tags} = this.state; 
        const newArticle = {
            article: {
            title,
            description,
            body,
            tags
            }
        };
        if(this.props.location.state){
            this.props.editArticle(this.state.slug,newArticle);
        this.props.history.push(`/article/${this.state.slug}`);
        }
        else{
            this.props.createArticle(newArticle);
       
            this.props.history.push('/article/default');
        }
    }

    render(){
        return(
            <div className='create-article'>
                <form onSubmit={this.onSubmit}>
                    <input className='article-title' type='text' name='title' value={this.state.title} placeholder='Title' onChange={this.handleChange} required/><br/><br/>
                    <input className='article-desc' type='text' name='description' value={this.state.description} placeholder='What is the article about' onChange={this.handleChange} required/><br/><br/>
                    <textarea rows='10' cols='100' className='article-body' type='text' name='body' value={this.state.body} placeholder='Write your article' onChange={this.handleChange} required/><br/><br/>
                    <input className='article-tags' type='text' name='tagList' value={this.state.tagList} placeholder='Enter Tags' onChange={this.handleChange}/><br/><br/>
                    <button className='btn publish-article' onSubmit={this.createArticle}>Publish Article</button>
                </form>
            </div>
        )
    }
}

CreateArticle.propTypes = {
    createArticle:PropTypes.func.isRequired,
    editArticle:PropTypes.func.isRequired
}

export default connect(null,{createArticle, editArticle})(CreateArticle);