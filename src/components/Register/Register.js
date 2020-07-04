import React from 'react';
import './Register.scss';
import { Link } from 'react-router-dom';
import { registerUser } from '../../services/actions/Authentication/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Register extends React.Component {
    state = {
        username: '',
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleRegister = () => {

        const user = {
            user:
            {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }
        }
        this.props.registerUser(user);
    }

    render() {
        return (
            <div className='register-div'>
                <h3 className='signup-title'>Sign Up</h3>
                <p><Link to='/login' className='redirect-link'>Have an account?</Link></p>
                <div className='signup-section'>
                    <input className='input-field' type="text" placeholder="Username" name='username' value={this.state.username} onChange={this.handleChange} required /><br /><br />
                    <input className='input-field' type="text" placeholder="Email" name='email' value={this.state.email} onChange={this.handleChange} required /><br /><br />
                    <input className='input-field' type="password" placeholder="Password" name='password' value={this.state.password} onChange={this.handleChange} required /><br /><br />
                    <button className='btn btn-lg signup-btn' onClick={this.handleRegister}>Sign Up</button>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired
}

export default connect(null, { registerUser })(Register);