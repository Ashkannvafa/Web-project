import { Music, Zap, ShieldCheck, DollarSign, Users, Database, AlertTriangle, BarChart3 } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Music size={32} />,
      title: "Track Upload",
      desc: "Upload your masters directly. We support high-quality WAV and FLAC formats.",
      color: "text-neon-purple"
    },
    {
      icon: <Zap size={32} />,
      title: "Ownership Splits",
      desc: "Define percentages for every contributor. Set splits that are immutable and transparent.",
      color: "text-neon-cyan"
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Real-Time Royalty Tracking",
      desc: "See earnings as they happen. Live feed from Spotify, Apple Music, and more.",
      color: "text-neon-purple"
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Blockchain Security",
      desc: "Your data is encrypted and ownership records are immutable on the blockchain.",
      color: "text-neon-cyan"
    },
    {
      icon: <AlertTriangle size={32} />,
      title: "Fraud Detection",
      desc: "Automated systems detect unusual activity and protect your earnings.",
      color: "text-neon-purple"
    },
    {
      icon: <DollarSign size={32} />,
      title: "Automated Payouts",
      desc: "When earnings hit your account, they're automatically routed to your wallet.",
      color: "text-neon-cyan"
    },
    {
      icon: <Users size={32} />,
      title: "Team Collaboration",
      desc: "Invite collaborators and manage splits with full transparency and consensus.",
      color: "text-neon-purple"
    },
    {
      icon: <Database size={32} />,
      title: "NFT Ready",
      desc: "Mint tracks as NFTs and unlock new revenue streams for your music.",
      color: "text-neon-cyan"
    }
  ];

  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-6 pb-16">
      <div className="text-center mb-16 animate-fade-up">
        <h1 className="text-5xl font-bold mb-4 text-white">
          <span className="text-white">Platform</span> Features
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Everything you need to manage your music royalties with complete transparency.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feat, i) => (
          <div
            key={i}
            className="glass-panel p-6 rounded-xl hover:-translate-y-2 transition-all duration-300 group cursor-default animate-fade-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className={`mb-4 ${feat.color} group-hover:scale-110 transition-transform`}>
              {feat.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">{feat.title}</h3>
            <p className="text-sm text-gray-300">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}