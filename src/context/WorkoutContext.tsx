
import React, { createContext, useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { WorkoutProgressEntry } from '@/types/workout';
import { toast } from '@/components/ui/sonner';
import { workoutSchedule } from '@/data/workoutPlan';

interface WorkoutContextType {
  workoutProgress: WorkoutProgressEntry[];
  toggleExerciseCompletion: (date: Date, exerciseName: string) => void;
  getCompletedExercises: (date: Date) => string[];
  isExerciseCompleted: (date: Date, exerciseName: string) => boolean;
  addExerciseToWorkout: (exerciseName: string, date?: Date) => void;
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

  const isExerciseCompleted = (date: Date, exerciseName: string): boolean => {
    const completedExercises = getCompletedExercises(date);
    return completedExercises.includes(exerciseName);
  };

  // Find a matching activity or exercise in the workout schedule
  const findMatchingWorkoutItem = (name: string, dayType: number = new Date().getDay()): string | null => {
    const nameLower = name.toLowerCase();
    
    // First, try all days to find an exact match
    for (let i = 0; i < 7; i++) {
      const day = workoutSchedule[i];
      
      // Check exercises
      const matchingExercise = day.exercises.find(ex => 
        ex.name.toLowerCase() === nameLower || ex.name.toLowerCase().includes(nameLower)
      );
      
      if (matchingExercise) return matchingExercise.name;
      
      // Check activities
      if (day.activities) {
        const matchingActivity = day.activities.find(act => 
          act.name.toLowerCase() === nameLower || act.name.toLowerCase().includes(nameLower)
        );
        
        if (matchingActivity) return matchingActivity.name;
      }
    }
    
    // If no exact match found, try to find a partial match for the specific day
    const currentDay = workoutSchedule[dayType];
    
    if (nameLower.includes('cycling') || nameLower.includes('cycle')) {
      // Check specific matches for cycling-related activities
      if (nameLower.includes('light')) {
        const lightActivityMatch = currentDay.activities?.find(act => 
          act.name.toLowerCase().includes('light') && act.name.toLowerCase().includes('cycling')
        );
        
        if (lightActivityMatch) return lightActivityMatch.name;
        
        // Try other days for light cycling
        for (let i = 0; i < 7; i++) {
          if (i === dayType) continue;
          
          const day = workoutSchedule[i];
          const lightCycleMatch = day.activities?.find(act => 
            act.name.toLowerCase().includes('light') && act.name.toLowerCase().includes('cycling')
          );
          
          if (lightCycleMatch) return lightCycleMatch.name;
        }
      } else {
        // Regular cycling
        const cyclingMatch = currentDay.exercises.find(ex => ex.name.toLowerCase() === 'cycling');
        if (cyclingMatch) return cyclingMatch.name;
        
        // Try other days
        for (let i = 0; i < 7; i++) {
          if (i === dayType) continue;
          
          const day = workoutSchedule[i];
          const cyclingMatch = day.exercises.find(ex => ex.name.toLowerCase() === 'cycling');
          
          if (cyclingMatch) return cyclingMatch.name;
        }
      }
    }
    
    // Return original name if no match found
    return null;
  };

  // Enhanced function to add an exercise to the workout calendar
  const addExerciseToWorkout = (exerciseName: string, date: Date = new Date()) => {
    const dayType = date.getDay();
    
    // Try to find a matching exercise or activity in the workout schedule
    const normalizedName = findMatchingWorkoutItem(exerciseName, dayType) || exerciseName;
    
    // If the exercise isn't already completed, mark it as completed
    if (!isExerciseCompleted(date, normalizedName)) {
      toggleExerciseCompletion(date, normalizedName);
      console.log(`Added exercise: ${exerciseName} → normalized to: ${normalizedName}`);
    }
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
      getCompletedExercises,
      isExerciseCompleted,
      addExerciseToWorkout
    }}>
      {children}
    </WorkoutContext.Provider>
  );
};
