
export interface WorkoutExercise {
  name: string;
  sets?: number;
  reps?: string;
  duration?: string;
  isCompleted?: boolean;
}

export interface WorkoutActivity {
  name: string;
  duration: string;
  isCompleted?: boolean;
}

export interface WorkoutDay {
  title: string;
  description: string;
  exercises: WorkoutExercise[];
  activities?: WorkoutActivity[];
}

export type WorkoutSchedule = {
  [key: number]: WorkoutDay; // 0-6 for days of the week
};

export interface WorkoutProgressEntry {
  date: string; // ISO string format
  dayType: number; // 0-6 for workout type
  completedExercises: string[]; // Array of exercise names that were completed
}
