import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import classes from './StoresList.module.css';

const StoresList = () => {
  const [storesList, setStoresList] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [errMessage, setErrorMessage] = useState(null);
  const ctxState = useContext(AuthContext);
  const id = ctxState.id;
  const token = ctxState.token;

  useEffect(() => {
    const fetchStores = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://vapi.vetroms.co.za/api/store/all/${id}?api_token=${token}`
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
    <div className={classes.liststores}>
      {errMessage && <p>{errMessage}</p>}
      {!errMessage && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Store code</th>
            </tr>
          </thead>
          <tbody>
            {!isloading &&
              storesList.map((store) => {
                return (
                  <tr key={store.id}>
                    <td>{store.name}</td>
                    <td>{store.address}</td>
                    <td>{store.code}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
      {!errMessage && isloading && <p>Loading...</p>}
    </div>
  );
};

export default StoresList;
