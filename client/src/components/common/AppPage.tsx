import * as React from 'react';
import * as _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import Helmet from 'react-helmet';

import Navigation from '../Navigation';
import * as userActions from '../../actions/userActions';

interface AppPageProps extends RouteComponentProps<any>, React.Props<any> {
  children: any;
  title: string;
  user: any;
  actions: any;
}

class AppPage extends React.Component<AppPageProps> {
  isAuthenticated() {
    return _.isEmpty(this.props.user) ? false : true;
  }

  componentWillMount() {
    if (!this.isAuthenticated()) {
      this.props.actions.getCurrentUser();
    }
  }

  getTitle() {
    return this.props.title ? `Expense Manager - ${this.props.title}` : 'Expense Manager';
  }

  render() {
    if (!this.isAuthenticated()) return null;

    let title = this.getTitle();

    return (
      <div>
        <Helmet title={title} />

        <Navigation />

        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.current
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions as any, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppPage));
