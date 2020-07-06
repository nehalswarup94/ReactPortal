import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
    render() {
        const { isAuthenticated, loading } = this.props.auth;
        const guestLinks = <div className='portal-header'>
                                <div className='portal-link'>Portal</div>
                                <div className='options'>
                                    <Link to="/" className='option-links'>Posts</Link>
                                    <Link to="/login" className='option-links'>SignIn</Link>
                                    <Link to="/register" className='option-links'>SignUp</Link>
                                </div>
                            </div>
        const authLinks = <div className='portal-header'>
                            <div className='portal-link'>Portal</div>
                            <div className='options'>
                                <Link to="/" className='option-links'>Home</Link>
                                <Link to="/createarticle" className='option-links'>New Article</Link>
                                <Link to="/profilesettings" className='option-links'>Settings</Link>
                                <Link to="/profile" className='option-links'>Name</Link>
                            </div>
                        </div>
        return (
            // !loading &&
             (!isAuthenticated?guestLinks:authLinks)
        )
    }
}

Header.propsTypes = {
    auth: PropTypes.object
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, null)(Header);