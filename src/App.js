import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Container from './Container';
import MainMenu from './MainMenu';
import Host from './Host';
import Join from './Join';
import JoinMenu from './JoinMenu';


class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}> 
        <Route path="/" component={Container}>
          <IndexRoute component={MainMenu} />
          <Route path="host" component={Container}>
            <IndexRoute component={Host} />
          </Route>
          <Route path="join" component={Container}>
            <IndexRoute component={Join} />
            <Route path="option" component={JoinMenu}></Route>
          </Route>
        </Route>
      </Router>
    );
  }
}

export default App;
