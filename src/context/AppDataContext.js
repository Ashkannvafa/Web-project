"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const AppDataContext = createContext();

// Helper to get current user ID
const getUserId = () => {
  if (typeof window !== 'undefined') {
    const currentUser = localStorage.getItem('harmoniq_currentUser');
    if (currentUser) {
      return JSON.parse(currentUser).id;
    }
  }
  return null;
};

export const AppDataProvider = ({ children }) => {
  // Load initial data from localStorage (user-specific)
  const [tracks, setTracks] = useState(() => {
    if (typeof window !== 'undefined') {
      const userId = getUserId();
      if (userId) {
        const saved = localStorage.getItem(`harmoniq_tracks_${userId}`);
        return saved ? JSON.parse(saved) : [];
      }
    }
    return [];
  });

  const [transactions, setTransactions] = useState(() => {
    if (typeof window !== 'undefined') {
      const userId = getUserId();
      if (userId) {
        const saved = localStorage.getItem(`harmoniq_transactions_${userId}`);
        return saved ? JSON.parse(saved) : [];
      }
    }
    return [];
  });

  const [balance, setBalance] = useState(() => {
    if (typeof window !== 'undefined') {
      const userId = getUserId();
      if (userId) {
        const saved = localStorage.getItem(`harmoniq_balance_${userId}`);
        return saved ? parseFloat(saved) : 0;
      }
    }
    return 0;
  });

  const [totalStreams, setTotalStreams] = useState(() => {
    if (typeof window !== 'undefined') {
      const userId = getUserId();
      if (userId) {
        const saved = localStorage.getItem(`harmoniq_totalStreams_${userId}`);
        return saved ? parseInt(saved) : 0;
      }
    }
    return 0;
  });

  const [liveEvents, setLiveEvents] = useState([]);

  const [chartData, setChartData] = useState(() => {
    if (typeof window !== 'undefined') {
      const userId = getUserId();
      if (userId) {
        const saved = localStorage.getItem(`harmoniq_chartData_${userId}`);
        return saved ? JSON.parse(saved) : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
    }
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  });

  // Streaming platforms with their payout rates (per stream)
  const platforms = [
    { name: "Spotify", rate: 0.004, color: "#1DB954" },
    { name: "Apple Music", rate: 0.01, color: "#FA243C" },
    { name: "YouTube", rate: 0.002, color: "#FF0000" },
    { name: "Tidal", rate: 0.0125, color: "#000000" },
  ];

  // Generate a realistic stream event
  const generateStreamEvent = (track) => {
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const earnings = platform.rate;

    // Create live event
    const liveEvent = {
      id: Date.now() + Math.random(),
      title: track.title,
      platform: platform.name,
      amount: earnings.toFixed(4),
      time: "Just now"
    };

    // Add to live events
    setLiveEvents(prev => [liveEvent, ...prev.slice(0, 4)]);

    // Update total streams
    setTotalStreams(prev => prev + 1);

    // Update balance
    setBalance(prev => prev + earnings);

    // Update chart data (add to current month)
    const currentMonth = new Date().getMonth();
    setChartData(prev => {
      const newData = [...prev];
      newData[currentMonth] += earnings;
      return newData;
    });

    // Every 10 streams, create a transaction
    if (Math.random() > 0.9) {
      const transactionAmount = earnings * 10;
      const newTransaction = {
        id: Date.now() + Math.random(),
        track: track.title,
        source: platform.name,
        amount: `+$${transactionAmount.toFixed(2)}`,
        status: "Paid",
        date: new Date().toISOString(),
      };
      setTransactions(prev => [newTransaction, ...prev]);
    }
  };

  // Save data to localStorage whenever it changes (user-specific)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userId = getUserId();
      if (userId) {
        localStorage.setItem(`harmoniq_tracks_${userId}`, JSON.stringify(tracks));
      }
    }
  }, [tracks]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userId = getUserId();
      if (userId) {
        localStorage.setItem(`harmoniq_transactions_${userId}`, JSON.stringify(transactions));
      }
    }
  }, [transactions]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userId = getUserId();
      if (userId) {
        localStorage.setItem(`harmoniq_balance_${userId}`, balance.toString());
      }
    }
  }, [balance]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userId = getUserId();
      if (userId) {
        localStorage.setItem(`harmoniq_totalStreams_${userId}`, totalStreams.toString());
      }
    }
  }, [totalStreams]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userId = getUserId();
      if (userId) {
        localStorage.setItem(`harmoniq_chartData_${userId}`, JSON.stringify(chartData));
      }
    }
  }, [chartData]);

  // Auto-generate streams for active tracks
  useEffect(() => {
    if (tracks.length === 0) return;

    const interval = setInterval(() => {
      // Pick a random track to generate stream for
      const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
      generateStreamEvent(randomTrack);
    }, 3000); // Generate a stream every 3 seconds

    return () => clearInterval(interval);
  }, [tracks]);

  // Add a new track
  const addTrack = (track) => {
    const newTrack = {
      ...track,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      totalEarnings: 0,
      streamCount: 0,
    };
    setTracks(prev => [newTrack, ...prev]);
    return newTrack;
  };

  // Delete a track
  const deleteTrack = (trackId) => {
    setTracks(prev => prev.filter(t => t.id !== trackId));
  };

  // Add a transaction manually
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      date: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);

    // Update balance
    const amount = parseFloat(transaction.amount.replace(/[^0-9.-]+/g, ''));
    setBalance(prev => prev + amount);

    return newTransaction;
  };

  // Add live event manually
  const addLiveEvent = (event) => {
    const newEvent = {
      ...event,
      id: Date.now(),
      time: "Just now"
    };
    setLiveEvents(prev => [newEvent, ...prev.slice(0, 4)]);
    setTotalStreams(prev => prev + 1);
    return newEvent;
  };

  // Get dashboard stats
  const getDashboardStats = () => {
    const activeCollaborators = tracks.reduce((acc, track) => {
      return acc + (track.splits?.length || 0) - 1; // -1 to exclude owner
    }, 0);

    return {
      totalBalance: balance,
      totalStreams: totalStreams,
      activeTracks: tracks.length,
      collaborators: activeCollaborators,
    };
  };

  return (
    <AppDataContext.Provider
      value={{
        tracks,
        transactions,
        balance,
        liveEvents,
        chartData,
        totalStreams,
        addTrack,
        deleteTrack,
        addTransaction,
        addLiveEvent,
        getDashboardStats,
        setBalance,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within AppDataProvider');
  }
  return context;
};
