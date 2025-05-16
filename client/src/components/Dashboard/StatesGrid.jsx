import React from "react";

const StatsGrid = () => {
  const cards = Array(4).fill({
    title: "Total Users",
    value: "100,221",
    growth: "14%",
    since: "from 2019"
  });

  return (
    <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <div key={index} className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-gray-400">{card.title}</span>
              <span className="text-lg font-semibold">{card.value}</span>
            </div>
            <div className="p-10 bg-gray-200 rounded-md"></div>
          </div>
          <div>
            <span className="inline-block px-2 text-sm text-white bg-green-300 rounded">{card.growth}</span>
            <span>{card.since}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
