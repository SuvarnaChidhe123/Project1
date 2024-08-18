import React, { useState } from 'react';

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Olivia Rhye',
    username: 'olivia',
    role: 'Product Designer',
    dateOfBirth: '2005-04-29',
    gender: 'Female',
    nationality: 'Canadian',
    contactNo: '1234567890',
    email: 'Oliviadesign@gmail.com',
    workEmail: 'Oliviadesign@gmail.com',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {/* Buttons to open the modal */}
      <div className="flex space-x-4 mb-4">
        <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded">
          Edit Profile
        </button>
        <button onClick={openModal} className="bg-green-500 text-white px-4 py-2 rounded">
          + Add New User
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="bg-[#385f96] text-white p-4 relative">
                <button type="button" onClick={closeModal} className="absolute top-2 right-2 text-xl">&times;</button>
                <div className="flex items-center">
                  <img src="/path-to-profile-image.jpg" alt="Profile" className="w-16 h-16 rounded-full mr-4" />
                  <div>
                    <h2 className="text-xl font-bold">{formData.name}</h2>
                    <p className="text-sm">@{formData.username} | {formData.role}</p>
                    <p className="text-sm">User ID | Role</p>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="p-4">
                <h3 className="text-lg font-semibold bg-blue-50 p-2 mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <InputField label="Date of Birth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                  <InputField label="Gender" name="gender" value={formData.gender} onChange={handleChange} />
                  <InputField label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} />
                  <InputField label="Contact no." name="contactNo" value={formData.contactNo} onChange={handleChange} />
                  <InputField label="E-mail Address" name="email" value={formData.email} onChange={handleChange} />
                  <InputField label="Work email Address" name="workEmail" value={formData.workEmail} onChange={handleChange} />
                </div>
              </div>

              {/* Research & Publication */}
              <div className="p-4">
                <h3 className="text-lg font-semibold bg-blue-50 p-2 mb-4 flex items-center">
                  Research & Publication
                  <span className="ml-2 w-2 h-2 bg-red-500 rounded-full"></span>
                </h3>
                <div className="mb-4">
                  <h4 className="font-semibold">AI and User Experience: The Future of Design</h4>
                  <p className="text-sm text-gray-600">Published in the Journal of Modern Design • 2022</p>
                  <p className="text-sm text-gray-600 mt-2">
                    AI, IoT based real time condition monitoring of Electrical Machines using Python
                    language Abstract: Maintaining induction motors in good working order before they
                    fail benefits small <span className="text-blue-600 cursor-pointer">See More...</span>
                  </p>
                </div>
                <button className="text-orange-600 font-semibold flex items-center">
                  <span className="mr-2">↗</span> SEE PUBLICATION
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InputField = ({ label, name, value, onChange }) => (
  <div className="flex justify-between items-center">
    <label htmlFor={name} className="text-sm text-gray-600">{label}</label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-1/2 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default UserProfile;