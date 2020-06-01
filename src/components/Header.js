import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

class Header extends React.Component {
  isTabActive(path) {
    return this.props.location.pathname === path ? 'active' : '';
  }

  render() {
    return (
      <header>
        <Navbar collapseOnSelect expand="lg" variant="light">
          <Navbar.Brand>CarCare</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Link className={this.isTabActive('/') + ' nav-link'} to="/">
                Dashboard
              </Link>
              <Link
                className={this.isTabActive('/cases') + ' nav-link'}
                to="/cases"
              >
                Cases
              </Link>
              <Link
                className={this.isTabActive('/police') + ' nav-link'}
                to="/police"
              >
                Officers
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

export default withRouter(Header);
