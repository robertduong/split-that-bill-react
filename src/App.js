import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Container from './Container';
import MainMenu from './MainMenu';
import Host from './Host';
import Join from './Join';
import JoinMenu from './JoinMenu';
import SplitApi from './SplitApi';
import Login from './Login';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={browserHistory}> 
        <Route path="/" component={Container}>
          <IndexRoute firebase={this.props.fb} store={this.props.store} component={Login} />
          <Route firebase={this.props.fb} store={this.props.store} path="menu" store={this.props.store} component={MainMenu} />
          <Route firebase={this.props.fb} store={this.props.store} path="host/:action" component={Host} />

          <Route path="join" component={Container}>
            <IndexRoute component={MainMenu} />
            <Route path=":tabCode" store={this.props.store} firebase={this.props.fb} component={Join} />
          </Route>
        </Route>
      </Router>
    );
  }
}

export default App;
