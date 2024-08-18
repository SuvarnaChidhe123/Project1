import React, { useState } from 'react';
import UserForm from './UserForm';

const UserUpdatePage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(null);

  const handleUpdate = (updatedUser) => {
    fetch(`http://localhost:3000/api/users/${updatedUser.email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setIsFormOpen(false); // Close form on success
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const openForm = (user) => {
    setUserToUpdate(user);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div>
      <button onClick={() => openForm({
        name: 'Olivia Rhye',
        role: 'Product Designer',
        email: 'olivia@untitledui.com',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        status: 'Active',
        teams: ['Design', 'Product', 'Marketing'],
      })}>
        Edit User
      </button>

      {isFormOpen && (
        <UserForm
          onSubmit={handleUpdate}
          onCancel={closeForm}
          initialData={userToUpdate}
        />
      )}
    </div>
  );
};

export default UserUpdatePage;
