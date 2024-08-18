import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import UserForm from './UserForm'; // Adjust the import path based on your project structure

const ITEMS_PER_PAGE = 6;

const PeopleDirectory = () => {
  const [usersList, setUsersList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoles, setSelectedRoles] = useState(new Set());
  const [selectedTeams, setSelectedTeams] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // For editing users
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch users from the API
    axios.get('http://localhost:3000/api/users')
      .then(response => {
        const sanitizedUsers = response.data.map(user => ({
          ...user,
          teams: Array.isArray(user.teams) ? user.teams : [], // Ensure teams is an array
        }));
        setUsersList(sanitizedUsers);
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  const roles = [...new Set(usersList.map(user => user.role))];
  const teams = [...new Set(usersList.flatMap(user => user.teams))];

  const handleDelete = (userEmail) => {
    axios.delete(`http://localhost:3000/api/users/${userEmail}`)
      .then(() => {
        setUsersList(prevUsers => prevUsers.filter(user => user.email !== userEmail));
      })
      .catch(error => {
        console.error("There was an error deleting the user!", error);
      });
  };

  const handleFormSubmit = (user) => {
    const request = editingUser
      ? axios.put(`http://localhost:3000/api/users/${user.email}`, user)
      : axios.post('http://localhost:3000/api/users', user);

    request
      .then(response => {
        setUsersList(prevUsers => {
          if (editingUser) {
            return prevUsers.map(u => u.email === user.email ? response.data : u);
          } else {
            return [...prevUsers, response.data];
          }
        });
        setShowForm(false);
        setEditingUser(null);
      })
      .catch(error => {
        console.error("There was an error saving the user!", error);
      });
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const toggleSelection = (setter, value, currentSelection) => {
    const newSelection = new Set(currentSelection);
    if (newSelection.has(value)) {
      newSelection.delete(value);
    } else {
      newSelection.add(value);
    }
    setter(newSelection);
  };

  const toggleSelectAll = (setter, items, currentSelection) => {
    const newSelection = new Set(currentSelection);
    if (items.every(item => newSelection.has(item))) {
      setter(new Set()); // Deselect all
    } else {
      setter(new Set(items)); // Select all
    }
  };

  const filteredUsers = usersList.filter(user =>
    (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedRoles.size === 0 || selectedRoles.has(user.role)) &&
    (selectedTeams.size === 0 || user.teams.some(team => selectedTeams.has(team)))
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="bg-gray-50 min-h-screen ml-48 mt-24">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-2 flex justify-between items-center border-b border-gray-200">
          <div className='flex'>
            <h2 className="text-xl font-semibold text-gray-800">Team members</h2>
            <button className="bg-purple-100 text-purple-800 text-sm font-medium px-4 py-2 rounded-full ml-3">{usersList.length} users</button>
          </div>
          <div className="flex items-center space-x-4 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 rounded-md px-6 py-2 text-sm pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg className="absolute inset-y-0 right-0 flex items-center pr-3 w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9c2.485 0 4.5 2.015 4.5 4.5S14.485 18 12 18a4.5 4.5 0 110-9zm0 0a7.5 7.5 0 100 15A7.5 7.5 0 1012 9z" />
              </svg>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-3 rounded-full bg-gray-100 text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16m-7 5h7m-14 0h7" />
              </svg>
            </button>
            <button
              onClick={() => {
                setEditingUser(null);
                setShowForm(!showForm);
              }}
              className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md"
            >
              {showForm ? 'Cancel' : '+'}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="absolute top-22 right-20 bg-white shadow-lg rounded-md border border-gray-200 p-6 z-10" style={{ width: '220px' }}>
            <div className="flex flex-col space-y-4">
              <div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={roles.length > 0 && roles.every(role => selectedRoles.has(role))}
                    onChange={() => toggleSelectAll(setSelectedRoles, roles, selectedRoles)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-3 text-sm font-semibold text-gray-800">Roles</span>
                </label>
                <div className="flex flex-col mt-3">
                  {roles.map(role => (
                    <label key={role} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedRoles.has(role)}
                        onChange={() => toggleSelection(setSelectedRoles, role, selectedRoles)}
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <span className="ml-3 text-sm">{role}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={teams.length > 0 && teams.every(team => selectedTeams.has(team))}
                    onChange={() => toggleSelectAll(setSelectedTeams, teams, selectedTeams)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-3 text-sm font-semibold text-gray-800">Teams</span>
                </label>
                <div className="flex flex-col mt-3">
                  {teams.map(team => (
                    <label key={team} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTeams.has(team)}
                        onChange={() => toggleSelection(setSelectedTeams, team, selectedTeams)}
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <span className="ml-3 text-sm">{team}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <table className="min-w-full divide-y divide-gray-200 mt-6" style={{ width: '100%' }}>
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teams
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedUsers.map((user) => (
              <tr key={user.email} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.teams.map((team, index) => {
                    const colors = ['purple', 'blue', 'green', 'gray']; // Array of colors
                    const colorIndex = index % colors.length; // Get color based on index

                    return (
                      <span
                        key={index}
                        className={`border border-${colors[colorIndex]} px-1 rounded-full p-1 m-1`} // Use string interpolation for class names
                      >
                        {team}
                      </span>
                    );
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button
                    onClick={() => {
                      setEditingUser(user);
                      setShowForm(true);
                    }}
                    className="text-gray-500 hover:text-blue-900"
                  >
                    <PencilAltIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.email)}
                    className="text-gray-500  hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-between">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-md text-gray-600 disabled:opacity-50 m-4"
          >
            Previous
          </button>
          
          <span className="px-4 py-2 text-gray-600 m-4">Page {currentPage} of {totalPages}</span>
          
          <button
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-md text-gray-600 disabled:opacity-50 m-4"
          >
            Next
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mt-6">
          <UserForm
            user={editingUser}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </div>
      )}
    </div>
  );
};

export default PeopleDirectory;