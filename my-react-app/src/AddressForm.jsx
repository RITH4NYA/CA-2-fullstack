import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddressForm = () => {
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({ name: '', street: '', city: '', state: '', zip: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    const response = await axios.get('http://localhost:5000/addresses');
    setAddresses(response.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/addresses/${editingId}`, formData);
    } else {
      await axios.post('http://localhost:5000/addresses', formData);
    }
    setFormData({ name: '', street: '', city: '', state: '', zip: '' });
    setEditingId(null);
    fetchAddresses();
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingId(address._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/addresses/${id}`);
    fetchAddresses();
  };

  return (
    <div>
      <h2>Address Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
        <input type="text" name="zip" placeholder="Zip Code" value={formData.zip} onChange={handleChange} required />
        <button type="submit">{editingId ? 'Update' : 'Add'} Address</button>
      </form>

      <h2>Address List</h2>
      <ul>
        {addresses.map((address) => (
          <li key={address._id}>
            {address.name}, {address.street}, {address.city}, {address.state}, {address.zip}
            <button onClick={() => handleEdit(address)}>Edit</button>
            <button onClick={() => handleDelete(address._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressForm;
