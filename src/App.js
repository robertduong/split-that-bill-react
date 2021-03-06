import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Container from './Container';
import MainMenu from './MainMenu';
import Host from './Host';
import Join from './Join';
import JoinMenu from './JoinMenu';
import SplitApi from './SplitApi';


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
          </Route>
        </Route>
      </Router>
    );
  }
}

export default App;
