import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Container from './Container';
import MainMenu from './MainMenu';
import Host from './Host';
import Join from './Join';
import JoinMenu from './JoinMenu';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={browserHistory}> 
        <Route path="/" component={Container}>
          <IndexRoute component={MainMenu} />
          <Route firebase={this.props.fb} path="host/:action" component={Host}>
          </Route>
          <Route path="join" component={Container}>
            <IndexRoute component={MainMenu} />
            <Route path=":tabCode" firebase={this.props.fb} component={Join} />
            <Route path="option" component={JoinMenu}></Route>
          </Route>
        </Route>
      </Router>
    );
  }
}

export default App;
