import React from "react";
import * as mainActions from "../../actions/mainActions";
import {connect} from "react-redux";
import {
  Redirect
} from 'react-router-dom';
import image from "../../assets/img/bg7.jpg";
import Loading from "../../components/Loader/Loader";
import {bindActionCreators} from "redux";
import {Button, Input, InputGroup, InputGroupAddon} from "reactstrap";


class LoginPage extends React.Component {

  state = {
    cardAnimaton: "cardHidden",
    email: null,
    password: '',
    redirectToReferrer: false,
    loading: false
  };

  handleChangePassword = value => {
    this.setState({
      password: value
    })
  };
  handleChangeEmail = value => {
    this.setState({
      email: value
    })
  };

  authenticate(event) {
    event.preventDefault();
    this.setState({loading: true});
    let user = {email: this.state.email, password: this.state.password};
    if(user.email){
      this.props.loginUser({user}).then((response) => {
        if (response.type === "SUCCESS_LOGIN") {
          this.setState({loading: false, redirectToReferrer: true});
        }
        else {
          this.setState({loading: false, redirectToReferrer: false});
        }
      })
    }
    else {
      this.setState({loading: false, redirectToReferrer: false});
    }


  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.authenticate(e);
    }
  }

  render() {
    const {redirectToReferrer, loading} = this.state;
    if (redirectToReferrer) {
      return (
        <Redirect to='/'/>
      )
    }
    else {
      return (loading ? <Loading/> :
          <div
            style={{
              backgroundImage: "url(" + image + ")",
              backgroundSize: "cover",
              backgroundPosition: "top center",
              height: 'calc(100vh - 56px)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff'
            }}
          >
            <div onKeyPress={this.onKeyPress.bind(this)}>
              <form>
                <h2><b>Login</b></h2>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                  <Input placeholder="email" id="email" value={this.state.email ? this.state.email : ''}
                         onChange={(input) => this.handleChangeEmail(input.target.value)}/>
                </InputGroup>
                <br/>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">*</InputGroupAddon>
                  <Input placeholder="password" id="password" type="password" value={this.state.password}
                         onChange={(input) => this.handleChangePassword(input.target.value)}/>
                </InputGroup>
                <br/>
                <Button color="primary" size="lg" onClick={this.authenticate.bind(this)}>
                  Get started
                </Button>
              </form>
            </div>
          </div>

      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userLogdin: state.mainReducer.logdin,
    errorLogin: state.mainReducer.errorLogin,
  }
};

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(mainActions, dispatch)
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(LoginPage));
