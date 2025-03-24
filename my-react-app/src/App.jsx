import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddressForm from './AddressForm';

const App = () => {
  const [message, setMessage] = useState('');

const App = () => {
  return (
    <div>
      <h1>Address Book</h1>
      <AddressForm />
    </div>
  );
};


  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Backend Response:</h1>
      <p>{message}</p>
    </div>
  );
};

export default App;
