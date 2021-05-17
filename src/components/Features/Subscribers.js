import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import classes from './Subscribers.module.css';
import Modal from '../UI/Modal';

const Subscribers = () => {
  const [storesList, setStoresList] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [errMessage, setErrorMessage] = useState(null);
  const ctxState = useContext(AuthContext);
  const id = ctxState.id;
  const token = ctxState.token;
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const closeModal = (txt) => {
    setModalMessage(txt);
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    const fetchStores = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://vapi.vetroms.co.za/api/loyalty/member/all/${id}?api_token=${token}`
      );

      if (!response.ok) {
        setIsLoading(false);
        throw Error('Something went wrong, please try again later');
      }

      const res = await response.json();
      // console.log(res.data)
      setIsLoading(false);
      setErrorMessage(false);
      setStoresList(res.data);
    };
    fetchStores().catch((err) => {
      setErrorMessage(err.message);
      // console.log(err.message)
    });
  }, [id, token]);
  // console.log(storesList);
  return (
    <>
      {showModal && (
        <Modal onClose={closeModal}>
          <div className={classes.modal}>
            <p>{modalMessage}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </Modal>
      )}
      <div className={classes.liststores}>
        {errMessage && <p>{errMessage}</p>}
        {!errMessage && (
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Cell Number</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!isloading &&
                storesList.map((member) => {
                  return (
                    <tr key={member.cell_number}>
                      <td>{member.first_name}</td>
                      <td>{member.last_name}</td>
                      <td>{member.cell_number}</td>
                      <td>{member.dob}</td>
                      <td>{member.gender}</td>
                      <td>{member.balance}</td>
                      <td>
                        <span
                          onClick={closeModal.bind(
                            null,
                            "You don't have enough points to deduct 1.00 crowns"
                          )}
                        >
                          Add point,
                        </span>
                        <br />
                        <span
                          onClick={closeModal.bind(
                            null,
                            'Your Transaction History is Empty'
                          )}
                        >
                          View history
                        </span>
                      </td>
                    </tr>

                    // Add some view code here
                  );
                })}
            </tbody>
          </table>
        )}
        {!errMessage && isloading && <p>Loading...</p>}
      </div>
    </>
  );
};

export default Subscribers;
