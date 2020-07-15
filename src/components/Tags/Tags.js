import React from 'react';
import {getTags, setTag} from '../../services/actions/Tags/tagActions';
import {listArticlesByTags} from '../../services/actions/Article/articleActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import './Tags.scss';


class Tags extends React.Component{
    componentDidMount(){
        this.props.getTags();
    }

    setTag = (tag,e) => {
        let offset = (10*this.props.activePage)-10;
        this.props.listArticlesByTags(tag,offset);
        this.props.setTag(tag);
    }
    render(){
        let {tags} = this.props.tags;
        const tagButtons = tags && tags.map((tag,index)=>{
            return <div key={index} className='tag' onClick={this.setTag.bind(this,tag)}>{tag}</div>   
        })
        return(
            <div className='tags-div'>
                <div><h5>Popular Tags</h5><br/></div>
                <div style={{display:"flex",flexWrap:"wrap"}}>
                {tagButtons}  
                </div>
                
            </div>
        )
    }
}

Tags.propTypes = {
    tags: PropTypes.array.isRequired,
    getTags: PropTypes.func.isRequired,
    setTag: PropTypes.func.isRequired,
    listArticlesByTags: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    tags: state.tag.tags
})

export default connect(mapStateToProps,{getTags, setTag, listArticlesByTags})(Tags);