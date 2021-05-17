import React, { useRef, useState, useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import classes from './AddMember.module.css';

const AddStore = () => {
  const [isLoading, setIsLoadding] = useState(false);
  const [message, setMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const name = useRef();
  const storeAddress = useRef();
  const storeCode = useRef();

  const ctxState = useContext(AuthContext);
  const token = ctxState.token;

  const validator = (text) => {
    if (text.trim().length === 0) {
      return false;
    } else {
      return true;
    }
  };

  const submitHander = async (evt) => {
    evt.preventDefault();

    //Validation
    const enteredName = name.current.value;
    const enteredCode = storeCode.current.value;
    const enteredAddress = storeAddress.current.value;

    const enteredNameValidity = validator(enteredName);
    const enteredCodeValidity = validator(enteredCode);
    const enteredAddressValidity = validator(enteredAddress);

    if (enteredNameValidity && enteredCodeValidity && enteredAddressValidity) {
      // send data
      setMessage(null);
      setSuccessMessage(null);
      setIsLoadding(true);

      console.log('sending data');

      try {
        const response = await fetch(
          `https://vapi.vetroms.co.za/api/store?api_token=${token}`,
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              name: enteredName,
              code: enteredCode,
              address: enteredAddress,
            }),
          }
        );

        if (!response.ok) {
          setIsLoadding(false);
          console.log(response);
          let message = 'Something went wrong, Store could not be created!';
          console.log(response.headers);
          if (response.status === 422) {
            message =
              'Store code already taken, Please choose another store code';
          }
          throw new Error(message);
        }
        const res = response.json();
        console.log(res);
        setIsLoadding(false);
        setSuccessMessage('Store Successfully Saved');

        name.current.value = null;
        storeCode.current.value = null;
        storeAddress.current.value = null;
      } catch (err) {
        setMessage(err.message);
      }
    } else {
      setMessage('Please fill in all the fields');
    }
  };
  return (
    <div className={classes.form__store__container}>
      <div className={classes.heading}>
        <h2>Create a store</h2>
        {message && <p style={{ textAlign: 'center' }}>{message}</p>}
        {successMessage && (
          <p style={{ color: 'green', textAlign: 'center' }}>
            {successMessage}
          </p>
        )}
      </div>
      <form onSubmit={submitHander} className={classes.form__Store__control}>
        <div className={classes.form__store__inputs}>
          <label htmlFor='name'>Store Name</label>
          <input ref={name} type='text' id='storeName' />
        </div>
        <div className={classes.form__store__inputs}>
          <label htmlFor='storeAddress'>Address</label>
          <input ref={storeAddress} type='text' id='address' />
        </div>
        <div className={classes.form__store__inputs}>
          <label htmlFor='storeAddress'>Store Code</label>
          <input ref={storeCode} type='text' id='code' />
        </div>
        <div className={classes.form__store__actions}>
          {isLoading ? (
            <h4>Loading...</h4>
          ) : (
            <button type='submit'>Submit</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddStore;
