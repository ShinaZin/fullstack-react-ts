import '../styles/App.css';

import PropTypes from 'prop-types';
import * as React from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {Route, Switch, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';

interface AppProps extends RouteComponentProps<any>, React.Props<any> {
  isAjaxLoad: boolean;
  routes: any[];
}

interface AppState {
  isAjaxLoad: boolean;
}

export class App extends React.Component<AppProps, AppState> {
  static propTypes = {
    routes: PropTypes.array.isRequired
  };

  constructor(props: AppProps) {
    super(props);

    this.state = {
      isAjaxLoad: props.isAjaxLoad
    };

    autoBind(this);
  }

  render() {
    return (
      <div>
        {this.props.isAjaxLoad && <div className="overlay-style" />}

        <Switch>
          {this.props.routes.map((route, index) => (
            <Route key={index} exact={route.exact} path={route.path} component={route.main} />
          ))};
        </Switch>

        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAjaxLoad: state.common.ajaxCallsInProgress
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const component = connect(mapStateToProps, mapDispatchToProps)(App);
export default withRouter(component);
