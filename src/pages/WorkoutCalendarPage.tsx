
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { WorkoutCalendar } from '@/components/workout/WorkoutCalendar';
import { WorkoutDayDetails } from '@/components/workout/WorkoutDayDetails';

const WorkoutCalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen bg-fitness-background">
      <Navbar />
      
      <main className="container px-4 py-8 mx-auto">
        <h1 className="mb-6 text-3xl font-bold tracking-tight">Workout Calendar</h1>
        
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-5 lg:col-span-4">
            <WorkoutCalendar 
              selectedDate={selectedDate} 
              onDateSelect={setSelectedDate} 
            />
          </div>
          <div className="md:col-span-7 lg:col-span-8">
            <WorkoutDayDetails 
              date={selectedDate} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkoutCalendarPage;
