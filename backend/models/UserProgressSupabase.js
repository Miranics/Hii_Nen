import { supabaseAdmin } from '../config/supabase.js';

// Supabase-based User Progress Management
export class UserProgressService {
  
  // Get or create user progress
  static async getUserProgress(userId) {
    try {
      // First try to get existing progress
      let { data: progress, error } = await supabaseAdmin
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      // If no progress exists, create default one
      if (!progress) {
        const defaultProgress = {
          user_id: userId,
          stats: {
            ideasValidated: 0,
            businessScore: 0,
            networkConnections: 0,
            fundingReadiness: 0
          },
          weekly_goals: [
            {
              id: Date.now() + 1,
              title: 'Complete market research survey',
              description: 'Research your target market and competitors',
              due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
              priority: 'high',
              completed: false,
              created_at: new Date().toISOString()
            },
            {
              id: Date.now() + 2,
              title: 'Finalize MVP feature list',
              description: 'Define the core features for your minimum viable product',
              due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
              priority: 'high',
              completed: false,
              created_at: new Date().toISOString()
            },
            {
              id: Date.now() + 3,
              title: 'Schedule investor meetings',
              description: 'Connect with potential investors and schedule meetings',
              due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
              priority: 'medium',
              completed: false,
              created_at: new Date().toISOString()
            }
          ],
          ideas: [],
          ai_interactions: [],
          activities: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const { data: newProgress, error: insertError } = await supabaseAdmin
          .from('user_progress')
          .insert([defaultProgress])
          .select()
          .single();

        if (insertError) throw insertError;
        progress = newProgress;
      }

      // Calculate dynamic scores
      progress.stats = this.calculateScores(progress);
      
      // Update the scores in database
      await this.updateUserProgress(userId, { stats: progress.stats });

      return { success: true, data: progress };

    } catch (error) {
      console.error('Error getting user progress:', error);
      return {
        success: false,
        error: error.message,
        data: {
          stats: { ideasValidated: 0, businessScore: 0, networkConnections: 0, fundingReadiness: 0 },
          weekly_goals: [],
          ideas: [],
          activities: []
        }
      };
    }
  }

  // Update user progress
  static async updateUserProgress(userId, updateData) {
    try {
      const { data, error } = await supabaseAdmin
        .from('user_progress')
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select();

      if (error) throw error;

      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Error updating user progress:', error);
      return { success: false, error: error.message };
    }
  }

  // Add new idea
  static async addIdea(userId, ideaData) {
    try {
      // First ensure user progress exists
      const progressResult = await this.getUserProgress(userId);
      if (!progressResult.success) {
        throw new Error(progressResult.error);
      }

      // Get current progress (now we're sure it exists)
      const { data: progress, error: fetchError } = await supabaseAdmin
        .from('user_progress')
        .select('ideas, stats, weekly_goals')
        .eq('user_id', userId)
        .single();

      if (fetchError) throw fetchError;

      const newIdea = {
        id: Date.now(),
        ...ideaData,
        stage: ideaData.stage || 'validated',
        validationScore: ideaData.validationScore || 0,
        created_at: new Date().toISOString(),
        last_updated: new Date().toISOString()
      };

      const updatedIdeas = [...(progress?.ideas || []), newIdea];
      const updatedStats = {
        ...progress?.stats,
        ideasValidated: updatedIdeas.length
      };

      // Calculate new scores based on updated data
      const calculatedStats = this.calculateScores({ 
        ideas: updatedIdeas, 
        stats: updatedStats,
        weekly_goals: progress?.weekly_goals || []
      });

      const { data, error } = await supabaseAdmin
        .from('user_progress')
        .update({
          ideas: updatedIdeas,
          stats: calculatedStats,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select();

      if (error) throw error;

      // Add activity
      await this.addActivity(userId, 'idea_created', `New idea: ${ideaData.title}`, `Added "${ideaData.title}" for validation`);

      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Error adding idea:', error);
      return { success: false, error: error.message };
    }
  }

  // Complete goal
  static async completeGoal(userId, goalId) {
    try {
      // Get current progress
      const { data: progress } = await supabaseAdmin
        .from('user_progress')
        .select('weekly_goals')
        .eq('user_id', userId)
        .single();

      const updatedGoals = progress.weekly_goals.map(goal => 
        goal.id == goalId 
          ? { ...goal, completed: true, completed_at: new Date().toISOString() }
          : goal
      );

      const { data, error } = await supabaseAdmin
        .from('user_progress')
        .update({
          weekly_goals: updatedGoals,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select();

      if (error) throw error;

      const completedGoal = updatedGoals.find(g => g.id == goalId);
      if (completedGoal) {
        await this.addActivity(userId, 'goal_completed', `Completed: ${completedGoal.title}`, completedGoal.description);
      }

      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Error completing goal:', error);
      return { success: false, error: error.message };
    }
  }

  // Record AI interaction
  static async recordAIInteraction(userId, interactionData) {
    try {
      // Get current interactions
      const { data: progress } = await supabaseAdmin
        .from('user_progress')
        .select('ai_interactions')
        .eq('user_id', userId)
        .single();

      const newInteraction = {
        id: Date.now(),
        ...interactionData,
        timestamp: new Date().toISOString()
      };

      const updatedInteractions = [newInteraction, ...(progress?.ai_interactions || [])].slice(0, 100);

      const { data, error } = await supabaseAdmin
        .from('user_progress')
        .update({
          ai_interactions: updatedInteractions,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select();

      if (error) throw error;

      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Error recording AI interaction:', error);
      return { success: false, error: error.message };
    }
  }

  // Add activity to timeline
  static async addActivity(userId, type, title, description) {
    try {
      const { data: progress } = await supabaseAdmin
        .from('user_progress')
        .select('activities')
        .eq('user_id', userId)
        .single();

      const newActivity = {
        id: Date.now(),
        type,
        title,
        description,
        timestamp: new Date().toISOString()
      };

      const updatedActivities = [newActivity, ...(progress?.activities || [])].slice(0, 50);

      await supabaseAdmin
        .from('user_progress')
        .update({
          activities: updatedActivities,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      return { success: true };
    } catch (error) {
      console.error('Error adding activity:', error);
      return { success: false, error: error.message };
    }
  }

  // Calculate dynamic scores
  static calculateScores(progressData) {
    const stats = progressData.stats || {};
    let businessScore = 0;
    let fundingReadiness = 0;

    // Business Score calculation (0-100)
    if (stats.ideasValidated > 0) {
      businessScore += Math.min(25, stats.ideasValidated * 8);
    }
    businessScore += (stats.fundingReadiness || 0) * 0.25;
    businessScore += Math.min(20, (stats.networkConnections || 0) * 2);
    
    // Add points for completed goals
    const completedGoals = (progressData.weekly_goals || []).filter(g => g.completed).length;
    businessScore += Math.min(30, completedGoals * 10);

    // Funding Readiness calculation (0-100)
    fundingReadiness += Math.min(30, (stats.ideasValidated || 0) * 10);
    fundingReadiness += Math.min(40, completedGoals * 15);
    
    // Average idea validation score
    const ideas = progressData.ideas || [];
    if (ideas.length > 0) {
      const avgValidationScore = ideas.reduce((sum, idea) => sum + (idea.validationScore || 0), 0) / ideas.length;
      fundingReadiness += avgValidationScore * 0.3;
    }

    return {
      ...stats,
      businessScore: Math.round(businessScore),
      fundingReadiness: Math.round(fundingReadiness)
    };
  }
}

export default UserProgressService;
