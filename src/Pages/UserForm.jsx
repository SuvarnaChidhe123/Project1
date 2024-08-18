import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  email: z.string().email("Invalid email address"),
  avatar: z.string().optional(),
  status: z.string().optional(),
  teams: z.string().optional(), // Changed from array to string
});

const UserForm = ({ onSubmit, onCancel, initialData = {} }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      ...initialData,
      teams: initialData.teams ? initialData.teams.join(', ') : '', // Convert array to comma-separated string
    },
  });

  const onSubmitHandler = (data) => {
    // Convert comma-separated string back to array if needed by the onSubmit function
    data.teams = data.teams.split(',').map(team => team.trim()).filter(team => team);
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        {/* Header */}
        <div className="p-2 rounded-t-lg relative">
          <button onClick={onCancel} className="absolute top-2 right-3 text-xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit(onSubmitHandler)} className="p-4">
          {/* Personal Information */}
          <div className="mb-4">
            <h3 className='text-center mb-6'>Add User</h3>
            <h3 className="text-base font-semibold bg-blue-50 p-2 mb-3">Personal Information</h3>
            <div className="space-y-2">
              <InputField label="Name" name="name" register={register} errors={errors} />
              <InputField label="Role" name="role" register={register} errors={errors} />
              <InputField label="Email Address" name="email" register={register} errors={errors} />
              <InputField label="Avatar URL" name="avatar" register={register} errors={errors} />
              <InputField label="Status" name="status" register={register} errors={errors} />
              <InputField label="Teams" name="teams" register={register} errors={errors} />  {/* Normal text input for teams */}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, name, register, errors }) => (
  <div className="flex flex-col mb-2">
    <label htmlFor={name} className="text-sm text-gray-600">{label}</label>
    <input
      type="text"
      id={name}
      {...register(name)}
      className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
    {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>}
  </div>
);

export default UserForm;
