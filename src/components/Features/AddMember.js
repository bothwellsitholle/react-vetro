import React, { useRef, useState, useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import classes from './AddMember.module.css';

const AddMember = () => {
  const [isLoading, setIsLoadding] = useState(false);
  const [message, setMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const name = useRef();
  const surname = useRef();
  const cellNumber = useRef();
  const dob = useRef();
  const gender = useRef();
  const code = useRef();

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
    const enteredSurname = surname.current.value;
    const enteredDob = dob.current.value;
    const enteredGender = gender.current.value;
    const enteredCellNumber = cellNumber.current.value;
    const enteredCode = code.current.value;

    const enteredNameValidity = validator(enteredName);
    const enteredSurnameValidity = validator(enteredSurname);
    const enteredDOBValidity = validator(enteredDob);
    const enteredCodeValidity = validator(enteredDob);
    const enteredGenderValidity = validator(enteredGender);
    const enteredCellNumberValidity = validator(enteredCellNumber);

    console.log(enteredDob);

    if (
      enteredNameValidity &&
      enteredSurnameValidity &&
      enteredDOBValidity &&
      enteredGenderValidity &&
      enteredCellNumberValidity &&
      enteredCodeValidity
    ) {
      // send data
      setMessage(null);
      setSuccessMessage(null);
      setIsLoadding(true);

      console.log('sending data');

      try {
        const response = await fetch(
          `https://vapi.vetroms.co.za/api/loyalty/member/store?api_token=${token}`,
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              first_name: enteredName,
              last_name: enteredSurname,
              cell_number: enteredCellNumber,
              store_code: enteredCode,
              dob: enteredDob,
              gender: enteredGender,
            }),
          }
        );

        if (!response.ok) {
          setIsLoadding(false);
          console.log(response);
          let message = 'Something went wrong, Store could not be created!';
          console.log(response.headers);
          if (response.status === 422) {
            message = 'Cell number exist, try a different number';
          }
          throw new Error(message);
        }
        const res = response.json();
        console.log(res);
        setIsLoadding(false);
        setSuccessMessage('Request was successful');

        name.current.value = null;
        surname.current.value = null;
        dob.current.value = null;
        gender.current.value = null;
        cellNumber.current.value = null;
        code.current.value = null;
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
        <h2>Add Loyalty Member</h2>
        {message && <p style={{ textAlign: 'center' }}>{message}</p>}
        {successMessage && (
          <p style={{ color: 'green', textAlign: 'center' }}>
            {successMessage}
          </p>
        )}
      </div>
      <form onSubmit={submitHander} className={classes.form__Store__control}>
        <div className={classes.form__store__inputs}>
          <label htmlFor='first_name'>First Name</label>
          <input ref={name} type='text' id='storeName' />
        </div>
        <div className={classes.form__store__inputs}>
          <label htmlFor='last_name'>Last Name</label>
          <input ref={surname} type='text' id='address' />
        </div>
        <div className={classes.form__store__inputs}>
          <label htmlFor='storeAddress'>Cell Number</label>
          <input
            ref={cellNumber}
            type='text'
            id='code'
            required
            minLength={10}
          />
        </div>
        <div className={classes.form__store__inputs}>
          <label htmlFor='storeAddress'>Store Code</label>
          <input ref={code} type='text' id='code' />
        </div>
        <div className={classes.form__store__inputs}>
          <label htmlFor='storeAddress'>Date of Birth</label>
          <input ref={dob} type='date' id='code' />
        </div>
        <div className={classes.form__gender}>
          <label style={{ margin: 10 }} htmlFor='storeAddress'>
            Male
          </label>
          <input
            ref={gender}
            type='radio'
            id='female'
            name='gender'
            value='female'
          />
          <label style={{ margin: 10 }} htmlFor='storeAddress'>
            Female
          </label>
          <input
            ref={gender}
            type='radio'
            id='female'
            name='gender'
            value='female'
          />
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

export default AddMember;
