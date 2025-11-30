import { Users, Target, Zap, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-6 pb-16">
      <div className="text-center mb-16 animate-fade-up">
        <h1 className="text-5xl font-bold mb-4 text-purple-950 dark:text-white">
          About <span className="text-purple-600 dark:text-white">Harmoniq</span>
        </h1>
        <p className="text-xl text-purple-700 dark:text-gray-300 max-w-3xl mx-auto">
          Reimagining the music industry through blockchain transparency and fairness.
        </p>
      </div>

      {/* Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="glass-panel p-8 rounded-2xl border-t-2 border-neon-purple/50 hover:border-neon-purple transition-all duration-300 hover:scale-105 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <Target className="text-purple-600 dark:text-neon-purple mb-4" size={40} />
          <h3 className="text-2xl font-bold mb-3 text-purple-950 dark:text-white">Our Mission</h3>
          <p className="text-purple-700 dark:text-gray-300">
            To eliminate the confusion in music royalties. We believe every producer, songwriter, and vocalist deserves to be paid exactly what they are owed, instantly.
          </p>
        </div>
        <div className="glass-panel p-8 rounded-2xl border-t-2 border-neon-cyan/50 hover:border-neon-cyan transition-all duration-300 hover:scale-105 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <Zap className="text-purple-600 dark:text-neon-cyan mb-4" size={40} />
          <h3 className="text-2xl font-bold mb-3 text-purple-950 dark:text-white">The Speed</h3>
          <p className="text-purple-700 dark:text-gray-300">
            Traditional royalties take 3-6 months. Harmoniq takes 3-6 seconds using smart contracts and Web3 technology.
          </p>
        </div>
        <div className="glass-panel p-8 rounded-2xl border-t-2 border-purple-200 dark:border-white/50 hover:border-purple-400 dark:hover:border-white transition-all duration-300 hover:scale-105 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Users className="text-purple-600 dark:text-white mb-4" size={40} />
          <h3 className="text-2xl font-bold mb-3 text-purple-950 dark:text-white">The Community</h3>
          <p className="text-purple-700 dark:text-gray-300">
            Built by musicians, for musicians. We understand the struggle of tracking split sheets and chasing payments.
          </p>
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="glass-panel p-12 rounded-3xl animate-fade-up" style={{ animationDelay: '0.4s' }}>
        <div className="max-w-4xl mx-auto text-center">
          <Globe className="text-purple-600 dark:text-neon-cyan mx-auto mb-6" size={48} />
          <h2 className="text-3xl font-bold mb-6 text-purple-950 dark:text-white">Who We Are</h2>
          <p className="text-lg text-purple-700 dark:text-gray-300 mb-6">
            Harmoniq was created by artists who experienced firsthand the challenges of royalty distribution. Traditional systems are slow, opaque, and often unfair to creators.
          </p>
          <p className="text-lg text-purple-700 dark:text-gray-300 mb-6">
            We leverage blockchain technology to create immutable ownership records, instant payment distribution, and complete transparency. Once a split is agreed upon, it cannot be altered without consensus from all parties.
          </p>
          <p className="text-lg text-purple-700 dark:text-gray-300">
            Our platform empowers artists to focus on what they do best—creating music—while we handle the complex backend of royalty management with precision and fairness.
          </p>
        </div>
      </div>
    </div>
  );
}