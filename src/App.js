import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Posts from './components/Posts/Posts';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Article from './components/Article/Article';
import EditArticle from './components/Article/EditArticle';
import CreateArticle from './components/Article/CreateArticle';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='portal-main'>
            <Header />
            <div>
              <Switch>
                <Route exact path='/' component={Posts} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/article/:name' component={Article} />
                <Route exact path='/create' component={CreateArticle} />
                <Route exact path='/edit' component={EditArticle} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}
export default App;
