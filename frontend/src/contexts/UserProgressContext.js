'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getUserProgress } from '@/lib/api';

const UserProgressContext = createContext();

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
};

export const UserProgressProvider = ({ children, user }) => {
  const [userProgress, setUserProgress] = useState(null);
  const [validatedIdeas, setValidatedIdeas] = useState([]);
  const [stats, setStats] = useState({
    ideasValidated: 0,
    businessScore: 0,
    networkConnections: 0,
    fundingReadiness: 0
  });
  const [loading, setLoading] = useState(false);
  
  console.log('UserProgressProvider - User prop:', user?.email || 'No user');

  // Load data from both server and local storage
  const loadUserProgress = useCallback(async (forceRefresh = false) => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      // Try to get data from server
      const result = await getUserProgress(user.id);
      let serverIdeas = [];
      
      if (result.success && result.data) {
        setUserProgress(result.data);
        serverIdeas = result.data.ideas?.filter(idea => idea.validationScore > 0) || [];
        
        if (serverIdeas.length > 0) {
          setValidatedIdeas(serverIdeas);
          setStats(result.data.stats || {
            ideasValidated: serverIdeas.length,
            businessScore: 0,
            networkConnections: 0,
            fundingReadiness: 0
          });
          console.log(`✅ Loaded ${serverIdeas.length} ideas from server`);
          return; // Use server data if available
        }
      }
      
      // Fallback to local storage
      const localIdeas = JSON.parse(localStorage.getItem('validatedIdeas') || '[]');
      if (localIdeas.length > 0 || forceRefresh) {
        setValidatedIdeas(localIdeas);
        
        const localIdeasCount = localIdeas.length;
        const avgScore = localIdeasCount > 0 
          ? localIdeas.reduce((sum, idea) => sum + (idea.validationScore || 0), 0) / localIdeasCount
          : 0;
        
        setStats({
          ideasValidated: localIdeasCount,
          businessScore: Math.min(100, localIdeasCount * 15 + avgScore * 0.2),
          networkConnections: Math.floor(Math.random() * 10),
          fundingReadiness: Math.min(100, localIdeasCount * 20 + avgScore * 0.3)
        });
        
        console.log(`📦 Loaded ${localIdeasCount} ideas from local storage`);
      }
      
    } catch (error) {
      console.error('Error loading user progress:', error);
      
      // Always fallback to local storage on error
      const localIdeas = JSON.parse(localStorage.getItem('validatedIdeas') || '[]');
      setValidatedIdeas(localIdeas);
      
      const localIdeasCount = localIdeas.length;
      const avgScore = localIdeasCount > 0 
        ? localIdeas.reduce((sum, idea) => sum + (idea.validationScore || 0), 0) / localIdeasCount
        : 0;
      
      setStats({
        ideasValidated: localIdeasCount,
        businessScore: Math.min(100, localIdeasCount * 15 + avgScore * 0.2),
        networkConnections: Math.floor(Math.random() * 10),
        fundingReadiness: Math.min(100, localIdeasCount * 20 + avgScore * 0.3)
      });
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Add a new validated idea
  const addValidatedIdea = useCallback((ideaData) => {
    const newIdea = {
      ...ideaData,
      id: Date.now(),
      validatedAt: new Date().toISOString()
    };
    
    // Update local state
    setValidatedIdeas(prev => [...prev, newIdea]);
    
    // Update local storage
    const localIdeas = JSON.parse(localStorage.getItem('validatedIdeas') || '[]');
    localIdeas.push(newIdea);
    localStorage.setItem('validatedIdeas', JSON.stringify(localIdeas));
    
    // Refresh stats
    loadUserProgress(true);
    
    console.log('✅ Added new validated idea to context');
    return true; // Return success
  }, [loadUserProgress]);

  // Load data when user changes
  useEffect(() => {
    if (user?.id) {
      loadUserProgress();
    }
  }, [user?.id, loadUserProgress]);

  // Refresh data when window gains focus (user comes back to the app)
  useEffect(() => {
    const handleFocus = () => {
      if (user?.id) {
        loadUserProgress(true);
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [user?.id, loadUserProgress]);

  const value = {
    userProgress,
    validatedIdeas,
    stats,
    loading,
    loadUserProgress,
    addValidatedIdea,
    refreshData: () => loadUserProgress(true)
  };

  return (
    <UserProgressContext.Provider value={value}>
      {children}
    </UserProgressContext.Provider>
  );
};
