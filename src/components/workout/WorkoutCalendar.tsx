
import React from 'react';
import { format, addDays, startOfYear, isSameDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { useWorkout } from '@/context/WorkoutContext';
import { workoutSchedule } from '@/data/workoutPlan';

interface WorkoutCalendarProps {
  selectedDate?: Date;
  onDateSelect: (date: Date | undefined) => void;
}

export const WorkoutCalendar = ({ selectedDate, onDateSelect }: WorkoutCalendarProps) => {
  const { getCompletedExercises } = useWorkout();
  
  // Helper function to get the workout day type for any date
  const getWorkoutDayType = (date: Date): number => {
    // Calculate based on rotation starting today
    const today = new Date();
    const dayDiff = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    // Calculate the first day of the rotation (today)
    // Then add dayDiff and mod by 7 to get the workout day type
    return ((today.getDay() + dayDiff) % 7 + 7) % 7;
  };

  // Custom day renderer for the calendar
  const dayRenderer = (date: Date) => {
    const dayType = getWorkoutDayType(date);
    const workoutDay = workoutSchedule[dayType];
    const completedExercises = getCompletedExercises(date);
    
    // Calculate workout completion status
    let completionStatus = 'not-started';
    if (workoutDay.exercises.length === 0 && (!workoutDay.activities || workoutDay.activities.length === 0)) {
      completionStatus = 'rest-day';
    } else {
      const totalItems = (workoutDay.exercises?.length || 0) + (workoutDay.activities?.length || 0);
      if (totalItems > 0 && completedExercises.length > 0) {
        completionStatus = completedExercises.length >= totalItems ? 'completed' : 'partial';
      }
    }
    
    return (
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <span className="text-sm">{format(date, 'd')}</span>
        <div className="mt-1 text-xs font-medium">
          {workoutDay.title.split(' ')[0]}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1">
          {completionStatus === 'completed' && <div className="w-full h-full bg-green-500"></div>}
          {completionStatus === 'partial' && <div className="w-full h-full bg-amber-500"></div>}
          {completionStatus === 'rest-day' && <div className="w-full h-full bg-blue-300"></div>}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-xl font-semibold">Your Workout Plan</h2>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onDateSelect}
        className="calendar" // Remove pointer-events-auto class to fix the issue
        fromDate={startOfYear(new Date())} // Allow selecting from the start of year
        toDate={addDays(new Date(), 365)} // Show one year ahead
        components={{
          Day: ({ date }) => dayRenderer(date)
        }}
      />
      <div className="flex flex-col gap-2 mt-4">
        <div className="text-sm font-medium">Legend:</div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500"></div>
          <span className="text-sm">Workout Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-500"></div>
          <span className="text-sm">Partially Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-300"></div>
          <span className="text-sm">Rest Day</span>
        </div>
      </div>
    </div>
  );
};
