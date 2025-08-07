-- Create user_progress table for personalized dashboard data
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- User Stats (JSONB for flexibility)
    stats JSONB DEFAULT '{
        "ideasValidated": 0,
        "businessScore": 0,
        "networkConnections": 0,
        "fundingReadiness": 0
    }'::jsonb,
    
    -- Weekly Goals (array of goal objects)
    weekly_goals JSONB DEFAULT '[]'::jsonb,
    
    -- User Ideas (array of idea objects)  
    ideas JSONB DEFAULT '[]'::jsonb,
    
    -- AI Interaction History (array of interaction objects)
    ai_interactions JSONB DEFAULT '[]'::jsonb,
    
    -- Activity Timeline (array of activity objects)
    activities JSONB DEFAULT '[]'::jsonb,
    
    -- Business Plan Progress
    business_plan JSONB DEFAULT '{
        "completionPercentage": 0,
        "sections": {
            "executiveSummary": {"completed": false},
            "marketAnalysis": {"completed": false},
            "competitiveAnalysis": {"completed": false},
            "marketingPlan": {"completed": false},
            "operationsPlan": {"completed": false},
            "financialProjections": {"completed": false}
        }
    }'::jsonb,
    
    -- Funding Information
    funding JSONB DEFAULT '{
        "currentStage": "pre-seed",
        "targetAmount": 0,
        "amountRaised": 0,
        "investors": [],
        "pitchDeckScore": 0
    }'::jsonb,
    
    -- Mentorship Progress
    mentorship JSONB DEFAULT '{
        "sessionsCompleted": 0,
        "topicsDiscussed": [],
        "currentFocus": "",
        "mentorFeedback": []
    }'::jsonb,
    
    -- Network connections
    network JSONB DEFAULT '{
        "mentors": [],
        "peers": [],
        "investors": []
    }'::jsonb,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    UNIQUE(user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_updated_at ON user_progress(updated_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_user_progress_updated_at ON user_progress;
CREATE TRIGGER update_user_progress_updated_at
    BEFORE UPDATE ON user_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Users can only access their own progress data
DROP POLICY IF EXISTS "Users can view their own progress" ON user_progress;
CREATE POLICY "Users can view their own progress" ON user_progress
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own progress" ON user_progress;
CREATE POLICY "Users can insert their own progress" ON user_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own progress" ON user_progress;
CREATE POLICY "Users can update their own progress" ON user_progress
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own progress" ON user_progress;
CREATE POLICY "Users can delete their own progress" ON user_progress
    FOR DELETE USING (auth.uid() = user_id);

-- Grant necessary permissions
GRANT ALL ON user_progress TO authenticated;
GRANT ALL ON user_progress TO service_role;

-- Insert some sample data for testing (optional - remove in production)
-- This will create sample progress for existing users
/*
INSERT INTO user_progress (user_id, stats, weekly_goals, ideas) 
SELECT 
    id as user_id,
    '{
        "ideasValidated": 2,
        "businessScore": 45,
        "networkConnections": 8,
        "fundingReadiness": 65
    }'::jsonb as stats,
    '[
        {
            "id": 1,
            "title": "Complete market research survey",
            "description": "Research your target market and competitors",
            "due_date": "2025-08-14T00:00:00.000Z",
            "priority": "high",
            "completed": true,
            "completed_at": "2025-08-05T10:30:00.000Z",
            "created_at": "2025-08-01T00:00:00.000Z"
        },
        {
            "id": 2,
            "title": "Finalize MVP feature list", 
            "description": "Define the core features for your minimum viable product",
            "due_date": "2025-08-09T00:00:00.000Z",
            "priority": "high",
            "completed": false,
            "created_at": "2025-08-01T00:00:00.000Z"
        },
        {
            "id": 3,
            "title": "Schedule investor meetings",
            "description": "Connect with potential investors and schedule meetings", 
            "due_date": "2025-08-12T00:00:00.000Z",
            "priority": "medium",
            "completed": false,
            "created_at": "2025-08-01T00:00:00.000Z"
        }
    ]'::jsonb as weekly_goals,
    '[
        {
            "id": 1,
            "title": "AI-Powered Fitness Coach",
            "description": "A personalized fitness app that uses AI to create custom workout plans",
            "industry": "Health & Fitness",
            "stage": "validation",
            "validationScore": 75,
            "created_at": "2025-07-20T00:00:00.000Z"
        },
        {
            "id": 2, 
            "title": "Smart Home Energy Manager",
            "description": "IoT solution to optimize home energy consumption",
            "industry": "Smart Home",
            "stage": "concept", 
            "validationScore": 40,
            "created_at": "2025-07-25T00:00:00.000Z"
        }
    ]'::jsonb as ideas
FROM auth.users 
WHERE NOT EXISTS (SELECT 1 FROM user_progress WHERE user_progress.user_id = auth.users.id)
LIMIT 5; -- Only add for first 5 users to avoid overwhelming
*/
