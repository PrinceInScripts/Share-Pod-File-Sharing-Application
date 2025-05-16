import React from "react";

const UserProfile = () => {
  const user = {
    name: "Prince Kumar",
    email: "prince@example.com",
    role: "Admin",
    joined: "Jan 2024",
    avatar: "https://i.pravatar.cc/100"
  };

  return (
    <div className="p-6 bg-white shadow rounded-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Profile</h2>

      <div className="flex items-center space-x-6">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full shadow"
        />
        <div>
          <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500">Role: {user.role}</p>
          <p className="text-sm text-gray-500">Joined: {user.joined}</p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-medium text-gray-700 mb-2">Account Actions</h4>
        <div className="space-y-3">
          <button
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            onClick={() => alert("Logout clicked")}
          >
            Logout
          </button>
          <button
            className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
            onClick={() => confirm("Are you sure you want to delete your account?")}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
