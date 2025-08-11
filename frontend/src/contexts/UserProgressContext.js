'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getUserProgress, updateUserProgress } from '@/lib/api';

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

  // Load data from server only
  const loadUserProgress = useCallback(async (forceRefresh = false) => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      console.log('📊 Loading user progress for user:', user.id);
      
      const result = await getUserProgress(user.id);
      
      if (result.success && result.data) {
        console.log('✅ Server data received:', result.data);
        setUserProgress(result.data);
        
        // Extract validated ideas from server data
        const serverIdeas = result.data.ideas?.filter(idea => 
          idea.stage === 'validated' && idea.validationScore && idea.validationScore > 0
        ) || [];
        
        console.log(`📈 Found ${serverIdeas.length} validated ideas:`, serverIdeas);
        setValidatedIdeas(serverIdeas);
        
        // Calculate stats from server data
        const avgScore = serverIdeas.length > 0 
          ? serverIdeas.reduce((sum, idea) => sum + (idea.validationScore || 0), 0) / serverIdeas.length
          : 0;
          
        const calculatedStats = {
          ideasValidated: serverIdeas.length,
          businessScore: Math.min(100, Math.round(serverIdeas.length * 15 + avgScore * 0.5)),
          networkConnections: result.data.network?.peers?.length || 0,
          fundingReadiness: Math.min(100, Math.round(serverIdeas.length * 20 + avgScore * 0.3))
        };
        
        setStats(calculatedStats);
        console.log('📊 Stats calculated:', calculatedStats);
        
      } else {
        console.log('❌ Server request failed:', result);
        // Set empty state if server fails
        setValidatedIdeas([]);
        setStats({
          ideasValidated: 0,
          businessScore: 0,
          networkConnections: 0,
          fundingReadiness: 0
        });
      }
      
    } catch (error) {
      console.error('❌ Error loading user progress:', error);
      // Set empty state on error
      setValidatedIdeas([]);
      setStats({
        ideasValidated: 0,
        businessScore: 0,
        networkConnections: 0,
        fundingReadiness: 0
      });
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Add a new validated idea
  const addValidatedIdea = useCallback(async (ideaData) => {
    console.log('🚀 addValidatedIdea called with user:', { id: user?.id, hasUser: !!user });
    
    const newIdea = {
      ...ideaData,
      id: Date.now(),
      validatedAt: new Date().toISOString(),
      stage: 'validated'
    };
    
    try {
      if (!user?.id) {
        console.error('❌ User ID is required to save validated idea');
        throw new Error('User ID is required to save validated idea');
      }
      
      // Update local state immediately for responsiveness
      setValidatedIdeas(prev => [...prev, newIdea]);
      
      // Save to backend database
      const currentIdeas = [...validatedIdeas, newIdea];
      const updateData = {
        ideas: currentIdeas,
        stats: {
          ideasValidated: currentIdeas.length,
          businessScore: Math.min(100, Math.round(currentIdeas.length * 15 + (newIdea.validationScore || 0) * 0.5)),
          networkConnections: stats.networkConnections || 0,
          fundingReadiness: Math.min(100, Math.round(currentIdeas.length * 20 + (newIdea.validationScore || 0) * 0.3))
        }
      };
      
      console.log('💾 Saving idea to backend database...');
      const result = await updateUserProgress(user.id, updateData);
      
      if (result.success) {
        console.log('✅ Idea saved to backend successfully');
        setStats(updateData.stats);
        return true;
      } else {
        console.error('❌ Failed to save idea to backend:', result.error);
        return false;
      }
      
    } catch (error) {
      console.error('❌ Error saving validated idea:', error);
      return false;
    }
  }, [user, validatedIdeas, stats]);

  // Load data when user changes
  useEffect(() => {
    if (user?.id) {
      loadUserProgress();
    }
  }, [user?.id, loadUserProgress]);

  // Refresh data when window gains focus (but not too frequently)
  useEffect(() => {
    let lastRefresh = Date.now();
    
    const handleFocus = () => {
      if (user?.id && Date.now() - lastRefresh > 30000) { // Only refresh if 30+ seconds since last refresh
        console.log('🔄 Window focus - refreshing user data');
        loadUserProgress(true);
        lastRefresh = Date.now();
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
