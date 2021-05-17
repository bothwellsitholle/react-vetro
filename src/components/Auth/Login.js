import React, { useState, useRef, useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import classes from './Login.module.css';

const Login = () => {
  // const [isLogin, setIsLogin] = useState(true);
  const emailInput = useRef();
  const passwordInput = useRef();
  const [errMessage, setErrMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  let errtext;

  if (errMessage === 'Authentication Failed!') {
    errtext = 'Authentication Failed!';
  }

  if (errMessage === 'Login Email or Password is incorrect') {
    errtext = 'Login Email or Password is incorrect';
  }

  // const switchModeHandler = () => {
  //   setIsLogin((prevState) => !prevState);
  // };

  const submitHander = (evt) => {
    evt.preventDefault();
    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;

    // Add Validation here
    if (enteredPassword.trim().length < 6) {
      setErrMessage('WEAK_PASSWORD : Password should be at least 6 characters');
    }

    setIsLoading(true);

    let url = 'https://vapi.vetroms.co.za/api/auth/login';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          setErrMessage(null);
          return response.json();
        } else if (response.status === 401) {
          throw new Error('Login Email or Password is incorrect');
        } else {

          //EMAIL_EXISTS or WEAK_PASSWORD
          return response.json().then((data) => {
            let errorMessage = 'Authentication Failed!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
              throw new Error(errorMessage);
            }
          });
        }
      })
      .then((res) => {
        // console.log(res);
        // authCtx.login(res.idToken);
        authCtx.login(res.data.token, res.data.id);
        setErrMessage('');
      })
      .catch((err) => {
        setErrMessage(err.message);
        console.log(err.message);
      });
  };

  return (
    <div className={classes.form__container}>
      <div className={classes.heading}>
        <h2>Sign in</h2>
        {errMessage && errtext && <p>{errtext}</p>}
      </div>
      <form onSubmit={submitHander} className={classes.form__control}>
        <div className={classes.form__inputs}>
          <label htmlFor='email'>Email</label>
          <input ref={emailInput} type='email' id='email' required />
        </div>
        <div className={classes.form__inputs}>
          <label htmlFor='Password'>Password</label>
          <input ref={passwordInput} type='password' id='password' required />
        </div>
        <div className={classes.form__actions}>
          {isLoading ? (
            <h4>Please wait...</h4>
          ) : (
            <button type='submit'>Submit</button>
          )}
          {!isLoading && (
            <p>
             Only authorized members allowed
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
