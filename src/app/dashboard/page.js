"use client";
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { DollarSign, Activity, Music, Users, ArrowRight } from 'lucide-react';
import DashboardCard from '@/components/DashboardStats';
import RevenueChart from '@/components/RevemueChart';

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
  const { getDashboardStats, liveEvents } = useAppData();
  const { t } = useLanguage();

  const stats = getDashboardStats();

  if (!user) return null; 

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-screen">
      
      {/* 1. Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 animate-fade-up">
        <div>
          <h1 className="text-4xl font-bold">
            {t('dashboard.title')} <span className="text-gray-600">/</span> <span className="text-cyan-400F bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">{user.name}</span>
          </h1>
          <p className="text-gray-400 mt-2">{t('dashboard.overview')}</p>
        </div>
        <div className="glass-panel px-4 py-2 rounded-full text-xs font-mono text-neon-cyan border border-neon-cyan/30 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-cyan"></span>
          </span>
          {t('dashboard.mainnetConnected')}
        </div>
      </div>

      {/* 2. Stats Grid (Using Reusable Component) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title={t('dashboard.totalBalance')}
          value={`$${stats.totalBalance.toFixed(2)}`}
          subtext={stats.totalBalance > 0 ? `+${((stats.totalBalance / 100) * 14).toFixed(2)}% ${t('dashboard.thisMonth')}` : t('dashboard.noEarningsYet')}
          icon={<DollarSign size={24} />}
          colorClass="neon-cyan"
          delay="0.1s"
        />
        <DashboardCard
          title={t('dashboard.totalStreams')}
          value={stats.totalStreams.toLocaleString()}
          subtext={stats.totalStreams > 0 ? t('dashboard.keepGrowing') : t('dashboard.uploadToStart')}
          icon={<Activity size={24} />}
          colorClass="neon-purple"
          delay="0.2s"
        />
        <DashboardCard
          title={t('dashboard.activeTracks')}
          value={stats.activeTracks.toString()}
          subtext={stats.activeTracks > 0 ? t('dashboard.tracksEarning') : t('dashboard.noTracksUploaded')}
          icon={<Music size={24} />}
          colorClass="neon-cyan"
          delay="0.3s"
        />
        <DashboardCard
          title={t('dashboard.collaborators')}
          value={stats.collaborators.toString()}
          subtext={stats.collaborators > 0 ? t('dashboard.activeSplits') : t('dashboard.noActiveSplits')}
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
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                 {t('dashboard.liveStream')}
              </h3>
              <p className="text-xs text-gray-400">{t('dashboard.realTimeEvents')}</p>
            </div>
            <AudioWave />
          </div>

          <div className="flex-grow relative">
            {liveEvents.length === 0 ? (
              <div className="text-center py-8 flex flex-col items-center justify-center h-full">
                <Activity className="mx-auto text-gray-600 mb-3" size={40} />
                <p className="text-gray-500 text-sm">{t('dashboard.noActivityYet')}</p>
                <p className="text-gray-600 text-xs mt-1">{t('dashboard.uploadTracksToSee')}</p>
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
                        <p className="text-sm font-bold text-white leading-none">{item.title}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">{item.platform}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-neon-cyan">+${item.amount}</p>
                      <p className="text-[10px] text-gray-600">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button className="w-full mt-auto py-3 rounded-lg border border-white/10 text-sm text-gray-400 hover:text-white hover:border-neon-purple hover:bg-neon-purple/10 transition-all flex items-center justify-center gap-2 group">
            {t('dashboard.viewAllHistory')} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
          </button>
        </div>

      </div>
    </div>
  );
}
