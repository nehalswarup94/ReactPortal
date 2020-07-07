import React from 'react';
import { Link,Redirect } from 'react-router-dom';
import './ProfileSettings.scss';
import { loadUser,updateUser,logout } from '../../services/actions/Authentication/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ProfileSettings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            url: this.props.user && this.props.user.user ? this.props.user.user.image : '',
            username:  this.props.user && this.props.user.user ? this.props.user.user.username : '',
            bio:  this.props.user && this.props.user.user ? this.props.user.user.bio : '',
            email:  this.props.user && this.props.user.user ? this.props.user.user.email : '',
            password: ''
        }
    
    }
    
    async componentDidMount() {
        if ( this.props.user && this.props.user.user.username) {
            console.log(this.props.user);
            this.setState({
                url: this.props.user.user.image,
                username: this.props.user.user.username,
                bio: this.props.user.user.bio,
                email: this.props.user.user.email,
                password: ''
            })
        }
        else {
            console.log(this.props.user);
            await this.props.loadUser();
            this.props.user && this.setState({
                url: this.props.user.user.image,
                username: this.props.user.user.username,
                bio: this.props.user.user.bio,
                email: this.props.user.user.email,
                password: ''
            })
        }
    }

    // static getDerivedStateFromProps(props,state){
        
    // }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    updateSettings =(e) => {
        e.preventDefault();
        const user = {
            user : {
                url: this.state.url,
                username: this.state.username,
                bio: this.state.bio,
                email: this.state.email,
                password: this.state.password
            }
        }
        this.props.updateUser(user);

    }

    handleLogout = () => {
        this.props.logout();
    }
    render() {
        console.log(this.props.user);
        return (
            !this.props.isAuthenticated ? 
            <Redirect to='/login'/> : 
            <div className='profile-settings'>
                <form onSubmit={this.updateSettings}>
                    <input className='url' type='text' name='url' value={this.state.url} placeholder='URL of profile picture' onChange={this.handleChange} /><br /><br />
                    <input className='profile-username' type='text' name='username' value={this.state.username} placeholder='Username' onChange={this.handleChange} /><br /><br />
                    <textarea rows='10' cols='100' className='profile-bio' type='text' name='bio' value={this.state.bio} placeholder='Short bio about you' onChange={this.handleChange} required /><br /><br />
                    <input className='profile-email' type='text' name='email' value={this.state.email} placeholder='Email' onChange={this.handleChange} /><br /><br />
                    <input type='password' className='profile-pswd' name='password' value={this.state.password} placeholder='New Password' onChange={this.handleChange} /><br /><br />
                    <button className='btn update'>Update Settings</button><br/><br/>
                    <hr/>
                    <button className='btn logout' onClick={this.handleLogout}>Or Click Here to Logout</button>
                </form>
            </div>
        )
    }
}

ProfileSettings.propTypes = {
    user: PropTypes.object.isRequired,
    isAuthenticated:PropTypes.bool.isRequired,
    updateUser: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { loadUser,updateUser, logout })(ProfileSettings);