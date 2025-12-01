import { TrendingUp } from 'lucide-react';

export default function DashboardCard({ title, value, subtext, icon, colorClass, delay }) {
  return (
    <div 
      className="glass-panel p-6 rounded-2xl relative overflow-hidden group animate-fade-up hover:border-white/20 transition-all duration-300"
      style={{ animationDelay: delay }}
    >
      {/* Background Glow */}
      <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-all duration-500 ${
        colorClass === 'neon-cyan' ? 'bg-neon-cyan' : 'bg-neon-purple'
      }`}></div>
      
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{title}</p>
          <h3 className="text-3xl font-bold mt-2 text-white">{value}</h3>
          <p className={`text-xs mt-2 flex items-center gap-1 ${
            colorClass === 'neon-cyan' ? 'text-neon-cyan' : 'text-neon-purple'
          }`}>
            <TrendingUp size={12} /> {subtext}
          </p>
        </div>
        <div className={`p-3 rounded-xl bg-white/5 ${
          colorClass === 'neon-cyan' ? 'text-neon-cyan' : 'text-neon-purple'
        } group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
      </div>
    </div>
  );
}