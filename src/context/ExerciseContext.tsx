
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Exercise, ExerciseStats } from '../types/exercise';
import { toast } from '@/components/ui/sonner';

interface ExerciseContextType {
  exercises: Exercise[];
  addExercise: (exercise: Omit<Exercise, 'id'>) => void;
  deleteExercise: (id: string) => void;
  updateExercise: (id: string, exercise: Partial<Exercise>) => void;
  stats: ExerciseStats;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

export const useExercises = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error('useExercises must be used within an ExerciseProvider');
  }
  return context;
};

export const ExerciseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [exercises, setExercises] = useState<Exercise[]>(() => {
    const savedExercises = localStorage.getItem('fitness-tracker-exercises');
    return savedExercises ? JSON.parse(savedExercises) : [];
  });

  const [stats, setStats] = useState<ExerciseStats>({
    totalExercises: 0,
    totalCount: 0,
    averagePerDay: 0,
    mostFrequent: null,
  });

  useEffect(() => {
    localStorage.setItem('fitness-tracker-exercises', JSON.stringify(exercises));
    calculateStats();
  }, [exercises]);

  const calculateStats = () => {
    if (exercises.length === 0) {
      setStats({
        totalExercises: 0,
        totalCount: 0,
        averagePerDay: 0,
        mostFrequent: null,
      });
      return;
    }

    // Calculate total counts
    const totalCount = exercises.reduce((sum, exercise) => sum + exercise.count, 0);
    
    // Calculate exercise frequency
    const exerciseFrequency: Record<string, number> = {};
    exercises.forEach(exercise => {
      exerciseFrequency[exercise.name] = (exerciseFrequency[exercise.name] || 0) + 1;
    });
    
    // Find most frequent exercise
    let mostFrequentName = '';
    let highestFrequency = 0;
    
    Object.entries(exerciseFrequency).forEach(([name, frequency]) => {
      if (frequency > highestFrequency) {
        mostFrequentName = name;
        highestFrequency = frequency;
      }
    });
    
    // Calculate exercises per day
    const days = new Set(exercises.map(e => new Date(e.timestamp).toDateString())).size;
    const averagePerDay = days > 0 ? exercises.length / days : exercises.length;
    
    setStats({
      totalExercises: exercises.length,
      totalCount: totalCount,
      averagePerDay: parseFloat(averagePerDay.toFixed(1)),
      mostFrequent: highestFrequency > 0 ? {
        name: mostFrequentName,
        count: highestFrequency
      } : null,
    });
  };

  const addExercise = (exercise: Omit<Exercise, 'id'>) => {
    const newExercise: Exercise = {
      ...exercise,
      id: crypto.randomUUID(),
    };
    setExercises(prev => [...prev, newExercise]);
    toast.success('Exercise added successfully');
  };

  const deleteExercise = (id: string) => {
    setExercises(prev => prev.filter(exercise => exercise.id !== id));
    toast.success('Exercise deleted');
  };

  const updateExercise = (id: string, updatedFields: Partial<Exercise>) => {
    setExercises(prev =>
      prev.map(exercise =>
        exercise.id === id ? { ...exercise, ...updatedFields } : exercise
      )
    );
    toast.success('Exercise updated');
  };

  return (
    <ExerciseContext.Provider value={{ exercises, addExercise, deleteExercise, updateExercise, stats }}>
      {children}
    </ExerciseContext.Provider>
  );
};
