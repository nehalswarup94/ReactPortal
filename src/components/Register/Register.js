import React from 'react';
import './Register.scss';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    render() {
        return (
            <div className='register-div'>
                <h3 className='signup-title'>Sign Up</h3>
                <p><Link to='/login' className='redirect-link'>Have an account?</Link></p>
                <div className='signup-section'>
                    <form>
                        <input className='input-field' type="text" placeholder="Username" name='username' value='' required /><br/><br/>
                        <input className='input-field' type="text" placeholder="Email" name='email' value='' required /><br/><br/>
                        <input className='input-field' type="password" placeholder="Password" name='password' value='' required /><br/><br/>
                        <button className='btn btn-lg signup-btn'>Sign Up</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register;