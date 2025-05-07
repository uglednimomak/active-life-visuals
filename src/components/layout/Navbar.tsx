
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, BarChart, History, Home, Trophy, Calendar } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath === path;
  };

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <Activity className="w-6 h-6 text-fitness-primary" />
          <span className="text-xl font-bold">FitTrack</span>
        </Link>
        <nav className="hidden md:flex">
          <ul className="flex items-center space-x-8">
            <li>
              <Link 
                to="/" 
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  isActive('/') 
                    ? 'text-fitness-primary bg-blue-50' 
                    : 'hover:text-fitness-primary'
                }`}
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/exercises" 
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  isActive('/exercises') 
                    ? 'text-fitness-primary bg-blue-50' 
                    : 'hover:text-fitness-primary'
                }`}
              >
                <BarChart className="w-4 h-4 mr-2" />
                Stats
              </Link>
            </li>
            <li>
              <Link 
                to="/history" 
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  isActive('/history') 
                    ? 'text-fitness-primary bg-blue-50' 
                    : 'hover:text-fitness-primary'
                }`}
              >
                <History className="w-4 h-4 mr-2" />
                History
              </Link>
            </li>
            <li>
              <Link 
                to="/leaderboard" 
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  isActive('/leaderboard') 
                    ? 'text-fitness-primary bg-blue-50' 
                    : 'hover:text-fitness-primary'
                }`}
              >
                <Trophy className="w-4 h-4 mr-2" />
                Leaderboard
              </Link>
            </li>
            <li>
              <Link 
                to="/workout-calendar" 
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  isActive('/workout-calendar') 
                    ? 'text-fitness-primary bg-blue-50' 
                    : 'hover:text-fitness-primary'
                }`}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Workout Plan
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex md:hidden">
          {/* Mobile menu will go here if needed */}
        </div>
      </div>
    </header>
  );
};
