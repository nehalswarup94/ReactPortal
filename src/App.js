import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Posts from './components/Posts/Posts';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Article from './components/Article/Article';
import EditArticle from './components/Article/EditArticle';
import CreateArticle from './components/Article/CreateArticle';
import ProfileSettings from './components/Profile/ProfileSettings';
import Profile from './components/Profile/Profile';
//redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './services/actions/Authentication/auth';

import 'bootstrap/dist/css/bootstrap.min.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='portal-main'>
            <Header />
            <Route exact path='/' component={Posts} />
            <>
              <Switch>
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/article/:slug' component={Article} />
                <Route exact path='/createarticle' component={CreateArticle} />
                <Route exact path='/editarticle' component={EditArticle} />
                <Route exact path='/profilesettings' component={ProfileSettings} />
                <Route exact path='/profile/:username' component={Profile} />
              </Switch>
            </>
          </div>
        </Router>
      </Provider>
    )
  }
}
export default App;
