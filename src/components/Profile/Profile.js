import React from 'react';
import { Link } from 'react-router-dom';
import {getProfile, followAuthor, unFollowAuthor} from '../../services/actions/Profile/profileActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Profile.scss';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myFeed: true,
            profile: this.props.profile,
            param: this.props.match.params.username,
            followed: this.props.profile.following,
        }
    }

    componentDidMount() {
        this.props.getProfile(this.props.match.params.username);
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


    render() {
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
                    <h6>{this.props.profile.bio}</h6>
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
                        <li className={localClass}>My articles</li>
                        <li className={globalClass}>Favourite Articles</li>
                    </ul>
                    <hr style={{ margin: "0 0" }} />
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
    unFollowAuthor: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile.profile,
    user: state.auth.user
});
export default connect(mapStateToProps, { getProfile, followAuthor, unFollowAuthor })(Profile);