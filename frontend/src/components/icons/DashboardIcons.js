// Professional custom icons for HiiNen Dashboard - No generic icons
import React from 'react';

// Idea Validation Icon - Lightbulb with checkmark
export const IdeaValidationIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26A6.995 6.995 0 0019 9a7 7 0 00-7-7z"
      fill={color}
      opacity="0.2"
    />
    <path
      d="M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26A6.995 6.995 0 0019 9a7 7 0 00-7-7z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M10 20h4"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="m9 12 2 2 4-4"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Business Analytics Icon - Growth chart with insights
export const AnalyticsIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M7 16l3-3 2 2 5-5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="7" cy="16" r="1.5" fill={color}/>
    <circle cx="10" cy="13" r="1.5" fill={color}/>
    <circle cx="12" cy="15" r="1.5" fill={color}/>
    <circle cx="17" cy="10" r="1.5" fill={color}/>
    <path d="M17 7v3h-3" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Business Planning Icon - Strategic blueprint
export const BusinessPlanIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="4" width="16" height="16" rx="2" stroke={color} strokeWidth="2" fill="none"/>
    <rect x="7" y="7" width="4" height="3" fill={color} opacity="0.3"/>
    <rect x="13" y="7" width="4" height="2" fill={color} opacity="0.2"/>
    <path d="M7 13h10M7 16h6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="18" cy="6" r="2" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M18 4v4M16 6h4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Funding Icon - Investment growth
export const FundingIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="17" cy="8" r="3" fill={color} opacity="0.2"/>
    <path d="M15 8h4M17 6v4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Market Research Icon - Target with insights
export const MarketResearchIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="2" fill="none" opacity="0.6"/>
    <circle cx="12" cy="12" r="2" fill={color}/>
    <path d="M4.93 4.93l4.24 4.24M14.83 9.17l4.24-4.24M14.83 14.83l4.24 4.24M9.17 14.83l-4.24 4.24" 
      stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Mentorship Icon - Connected people with guidance
export const MentorshipIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 14l2-2 2 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="18" cy="8" r="2" fill={color} opacity="0.3"/>
  </svg>
);

// Networking Icon - Connected nodes
export const NetworkingIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="5" r="3" stroke={color} strokeWidth="2" fill="none"/>
    <circle cx="5" cy="19" r="3" stroke={color} strokeWidth="2" fill="none"/>
    <circle cx="19" cy="19" r="3" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M12 8v5M7.5 16.5L10 14M16.5 16.5L14 14" stroke={color} strokeWidth="2"/>
    <circle cx="12" cy="13" r="2" fill={color}/>
  </svg>
);

// Learning Icon - Growth with knowledge
export const LearningIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" 
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M12 21V7" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="6" cy="8" r="2" fill={color} opacity="0.3"/>
    <circle cx="18" cy="8" r="2" fill={color} opacity="0.3"/>
  </svg>
);

// Settings Icon - Professional gear configuration
export const SettingsIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" 
      stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="1" fill={color}/>
  </svg>
);

// User Profile Icon - Professional avatar
export const UserProfileIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M12 11a4 4 0 01-4-4 4 4 0 018 0" fill={color} opacity="0.2"/>
  </svg>
);

// Dashboard Home Icon - Professional dashboard grid
export const DashboardHomeIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2" fill="none"/>
    <rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2" fill="none"/>
    <rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="2" fill="none"/>
    <rect x="14" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="2" fill="none"/>
    <circle cx="6.5" cy="6.5" r="1" fill={color}/>
    <circle cx="17.5" cy="6.5" r="1" fill={color}/>
    <circle cx="6.5" cy="17.5" r="1" fill={color}/>
    <circle cx="17.5" cy="17.5" r="1" fill={color}/>
  </svg>
);
