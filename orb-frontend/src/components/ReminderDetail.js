import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditReminder from './EditReminder';



function ReminderDetail({ reminderId, onBack, onDeleteSuccess }) {
    const [reminder, setReminder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletionSuccess, setDeletionSuccess] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);


    const updateReminderDetails = (updatedReminder) => {
        setReminder(updatedReminder);
    };


    useEffect(() => {
        const fetchReminder = async () => {
            try {
                const storedToken = localStorage.getItem('token');
                if (storedToken) {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${storedToken}`
                        }
                    };

                    const response = await axios.get(`http://localhost:8000/reminders/${reminderId}/?format=json`, config);
                    setReminder(response.data);
                }
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchReminder();
    }, [reminderId]);

    const handleEdit = () => {
        setShowEditModal(true);
    };

    const handleEditSuccess = () => {
        setShowEditModal(false);
    };

    const handleDelete = async () => {
        try {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    }
                };

                await axios.delete(`http://localhost:8000/reminders/${reminderId}/`, config);
                window.alert('Reminder deleted successfully.');
                setDeletionSuccess(true);
                onDeleteSuccess();
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };


    useEffect(() => {
        if (deletionSuccess) {
            onBack();
        }
    }, [deletionSuccess, onBack]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2 style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '10px' }}>Reminders</h2>
            <div style={{ margin: 50 }}>
                <button
                    onClick={onBack}
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
                    Back
                </button>

                <button
                    onClick={handleEdit}
                    style={{
                        backgroundColor: '#008CBA',
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
                    Edit
                </button>

                <button
                    onClick={handleDelete}
                    style={{
                        backgroundColor: '#f44336',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease',
                        outline: 'none',
                    }}
                >
                    Delete
                </button>

            </div>
            <div style={{ margin: 50 }}>
                {showEditModal && <EditReminder reminder={reminder} onUpdateSuccess={handleEditSuccess} onUpdateReminder={updateReminderDetails} onClose={() => setShowEditModal(false)} />}

            </div>


            <div style={{ margin: 50 }}>
                <p><strong>Title:</strong> {reminder.event_title}</p>
                <p><strong>Description:</strong> {reminder.event_description}</p>
                <p><strong>Date:</strong> {reminder.event_date}</p>
                <p><strong>Time:</strong> {reminder.event_time}</p>
                <p><strong>Category:</strong> {reminder.event_category}</p>
            </div>
        </div>
    );
}

export default ReminderDetail;
