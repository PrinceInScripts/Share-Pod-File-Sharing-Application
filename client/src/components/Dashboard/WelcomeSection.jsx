import React from "react";

const WelcomeSection = ({ user }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Good night";
  };

  const greeting = getGreeting();

  return (
    <section
      className="relative overflow-hidden rounded-2xl p-8 mb-6 text-[var(--text-on-primary)] animate-fade-in"
      style={{
        background: "var(--gradient-bg)", // dynamic gradient via theme
      }}
    >
      <div className="relative z-10 flex items-center gap-6 flex-wrap">
        <img
          src={user?.profilePic}
          alt="Profile"
          className="w-20 h-20 rounded-full border-4 border-white shadow"
        />
        <div>
          <h1 className="text-2xl font-bold">{greeting}, {user?.fullname}! ✨</h1>
          <p className="opacity-90">{user?.email}</p>
          <p className="opacity-70 text-sm">@{user?.username}</p>
        </div>
      </div>

      {/* Floating gradient light effect */}
      <div className="absolute -top-1/2 -right-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_70%)] animate-floating pointer-events-none" />
    </section>
  );
};

export default WelcomeSection;
