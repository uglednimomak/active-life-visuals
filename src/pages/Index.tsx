
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ExerciseForm } from '@/components/exercise/ExerciseForm';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentExercises } from '@/components/dashboard/RecentExercises';
import { ActivityChart } from '@/components/dashboard/ActivityChart';
import { useExercises } from '@/context/ExerciseContext';
import { Activity, BarChart, Calendar, Dumbbell } from 'lucide-react';

const Index = () => {
  const { stats } = useExercises();
  
  return (
    <div className="min-h-screen bg-fitness-background">
      <Navbar />
      
      <main className="container px-4 py-8 mx-auto">
        <h1 className="mb-6 text-3xl font-bold tracking-tight">Fitness Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="grid gap-6 mb-6 dashboard-grid">
              <StatsCard 
                title="Total Exercises" 
                value={stats.totalExercises} 
                icon={<Activity />}
                className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
              />
              <StatsCard 
                title="Total Reps/Sets" 
                value={stats.totalCount} 
                icon={<BarChart />}
                className="bg-gradient-to-br from-green-50 to-green-100 border-green-200"
              />
              <StatsCard 
                title="Daily Average" 
                value={stats.averagePerDay} 
                description="Exercises per day"
                icon={<Calendar />}
                className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
              />
              <StatsCard 
                title="Most Frequent" 
                value={stats.mostFrequent?.name || 'None'} 
                description={stats.mostFrequent ? `${stats.mostFrequent.count} times` : 'No exercises yet'}
                icon={<Dumbbell />}
                className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200"
              />
            </div>
            
            <ActivityChart />
          </div>
          
          <div className="space-y-6 md:col-span-1">
            <ExerciseForm />
          </div>
        </div>
        
        <div className="mt-6">
          <RecentExercises />
        </div>
      </main>
    </div>
  );
};

export default Index;
