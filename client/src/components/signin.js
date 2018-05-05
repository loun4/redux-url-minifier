
import React from 'react';
import PropTypes from 'prop-types';
import { Control, Form, Errors } from 'react-redux-form';
import classNames from 'classnames';
import { isNotEmptyString } from '../utils/validator';

const signinForm = ({ onSubmit, form: { login, password } }) => {
  const isLoginInvalid = login.touched && !login.valid;
  const isPasswordInvalid = password.touched && !password.valid;
  const isFormInvalid = isLoginInvalid || isPasswordInvalid;

  return (
    <div className="signin">
      <div className="wide column">
        <h2 className="ui teal image header">
          <div className="content">Log-in</div>
        </h2>
        <Form model="signinForm"className="ui large form" onSubmit={onSubmit}>
          <div className="ui stacked segment">
            <div className={classNames('field', { error: isLoginInvalid })}>
              <div className="ui left icon input">
                <i className="user icon" />
                <Control.text
                  model=".login"
                  className="field-input"
                  id="login"
                  placeholder="Login"
                  validators={{ isNotEmptyString }}
                />
              </div>
            </div>
            <div className={classNames('field', { error: isPasswordInvalid })}>
              <div className="ui left icon input">
                <i className="lock icon" />
                <Control.text
                  model=".password"
                  type="password"
                  className="field-input"
                  id="password"
                  placeholder="Password"
                  validators={{ isNotEmptyString }}
                />
              </div>
            </div>
            <button className="ui fluid large teal submit button" type="submit">Login</button>
          </div>

          <div className={classNames({ 'ui negative message': isFormInvalid })}>
            <ul className="list">
              {['login', 'password'].map(field => (
                <Errors
                  key={field}
                  id={`error-${field}`}
                  model={`signinForm.${field}`}
                  show="touched"
                  wrapper="li"
                  messages={{
                    isNotEmptyString: `${field} is required`,
                  }}
                />))}
            </ul>
          </div>

          <Errors
            className="ui negative message"
            model="signinForm"
            show="submitFailed"
            component={() => <span>Connexion refused, please check your credentials</span>}
          />
        </Form>
      </div>
    </div>
  );
};

signinForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.shape({}).isRequired,
};


export default signinForm;

