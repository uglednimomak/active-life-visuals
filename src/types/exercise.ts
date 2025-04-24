export interface Exercise {
  id: string;
  name: string;
  count: number;
  timestamp: string;
  category?: string;
  personName?: string;
}

export type ExerciseCategory = 'cardio' | 'strength' | 'flexibility' | 'balance' | 'other';

export interface ExerciseStats {
  totalExercises: number;
  totalCount: number;
  averagePerDay: number;
  mostFrequent: {
    name: string;
    count: number;
  } | null;
}
