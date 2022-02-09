import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../actions';

const MINIMUM_LENGTH_PASSWORD = 6;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      EmailValid: false,
      SenhaValid: false,
      emailUser: '',
    };
  }

  handleChangeEmail = (event) => {
    const validaEmailRegex = /\S+@\S+\.\S+/;
    if (event.target.value.match(validaEmailRegex)) {
      this.setState({ EmailValid: true });
    } else {
      this.setState({ EmailValid: false });
    }
    this.setState({ emailUser: event.target.value });
  }

  handleChangePassword = (event) => {
    if (event.target.value.length >= MINIMUM_LENGTH_PASSWORD) {
      this.setState({ SenhaValid: true });
    } else {
      this.setState({ SenhaValid: false });
    }
  }

  handleButtonClick = () => {
    const { emailUser } = this.state;
    const { adicionaEmail, history } = this.props;
    adicionaEmail(emailUser);
    history.push('/carteira');
  }

  render() {
    const { SenhaValid, EmailValid } = this.state;
    const valido = SenhaValid && EmailValid;
    return (
      <div>
        <input
          data-testid="email-input"
          type="text"
          placeholder="Email"
          onChange={ this.handleChangeEmail }
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="Password"
          onChange={ this.handleChangePassword }
        />
        <button
          type="button"
          disabled={ !valido }
          onClick={ this.handleButtonClick }// colocar parametro
        >
          Entrar

        </button>
      </div>
    );
  }
}

Login.propTypes = {
  adicionaEmail: PropTypes.func,
  history: PropTypes.shape,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  adicionaEmail: (email) => dispatch(addEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
