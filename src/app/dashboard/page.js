"use client";
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { DollarSign, Activity, Music, Users, ArrowRight } from 'lucide-react';
import DashboardCard from '@/components/DashboardStats';
import RevenueChart from '@/components/RevemueChart';
import { translations } from '@/utils/translations';

// 🎵 Audio Wave Animation Component (Decoration)
const AudioWave = () => (
  <div className="flex items-end gap-1 h-6">
    {[...Array(5)].map((_, i) => (
      <div 
        key={i} 
        className="w-1 bg-neon-cyan rounded-full animate-pulse"
        style={{ 
          height: `${Math.random() * 100}%`, 
          animationDuration: `${0.4 + Math.random()}s`,
        }}
      ></div>
    ))}
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const { getDashboardStats, liveEvents, language } = useAppData();
  const t = translations[language]?.dashboard || translations.en.dashboard;

  const stats = getDashboardStats();

  if (!user) return null; 

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-screen">
      
      {/* 1. Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 animate-fade-up">
        <div>
          <h1 className="text-4xl font-bold text-purple-950 dark:text-white">
            {t.welcome} <span className="text-purple-600 dark:text-gray-600">/</span> <span className="text-cyan-400F bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">{user.name}</span>
          </h1>
          <p className="text-purple-700 dark:text-gray-400 mt-2">{t.overview}</p>
        </div>
        <div className="glass-panel px-4 py-2 rounded-full text-xs font-mono text-neon-cyan border border-neon-cyan/30 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-cyan"></span>
          </span>
          {t.mainnet}
        </div>
      </div>

      {/* 2. Stats Grid (Using Reusable Component) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title={t.totalBalance}
          value={`$${stats.totalBalance.toFixed(2)}`}
          subtext={stats.totalBalance > 0 ? `+${((stats.totalBalance / 100) * 14).toFixed(2)}% ${t.thisMonth}` : t.noEarnings}
          icon={<DollarSign size={24} />}
          colorClass="neon-cyan"
          delay="0.1s"
        />
        <DashboardCard
          title={t.totalStreams}
          value={stats.totalStreams.toLocaleString()}
          subtext={stats.totalStreams > 0 ? t.keepGrowing : t.uploadStart}
          icon={<Activity size={24} />}
          colorClass="neon-purple"
          delay="0.2s"
        />
        <DashboardCard
          title={t.activeTracks}
          value={stats.activeTracks.toString()}
          subtext={stats.activeTracks > 0 ? t.tracksEarning : t.noTracks}
          icon={<Music size={24} />}
          colorClass="neon-cyan"
          delay="0.3s"
        />
        <DashboardCard
          title={t.collaborators}
          value={stats.collaborators.toString()}
          subtext={stats.collaborators > 0 ? t.activeSplits : t.noSplits}
          icon={<Users size={24} />}
          colorClass="neon-purple"
          delay="0.4s"
        />
      </div>

      {/* 3. Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* BIG CHART AREA (Left 2/3) */}
        <div className="lg:col-span-2">
           <RevenueChart />
        </div>

        {/* LIVE STREAM FEED (Right 1/3) */}
        <div className="glass-panel p-8 rounded-2xl animate-fade-up flex flex-col h-full" style={{ animationDelay: '0.6s' }}>
          <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-xl font-bold text-purple-950 dark:text-white flex items-center gap-2">
                {t.recentActivity}
              </h3>
              <p className="text-xs text-purple-600 dark:text-gray-400">{t.realTime}</p>
            </div>
            <AudioWave />
          </div>

          <div className="flex-grow relative">
            {liveEvents.length === 0 ? (
              <div className="text-center py-8 flex flex-col items-center justify-center h-full">
                <Activity className="mx-auto text-purple-400 dark:text-gray-600 mb-3" size={40} />
                <p className="text-purple-600 dark:text-gray-500 text-sm">{t.noActivity}</p>
                <p className="text-purple-500 dark:text-gray-600 text-xs mt-1">{t.uploadToSee}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {liveEvents.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all cursor-default border border-transparent hover:border-white/10 animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-black text-xs font-bold ${
                        item.platform === 'Spotify' ? 'bg-[#1DB954]' :
                        item.platform === 'Apple Music' ? 'bg-[#FA243C]' : 'bg-white'
                      }`}>
                        {item.platform[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-purple-950 dark:text-white leading-none">{item.title}</p>
                        <p className="text-[10px] text-purple-600 dark:text-gray-500 uppercase tracking-wider mt-1">{item.platform}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <p className="text-xs font-bold text-neon-cyan">{item.amount}</p>
                        <p className="text-[10px] text-purple-500 dark:text-gray-600">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button className="w-full mt-auto py-3 rounded-lg border border-purple-200 dark:border-white/10 text-sm text-purple-700 dark:text-gray-400 hover:text-purple-950 dark:hover:text-white hover:border-neon-purple hover:bg-neon-purple/10 transition-all flex items-center justify-center gap-2 group">
            {t.viewAllHistory} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
          </button>
        </div>

      </div>
    </div>
  );
}









// "use client";
// import { useAuth } from '../../context/AuthContext';
// import { TrendingUp, Music, Users, DollarSign, Activity } from 'lucide-react';
// import DashboardCard from '@/components/DashboardCard';



// // 🎵 Audio Wave Animation Component
// const AudioWave = () => (
//   <div className="flex items-end gap-1 h-12">
//     {[...Array(15)].map((_, i) => (
//       <div 
//         key={i} 
//         className="w-2 bg-gradient-to-t from-neon-purple to-neon-cyan rounded-full animate-pulse"
//         style={{ 
//           height: `${Math.random() * 100}%`, 
//           animationDuration: `${0.5 + Math.random()}s`,
//           opacity: 0.8
//         }}
//       ></div>
//     ))}
//   </div>
// );

// export default function Dashboard() {
//   const { user } = useAuth();

//   // If page loads before auth check finishes, just show loading or null
//   // (In a real app you'd have a loading spinner here)
//   if (!user) return null; 

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
//       {/* 1. Welcome Section */}
//       <div className="flex flex-col md:flex-row justify-between items-end gap-4 animate-fade-up">
//         <div>
//           <h1 className="text-4xl font-bold">
//             Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">{user.name}</span>
//           </h1>
//           <p className="text-gray-400 mt-2">Here is what's happening with your music today.</p>
//         </div>
//         <div className="glass-panel px-4 py-2 rounded-full text-xs font-mono text-neon-cyan border border-neon-cyan/30">
//           ● LIVE DATA FEED
//         </div>
//       </div>

//       {/* 2. Stats Grid (Bento Box) */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <DashboardCard 
//           title="Total Balance" 
//           value="$12,450.32" 
//           subtext="+14% from last month" 
//           icon={<DollarSign size={24} />} 
//           colorClass="neon-cyan"
//           delay="0.1s"
//         />
//         <DashboardCard 
//           title="Total Earnings" 
//           value="$48,200.00" 
//           subtext="Lifetime Gross" 
//           icon={<Activity size={24} />} 
//           colorClass="neon-purple"
//           delay="0.2s"
//         />
//         <DashboardCard 
//           title="Active Tracks" 
//           value="14" 
//           subtext="2 pending release" 
//           icon={<Music size={24} />} 
//           colorClass="neon-cyan"
//           delay="0.3s"
//         />
//         <DashboardCard 
//           title="Splits Active" 
//           value="8" 
//           subtext="Co-owners paid" 
//           icon={<Users size={24} />} 
//           colorClass="neon-purple"
//           delay="0.4s"
//         />
//       </div>

//       {/* 3. Main Content Split */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* BIG CHART AREA (Left 2/3) */}
//         <div className="lg:col-span-2 glass-panel p-8 rounded-2xl animate-fade-up" style={{ animationDelay: '0.5s' }}>
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-xl font-bold text-white">Royalty Performance</h3>
//             <select className="bg-black/30 border border-white/10 text-gray-300 text-sm rounded-lg p-2 outline-none">
//               <option>Last 30 Days</option>
//               <option>Last 6 Months</option>
//               <option>This Year</option>
//             </select>
//           </div>
          
//           {/* Simulated Graph Visual */}
//           <div className="h-64 flex items-end justify-between gap-2 border-b border-white/5 pb-2">
//             {[35, 45, 30, 60, 75, 50, 65, 80, 55, 90, 70, 100].map((h, i) => (
//               <div key={i} className="w-full relative group">
//                 <div 
//                   className="w-full bg-gradient-to-t from-neon-purple/20 to-neon-cyan/50 rounded-t-sm hover:from-neon-purple hover:to-neon-cyan transition-all duration-300 cursor-pointer"
//                   style={{ height: `${h}%` }}
//                 >
//                   {/* Tooltip on hover */}
//                   <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black border border-white/20 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
//                     ${h * 120}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-between text-gray-500 text-xs mt-4">
//             <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
//             <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
//           </div>
//         </div>

//         {/* RECENT ACTIVITY (Right 1/3) */}
//         <div className="glass-panel p-8 rounded-2xl animate-fade-up" style={{ animationDelay: '0.6s' }}>
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-xl font-bold text-white">Live Stream</h3>
//             <AudioWave />
//           </div>

//           <div className="space-y-4">
//             {[1, 2, 3, 4].map((item) => (
//               <div key={item} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/10">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-neon-cyan">
//                     <Music size={18} />
//                   </div>
//                   <div>
//                     <p className="text-sm font-bold text-white">Midnight Drive</p>
//                     <p className="text-xs text-gray-500">Spotify • US Stream</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm font-bold text-neon-purple">+$0.004</p>
//                   <p className="text-[10px] text-gray-600">Just now</p>
//                 </div>
//               </div>
//             ))}
            
//             <button className="w-full mt-4 py-3 rounded-lg border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/30 transition-all">
//               View All History
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }



