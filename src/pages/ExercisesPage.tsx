
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ExerciseStats } from '@/components/stats/ExerciseStats';

const ExercisesPage = () => {
  return (
    <div className="min-h-screen bg-fitness-background">
      <Navbar />
      
      <main className="container px-4 py-8 mx-auto">
        <h1 className="mb-6 text-3xl font-bold tracking-tight">Exercise Statistics</h1>
        
        <ExerciseStats />
      </main>
    </div>
  );
};

export default ExercisesPage;
