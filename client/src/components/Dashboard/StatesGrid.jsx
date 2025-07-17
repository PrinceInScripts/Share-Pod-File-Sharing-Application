import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/slice/auth/authThunk";
import WelcomeSection from "./WelcomeSection";

const StatsGrid = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (user && user.id && !hasFetched.current) {
      dispatch(getUser(user.id));
      hasFetched.current = true;
    }
  }, [user, dispatch]);

  const cards = [
    {
      title: "Total Uploads",
      value: user?.totalUploads ?? 0,
      icon: "📤",
    },
    {
      title: "Total Downloads",
      value: user?.totalDownloads ?? 0,
      icon: "📥",
    },
    {
      title: "Videos Uploaded",
      value: user?.videoCount ?? 0,
      icon: "🎬",
    },
    {
      title: "Images Uploaded",
      value: user?.imageCount ?? 0,
      icon: "🖼️",
    },
    {
      title: "Documents Uploaded",
      value: user?.documentCount ?? 0,
      icon: "📄",
    },
    {
      title: "Last Login",
      value: user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : "N/A",
      icon: "⏰",
    },
  ].filter((card) => card.value !== undefined);

  return (
    <div className="mt-6">
      {/* Welcome Message */}
      <WelcomeSection user={user} />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative p-5 rounded-xl bg-white dark:bg-gray-900 shadow-md transition hover:shadow-lg"
          >
            {/* Top Gradient Border */}
            <div className="absolute top-0 left-0 w-full h-1 rounded-t-xl bg-[var(--primary-gradient)]" />

            {/* Icon */}
            <div className="flex items-center justify-center h-full gap-10">
              {/* <div className="w-20 h-20 mb-4 bg-[var(--primary-soft)] text-[var(--primary-text)] rounded-xl flex items-center justify-center text-xl">
                {card.icon}
              </div> */}
              <div className="text-center">
                <p className="text-2xl font-semibold text-[var(--primary-text)]">{card.value}</p>
                <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">{card.title}</p>
              </div>
            </div>
           

            
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsGrid;
