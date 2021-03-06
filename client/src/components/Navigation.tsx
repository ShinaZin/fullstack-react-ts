import * as React from 'react';
import {Navbar, Nav, NavItem, Glyphicon, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {logOut} from '../actions/userActions';
import {RouteComponentProps} from 'react-router';

interface NavigationProps extends RouteComponentProps<any>, React.Props<any> {
  logOut: () => any;
  history: any;
  user: any;
}

interface NavigationState {}

export class Navigation extends React.Component<NavigationProps, NavigationState> {
  constructor(props: NavigationProps) {
    super(props);
  }
  async onLogOut() {
    await this.props.logOut();

    this.props.history.push('/login');
  }

  render() {
    let user = this.props.user;

    let userFullName = '';

    if (user && user.profile && user.profile.local) {
      let local = user.profile.local;

      userFullName = `${local.firstName} ${local.lastName}`;
    }

    return (
      <Navbar collapseOnSelect fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Button bsStyle="link">Expense Manager</Button>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav>
            <LinkContainer key={1} to={'/records'}>
              <NavItem>Records</NavItem>
            </LinkContainer>

            <LinkContainer key={2} to={'/categories'}>
              <NavItem>Categories</NavItem>
            </LinkContainer>
          </Nav>

          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              Logged as: <b>{userFullName}</b>
            </NavItem>

            <NavItem eventKey={2} onClick={() => this.onLogOut()}>
              LogOut <Glyphicon glyph="log-out" />
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.current
});

const mapDispatchToProps = dispatch => bindActionCreators({logOut}, dispatch);
const component = connect(mapStateToProps, mapDispatchToProps)(Navigation);
export default withRouter(component);
