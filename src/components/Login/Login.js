import React from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';

class Login extends React.Component{
    render(){
        return(
            <div className='login-div'>
                <h3 className='signin-title'>Sign In</h3>
                <p><Link to='/register' className='redirect-link'>Need an account?</Link></p>
                <div className='signin-section'>
                    <form>
                        <input className='input-field' type="text" placeholder="Email" name='email' value='' required /><br/><br/>
                        <input className='input-field' type="password" placeholder="Password" name='password' value='' required /><br/><br/>
                        <button className='btn btn-lg signin-btn'>Sign In</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;