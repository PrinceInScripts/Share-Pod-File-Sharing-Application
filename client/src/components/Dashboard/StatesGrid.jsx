import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/slice/auth/authThunk";

const StatsGrid = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (user && user._id && !hasFetched.current) {
      dispatch(getUser(user._id));
      hasFetched.current = true;
    }
  }, [user, dispatch]);

  const cards = [
    {
      title: "Total Uploads",
      value: user?.totalUploads ?? 0,
    },
    {
      title: "Total Downloads",
      value: user?.totalDownloads ?? 0,
    },
    {
      title: "Videos Uploaded",
      value: user?.videoCount ?? 0,
    },
    {
      title: "Images Uploaded",
      value: user?.imageCount ?? 0,
    },
    {
      title: "Documents Uploaded",
      value: user?.documentCount ?? 0,
    },
    {
      title: "Last Login",
      value: new Date(user?.lastLogin).toLocaleString() ?? "N/A",
    },
  ].filter((card) => card.value !== undefined); // Remove invalid cards if any

  return (
    <div className="mt-6">
      {/* Profile Header */}
      <div className="flex items-center mb-6 gap-4">
        <img
          src={user?.profilePic}
          alt="Profile"
          className="w-16 h-16 rounded-full border"
        />
        <div>
          <h2 className="text-xl font-semibold">{user?.fullname}</h2>
          <p className="text-gray-500">{user?.email}</p>
          <p className="text-sm text-gray-400">@{user?.username}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`}>
        {cards.map((card, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="text-gray-500">{card.title}</h4>
            <p className="text-2xl font-bold mt-1">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsGrid;
