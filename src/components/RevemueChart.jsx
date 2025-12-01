"use client";
import { useState } from 'react';
import { useAppData } from '@/context/AppDataContext';

export default function RevenueChart() {
  const { chartData } = useAppData();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Month labels
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Use real chart data
  const currentData = chartData;
  const currentLabels = monthLabels;

  // Find max value for scaling
  const maxValue = Math.max(...currentData, 1); // Prevent division by 0

  return (
    <div className="glass-panel p-8 rounded-2xl animate-fade-up h-full flex flex-col justify-between" style={{ animationDelay: '0.2s' }}>
      
      {/* Header & Filter */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">Royalty Performance</h3>
          <p className="text-xs text-gray-400">Earnings per month • ${chartData.reduce((a, b) => a + b, 0).toFixed(2)} total</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Current Year</p>
          <p className="text-lg font-bold text-neon-cyan">{new Date().getFullYear()}</p>
        </div>
      </div>
      
      {/* The Visual Chart */}
      <div className="relative h-64 flex items-end justify-between gap-2 md:gap-4 border-b border-white/5 pb-2">
        {/* Background Grid Lines (Decoration) */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
          <div className="border-t border-dashed border-gray-500 w-full h-1"></div>
          <div className="border-t border-dashed border-gray-500 w-full h-1"></div>
          <div className="border-t border-dashed border-gray-500 w-full h-1"></div>
        </div>

        {currentData.map((h, i) => (
          <div 
            key={i} 
            className="w-full relative group h-full flex items-end"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* The Bar */}
            <div
              className="w-full rounded-t-sm transition-all duration-500 ease-out cursor-pointer relative"
              style={{
                height: `${(h / maxValue) * 100}%`,
                background: hoveredIndex === i
                  ? 'linear-gradient(to top, #a855f7, #06b6d4)'
                  : 'linear-gradient(to top, rgba(168, 85, 247, 0.2), rgba(6, 182, 212, 0.5))'
              }}
            >
              {/* Glowing Top Cap */}
              {h > 0 && <div className="w-full h-1 bg-neon-cyan shadow-[0_0_10px_#06b6d4]"></div>}
            </div>

            {/* Tooltip */}
            {h > 0 && (
              <div className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-black border border-white/20 px-3 py-2 rounded-lg z-20 transition-all duration-300 pointer-events-none ${
                hoveredIndex === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}>
                <p className="text-xs text-gray-400">Earnings</p>
                <p className="text-sm font-bold text-white">${h.toFixed(2)}</p>
                {/* Tiny triangle arrow */}
                <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-black border-r border-b border-white/20 rotate-45"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* X-Axis Labels */}
      <div className="flex justify-between text-gray-500 text-xs mt-4 uppercase tracking-wider font-mono">
        {currentLabels.map((label, i) => (
          <span key={i}>{label}</span>
        ))}
      </div>
    </div>
  );
}