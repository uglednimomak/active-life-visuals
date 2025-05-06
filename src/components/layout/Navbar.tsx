
import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, BarChart, History, Home, Trophy } from 'lucide-react';

export const Navbar = () => {
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
              <Link to="/" className="flex items-center px-3 py-2 text-sm font-medium transition-colors rounded-md hover:text-fitness-primary">
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/exercises" className="flex items-center px-3 py-2 text-sm font-medium transition-colors rounded-md hover:text-fitness-primary">
                <BarChart className="w-4 h-4 mr-2" />
                Stats
              </Link>
            </li>
            <li>
              <Link to="/history" className="flex items-center px-3 py-2 text-sm font-medium transition-colors rounded-md hover:text-fitness-primary">
                <History className="w-4 h-4 mr-2" />
                History
              </Link>
            </li>
            <li>
              <Link to="/leaderboard" className="flex items-center px-3 py-2 text-sm font-medium transition-colors rounded-md hover:text-fitness-primary">
                <Trophy className="w-4 h-4 mr-2" />
                Leaderboard
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
