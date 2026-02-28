import React from 'react';

export default function Header({ streak = 5 }) {
  return (
    <header className="border-b-2 border-gray-200 p-4 flex justify-between items-center bg-white sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-[0_4px_0_0_rgba(34,197,94,1)]">
          <span className="text-white font-black">K</span>
        </div>
        <h1 className="text-xl font-black tracking-wide text-gray-500 uppercase">Koragna AI</h1>
      </div>
      <div className="flex items-center gap-2 bg-orange-100 px-3 py-1 rounded-full border-2 border-orange-200">
        <span className="text-orange-500 font-bold">🔥 {streak}</span>
      </div>
    </header>
  );
}