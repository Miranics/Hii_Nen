'use client';

import { useState, useEffect } from 'react';
import { checkBackendHealth, API_CONFIG } from '../lib/api';

export default function BackendStatus() {
  const [status, setStatus] = useState({ checking: true, available: false, error: null });

  useEffect(() => {
    checkStatus();
    // Check status every 2 minutes for production reliability
    const interval = setInterval(checkStatus, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const checkStatus = async () => {
    setStatus({ checking: true, available: false, error: null });
    try {
      const isHealthy = await checkBackendHealth();
      setStatus({ 
        checking: false, 
        available: isHealthy, 
        error: isHealthy ? null : 'Service unavailable'
      });
    } catch (error) {
      setStatus({ checking: false, available: false, error: error.message });
    }
  };

  // Don't show anything if backend is online - keep UI clean
  if (status.available) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`px-4 py-2 rounded-lg shadow-lg text-sm ${
        status.checking 
          ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' 
          : 'bg-orange-100 text-orange-800 border border-orange-300'
      }`}>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            status.checking 
              ? 'bg-yellow-500 animate-pulse' 
              : 'bg-orange-500'
          }`}></div>
          <span className="font-medium">
            {status.checking 
              ? 'Checking AI Status...' 
              : 'AI Offline - Smart Fallbacks Active'
            }
          </span>
        </div>
        {!status.available && !status.checking && (
          <div className="mt-1 text-xs">
            <p>✨ HiiNen is using intelligent responses</p>
            <p className="text-orange-600">All features remain functional</p>
            <button 
              onClick={checkStatus}
              className="mt-1 px-2 py-1 bg-orange-200 hover:bg-orange-300 rounded text-orange-800 text-xs"
            >
              Check Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
