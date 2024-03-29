import React, { useState } from 'react';
import axios from 'axios';

function NewReminderForm({ onNewReminder, onClose }) {
  const [formData, setFormData] = useState({
    event_title: '',
    event_description: '',
    event_date: '',
    event_time: '',
    event_category: '' 
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/reminders/', formData);
      onNewReminder(response.data); 
      setFormData({
        event_title: '',
        event_description: '',
        event_date: '',
        event_time: '',
        event_category: 'Work' 
      });
      window.alert('New Reminder successfully added.');
    } catch (error) {
      console.error('Error adding new reminder:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '5px', marginLeft:'30px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '60%' }}>
      <h2 style={{ marginBottom: '20px' }}>New Reminder</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridGap: '10px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '10px' }}>
          <label style={{ width: '100px' }}>Title:</label>
          <input type="text" name="event_title" value={formData.event_title} onChange={handleInputChange} style={{ width: 'calc(100% - 100px)', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '10px' }}>
          <label style={{ width: '100px' }}>Description:</label>
          <textarea name="event_description" value={formData.event_description} onChange={handleInputChange} style={{ width: 'calc(100% - 100px)', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '10px' }}>
          <label style={{ width: '100px' }}>Date:</label>
          <input type="date" name="event_date" value={formData.event_date} onChange={handleInputChange} style={{ width: 'calc(100% - 100px)', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '10px' }}>
          <label style={{ width: '100px' }}>Time:</label>
          <input type="time" name="event_time" value={formData.event_time} onChange={handleInputChange} style={{ width: 'calc(100% - 100px)', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '10px' }}>
          <label style={{ width: '100px' }}>Category:</label>
          <select name="event_category" value={formData.event_category} onChange={handleInputChange} style={{ width: 'calc(100% - 100px)', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Health">Health</option>
          </select>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer' }}>Add Reminder</button>
          <button type="button" onClick={() => setFormData({ event_title: '', event_description: '', event_date: '', event_time: '', event_category: 'Work' })} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#f44336', color: '#fff', border: 'none', cursor: 'pointer' }}>Clear</button>
          <button type="button" onClick={onClose} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#f44336', color: '#fff', border: 'none', cursor: 'pointer' }}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default NewReminderForm;
