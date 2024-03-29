import React, { useState } from 'react';
import LoginForm from './components/Loginform';
import Reminders from './components/Reminders';
import ReminderDetail from './components/ReminderDetail';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedReminderId, setSelectedReminderId] = useState(null);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleReminderSelect = (id) => {
    setSelectedReminderId(id);
  };

  const handleBackToReminders = () => {
    setSelectedReminderId(null);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : selectedReminderId ? (
        <ReminderDetail reminderId={selectedReminderId} onBack={handleBackToReminders} />
      ) : (
        <Reminders onReminderSelect={handleReminderSelect} />
      )}
    </div>
  );
}

export default App;
