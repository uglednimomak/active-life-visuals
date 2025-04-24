
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ExerciseList } from '@/components/history/ExerciseList';

const HistoryPage = () => {
  return (
    <div className="min-h-screen bg-fitness-background">
      <Navbar />
      
      <main className="container px-4 py-8 mx-auto">
        <h1 className="mb-6 text-3xl font-bold tracking-tight">Exercise History</h1>
        
        <ExerciseList />
      </main>
    </div>
  );
};

export default HistoryPage;
