import React, { useState } from 'react';
import axios from 'axios';

function EditReminder({ reminder, onUpdateSuccess, onUpdateReminder,onClose }) {
  const [updatedReminder, setUpdatedReminder] = useState(reminder);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedReminder({ ...updatedReminder, [name]: value });
  };

  const handleUpdate = async () => {
    try {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const config = {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            };

            await axios.put(`http://localhost:8000/reminders/${reminder.id}/`, updatedReminder, config);

            onUpdateSuccess();

            onUpdateReminder(updatedReminder);

            window.alert('Reminder successfully updated.');

            onClose();
        }
    } catch (error) {

        console.error('Update error:', error);
    }
};

  

  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '%30'}}>
      <h2 style={{ marginBottom: '20px' }}>Edit Reminder</h2>
      <form style={{ display: 'grid', gridGap: '10px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '10px' }}>
            <label style={{ width: '100px' }}>Title:</label>
            <input type="text" name="event_title" value={updatedReminder.event_title} onChange={handleInputChange} style={{ width: 'calc(100% - 100px)', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '10px' }}>
            <label style={{ width: '100px' }}>Description:</label>
            <textarea name="event_description" value={updatedReminder.event_description} onChange={handleInputChange} style={{ width: 'calc(100% - 100px)', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '10px' }}>
            <label style={{ width: '100px' }}>Date:</label>
            <input type="date" name="event_date" value={updatedReminder.event_date} onChange={handleInputChange} style={{ width: 'calc(100% - 100px)', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '10px' }}>
            <label style={{ width: '100px' }}>Time:</label>
            <input type="time" name="event_time" value={updatedReminder.event_time} onChange={handleInputChange} style={{ width: 'calc(100% - 100px)', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '10px' }}>
            <label style={{ width: '100px' }}>Category:</label>
            <select name="event_category" value={updatedReminder.event_category} onChange={handleInputChange} style={{ width: 'calc(100% - 100px)', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Health">Health</option>
            </select>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="button" onClick={handleUpdate} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer' }}>Submit</button>
            <button type="button" onClick={onClose} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#f44336', color: '#fff', border: 'none', cursor: 'pointer' }}>Cancel</button>
        </div>
        </form>



    </div>
  );
}

export default EditReminder;
