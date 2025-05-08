
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart, History, Home, Trophy, Calendar, Menu, HeartPulse } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    return currentPath === path;
  };

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: <Home className="w-4 h-4 mr-2" /> },
    { path: '/exercises', label: 'Stats', icon: <BarChart className="w-4 h-4 mr-2" /> },
    { path: '/history', label: 'History', icon: <History className="w-4 h-4 mr-2" /> },
    { path: '/leaderboard', label: 'Leaderboard', icon: <Trophy className="w-4 h-4 mr-2" /> },
    { path: '/workout-calendar', label: 'Workout Plan', icon: <Calendar className="w-4 h-4 mr-2" /> },
  ];

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/6fde9416-285b-4e7f-9a71-d9448c14ba6f.png" 
              alt="FitTrack Logo" 
              className="h-8"
            />
          </div>
        </Link>
        
        <nav className="hidden md:flex">
          <ul className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={`flex items-center px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                    isActive(link.path) 
                      ? 'text-fitness-primary bg-blue-50' 
                      : 'hover:text-fitness-primary'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="flex md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-2 rounded-md hover:bg-gray-100" aria-label="Open menu">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <div className="flex items-center space-x-2">
                    <img 
                      src="/lovable-uploads/6fde9416-285b-4e7f-9a71-d9448c14ba6f.png" 
                      alt="FitTrack Logo" 
                      className="h-8"
                    />
                  </div>
                </div>
                <nav className="flex-1">
                  <ul className="p-2 space-y-1">
                    {navLinks.map((link) => (
                      <li key={link.path}>
                        <Link 
                          to={link.path} 
                          className={`flex items-center w-full px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                            isActive(link.path) 
                              ? 'text-fitness-primary bg-blue-50' 
                              : 'hover:text-fitness-primary hover:bg-gray-50'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {link.icon}
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
