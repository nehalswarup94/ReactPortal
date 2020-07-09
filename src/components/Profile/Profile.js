import React from 'react';
import { Link } from 'react-router-dom';
import {getProfile} from '../../services/actions/Profile/profileActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Profile.scss';

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            myFeed:true,
            profile: this.props.profile,
            param: this.props.match.params.username
        }
   }

    componentDidMount(){
        this.props.getProfile(this.props.match.params.username);
    }

    shouldComponentUpdate(){
        return true;
    }
    

    static getDerivedStateFromProps (props,state){
        console.log('in der props',props.match.params.username)
        if(props.match.params.username!== state.param || props.profile !== state.profile ){
            return{
                profile:props.profile,
                param:props.match.params.username
            }
        }
        return null;
    }

    
    render() {
        console.log(this.props.match.params.username);
        const {username,bio,image,following} = this.state.profile;
        const globalClass = this.state.myFeed ? 'links myFeed' : 'links';
        const localClass = !this.state.myFeed ? 'links favArticles' : 'links';
        return (
            <>
                <div className='profile-header'>
                    <img src="https://static.productionready.io/images/smiley-cyrus.jpg"
                    style={{ height: "5rem", width: "5rem", borderRadius: "5rem" }}></img>
                    <h3>{this.props.match.params.username}</h3>
                    <h6>{bio}</h6>
                </div>
                <br/>
                <div className='container'>
                    <ul className='custom-nav-links'>
                        <li className={localClass}>My articles</li>
                        <li className={globalClass}>Favourite Articles</li>
                    </ul>
                    <hr style={{margin:"0 0"}}/>
                </div>
            </>
        )
    }
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile.profile
});
export default connect(mapStateToProps,{getProfile})(Profile);