import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.scss';

class Profile extends React.Component {
    state={
        myFeed:true
    }
    render() {
        const globalClass = this.state.myFeed ? 'links myFeed' : 'links';
        const localClass = !this.state.myFeed ? 'links favArticles' : 'links';
        return (
            <>
                <div className='profile-header'>
                    <img src="https://static.productionready.io/images/smiley-cyrus.jpg"
                        style={{ height: "5rem", width: "5rem", borderRadius: "5rem" }}></img>&nbsp;&nbsp;name
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

export default Profile;