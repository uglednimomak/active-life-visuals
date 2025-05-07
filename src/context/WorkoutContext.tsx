
import React, { createContext, useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { WorkoutProgressEntry } from '@/types/workout';
import { toast } from '@/components/ui/sonner';

interface WorkoutContextType {
  workoutProgress: WorkoutProgressEntry[];
  toggleExerciseCompletion: (date: Date, exerciseName: string) => void;
  getCompletedExercises: (date: Date) => string[];
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workoutProgress, setWorkoutProgress] = useState<WorkoutProgressEntry[]>(() => {
    const savedProgress = localStorage.getItem('fitness-tracker-workout-progress');
    return savedProgress ? JSON.parse(savedProgress) : [];
  });

  useEffect(() => {
    localStorage.setItem('fitness-tracker-workout-progress', JSON.stringify(workoutProgress));
  }, [workoutProgress]);

  const getCompletedExercises = (date: Date): string[] => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const entry = workoutProgress.find(entry => entry.date === dateStr);
    return entry ? entry.completedExercises : [];
  };

  const toggleExerciseCompletion = (date: Date, exerciseName: string) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayType = date.getDay(); // 0-6
    
    setWorkoutProgress(prev => {
      // Find if we have an existing entry for this date
      const existingEntryIndex = prev.findIndex(entry => entry.date === dateStr);
      
      if (existingEntryIndex >= 0) {
        // We have an entry, update it
        const entry = prev[existingEntryIndex];
        const isCompleted = entry.completedExercises.includes(exerciseName);
        
        const newCompletedExercises = isCompleted
          ? entry.completedExercises.filter(name => name !== exerciseName)
          : [...entry.completedExercises, exerciseName];
        
        const newEntry = {
          ...entry,
          completedExercises: newCompletedExercises
        };
        
        const newProgress = [...prev];
        newProgress[existingEntryIndex] = newEntry;
        
        // Show toast message
        if (isCompleted) {
          toast.info(`Marked "${exerciseName}" as incomplete`);
        } else {
          toast.success(`Completed "${exerciseName}"`);
        }
        
        return newProgress;
      } else {
        // Create a new entry
        const newEntry = {
          date: dateStr,
          dayType,
          completedExercises: [exerciseName]
        };
        
        toast.success(`Completed "${exerciseName}"`);
        
        return [...prev, newEntry];
      }
    });
  };

  return (
    <WorkoutContext.Provider value={{ 
      workoutProgress, 
      toggleExerciseCompletion, 
      getCompletedExercises 
    }}>
      {children}
    </WorkoutContext.Provider>
  );
};
