'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useUserProgress } from '@/contexts/UserProgressContext';
import {
  DashboardHomeIcon,
  IdeaValidationIcon,
  AnalyticsIcon,
  BusinessPlanIcon,
  FundingIcon,
  MarketResearchIcon,
  MentorshipIcon,
  NetworkingIcon,
  LearningIcon,
  SettingsIcon
} from '@/components/icons/DashboardIcons';

export default function DashboardSidebar({ user }) {
  const pathname = usePathname();
  const { stats } = useUserProgress();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: DashboardHomeIcon,
      badge: null,
      description: 'Overview & insights'
    },
    {
      name: 'Idea Validation',
      href: '/dashboard/idea-validation',
      icon: IdeaValidationIcon,
      badge: stats.ideasValidated || 0,
      description: 'Validate business ideas'
    },
    {
      name: 'Analytics',
      href: '/dashboard/analytics',
      icon: AnalyticsIcon,
      badge: stats.businessScore ? `${stats.businessScore}%` : null,
      description: 'Performance metrics'
    },
    {
      name: 'Business Planning',
      href: '/dashboard/business-planning',
      icon: BusinessPlanIcon,
      badge: null,
      description: 'Strategic planning'
    },
    {
      name: 'Market Research',
      href: '/dashboard/market-research',
      icon: MarketResearchIcon,
      badge: null,
      description: 'Market insights'
    },
    {
      name: 'Funding',
      href: '/dashboard/funding',
      icon: FundingIcon,
      badge: stats.fundingReadiness ? `${stats.fundingReadiness}%` : null,
      description: 'Investment readiness'
    },
    {
      name: 'Mentorship',
      href: '/dashboard/mentorship',
      icon: MentorshipIcon,
      badge: null,
      description: 'Expert guidance'
    },
    {
      name: 'Networking',
      href: '/dashboard/networking',
      icon: NetworkingIcon,
      badge: stats.networkConnections || 0,
      description: 'Build connections'
    },
    {
      name: 'Learning',
      href: '/dashboard/learning',
      icon: LearningIcon,
      badge: null,
      description: 'Knowledge center'
    }
  ];

  const isActive = (href) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 lg:z-50 lg:bg-gray-900">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center">
          <Image
            className="h-8 w-auto"
            src="/hiinen-logo.svg"
            alt="HiiNen"
            width={32}
            height={32}
          />
          <span className="ml-3 text-white text-lg font-semibold">HiiNen</span>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center px-4 py-3 bg-gray-800 rounded-lg">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {user?.email?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-white truncate">
              {user?.user_metadata?.full_name || 
               user?.email?.split('@')[0] || 
               'Welcome'}
            </p>
            <p className="text-xs text-gray-300 truncate">
              {user?.user_metadata?.user_type || 'Entrepreneur'}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`
                          group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-medium transition-all duration-200
                          ${active
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                          }
                        `}
                      >
                        <item.icon 
                          className="h-5 w-5 shrink-0" 
                          color={active ? '#ffffff' : '#9ca3af'}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="truncate">{item.name}</span>
                            {item.badge !== null && (
                              <span className={`
                                inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                                ${active 
                                  ? 'bg-white/20 text-white' 
                                  : 'bg-gray-700 text-gray-300'
                                }
                              `}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className={`text-xs mt-1 ${active ? 'text-blue-100' : 'text-gray-400'}`}>
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            
            {/* Settings at bottom */}
            <li className="mt-auto">
              <Link
                href="/dashboard/settings"
                className={`
                  group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-medium transition-all duration-200
                  ${isActive('/dashboard/settings')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }
                `}
              >
                <SettingsIcon 
                  className="h-5 w-5 shrink-0" 
                  color={isActive('/dashboard/settings') ? '#ffffff' : '#9ca3af'}
                />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
