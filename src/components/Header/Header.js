import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

class Header extends React.Component{
    render(){
        return(
            <div className='portal-header'>
                <div className='portal-link'>Portal</div>
                <div className='options'>
                    <Link to="/" className='option-links'>Posts</Link>
                    <Link to="/login" className='option-links'>SignIn</Link>
                    <Link to="/register" className='option-links'>SignUp</Link>
                </div>
            </div>
        )
    }
}

export default Header;