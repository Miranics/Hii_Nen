'use client';

import { useState, useEffect } from 'react';
import { checkBackendHealth, API_CONFIG } from '../lib/api';

export default function BackendStatus() {
  const [status, setStatus] = useState({ checking: true, available: false, error: null });

  useEffect(() => {
    checkStatus();
    // Check status every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkStatus = async () => {
    setStatus({ checking: true, available: false, error: null });
    try {
      const response = await fetch('http://localhost:5000/api/health', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
      });
      
      if (response.ok) {
        setStatus({ checking: false, available: true, error: null });
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      setStatus({ checking: false, available: false, error: error.message });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`px-4 py-2 rounded-lg shadow-lg text-sm ${
        status.checking 
          ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' 
          : status.available 
            ? 'bg-green-100 text-green-800 border border-green-300'
            : 'bg-red-100 text-red-800 border border-red-300'
      }`}>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            status.checking 
              ? 'bg-yellow-500 animate-pulse' 
              : status.available 
                ? 'bg-green-500'
                : 'bg-red-500'
          }`}></div>
          <span className="font-medium">
            {status.checking 
              ? 'Checking Backend...' 
              : status.available 
                ? 'HiiNen AI Online'
                : 'Backend Offline'
            }
          </span>
        </div>
        {!status.available && !status.checking && (
          <div className="mt-1 text-xs">
            <p>Backend server not running</p>
            <p className="text-gray-600">Start: <code>node server.js</code> in backend folder</p>
            <button 
              onClick={checkStatus}
              className="mt-1 px-2 py-1 bg-red-200 hover:bg-red-300 rounded text-red-800 text-xs"
            >
              Retry
            </button>
          </div>
        )}
        {status.available && (
          <div className="mt-1 text-xs text-green-600">
            Connected to {API_CONFIG.BASE_URL}/api
          </div>
        )}
      </div>
    </div>
  );
}
