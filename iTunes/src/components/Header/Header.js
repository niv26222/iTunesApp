import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="info" light expand="md">
          <NavbarBrand href="/">iTunes</NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.props.email ?
                <NavItem style={{display: "flex"}}>
                  <NavLink href="/admin/">
                    Admin panel
                  </NavLink>

                  <NavLink>
                    Welcome {this.props.email}
                  </NavLink>
                </NavItem> : <NavItem style={{display: "flex"}}>
                <NavLink href="/login/">Login</NavLink>
                <NavLink href="/registration/">Sing Up</NavLink>

              </NavItem>
              }

            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}