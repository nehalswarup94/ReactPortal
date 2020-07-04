import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../services/actions/Authentication/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Login.scss';

class Login extends React.Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleLogin = () => {

        const user = {
            user:
            {
                email: this.state.email,
                password: this.state.password
            }
        }
        this.props.login(user);

    }

    render() {
        return (
            <div className='login-div'>
                <h3 className='signin-title'>Sign In</h3>
                <p><Link to='/register' className='redirect-link'>Need an account?</Link></p>
                <div className='signin-section'>
                    <input className='input-field' type="text" placeholder="Email" name='email' value={this.state.email} onChange={this.handleChange} required /><br /><br />
                    <input className='input-field' type="password" placeholder="Password" name='password' value={this.state.password} onChange={this.handleChange} required /><br /><br />
                    <button className='btn btn-lg signin-btn' onClick={this.handleLogin}>Sign In</button>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired
}

export default connect(null, { login })(Login);