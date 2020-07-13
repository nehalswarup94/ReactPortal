import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../../store';
import { loadUser } from '../../services/actions/Authentication/auth';

class Header extends React.Component {
    
    render() {
        const { isAuthenticated, loading, user } = this.props.auth;
        const guestLinks = <div className='portal-header'>
                                <div className='portal-link'><Link to="/" className='main-link'>Portal</Link></div>
                                <div className='options'>
                                    <Link to="/" className='option-links'>Posts</Link>
                                    <Link to="/login" className='option-links'>SignIn</Link>
                                    <Link to="/register" className='option-links'>SignUp</Link>
                                </div>
                            </div>
        const authLinks = <div className='portal-header'>
                            <div className='portal-link'><Link to="/" className='main-link'>Portal</Link></div>
                            <div className='options'>
                                <Link to="/" className='option-links'>Home</Link>
                                <Link to="/createarticle" className='option-links'>
                                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;New Article</Link>
                                <Link to="/profilesettings" className='option-links'>
                                <i className="fa fa-cog" aria-hidden="true"></i>&nbsp;Settings</Link>
                                {user&&<Link to={`/profile/${user.user.username}`} className='option-links'>{user.user.username}</Link>}
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
    auth: state.auth,
    user: state.auth.user
});
export default connect(mapStateToProps, null)(Header);