import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewReminderForm from './NewReminderForm';

function Reminders({ onReminderSelect }) {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNewReminderForm, setShowNewReminderForm] = useState(false);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const storedToken = localStorage.getItem('token');
  
        if (!storedToken) {
          throw new Error('Token not found.');
        }
  
        const config = {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        };
  
        const response = await axios.get('http://localhost:8000/reminders/', config);
        setReminders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reminders:', error.message);
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchReminders();
  }, []);

  const handleNewReminder = (newReminder) => {
    setReminders([...reminders, newReminder]); 
    setShowNewReminderForm(false); 
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '10px' }}>Reminders</h2>
      {showNewReminderForm && <NewReminderForm onNewReminder={handleNewReminder} onClose={() => setShowNewReminderForm(false)} />}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => setShowNewReminderForm(true)} 
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            marginRight: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease',
            outline: 'none',
          }}
        >
          New Reminder
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', padding: '20px', alignItems: 'start' }}>
        {reminders.map((reminder) => (
          <button
            key={reminder.id}
            style={{
              border: 'none',
              background: 'none',
              padding: 0,
              margin: 0,
              cursor: 'pointer',
              transition: 'box-shadow 0.3s ease',
              outline: 'none',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => { e.target.parentNode.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.2)'; }}
            onMouseLeave={(e) => { e.target.parentNode.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)'; }}
            onClick={() => onReminderSelect(reminder.id)}
          >
            <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', minHeight: '100px' }}>
              <p><strong>Title:</strong> {reminder.event_title}</p>
              <p><strong>Description:</strong> {reminder.event_description}</p>
              <p><strong>Date:</strong> {reminder.event_date}</p>
              <p><strong>Time:</strong> {reminder.event_time}</p>
              <p><strong>Category:</strong> {reminder.event_category}</p>
            </div>
          </button>
        ))}
      </div>
      
    </div>
  );
}

export default Reminders;
