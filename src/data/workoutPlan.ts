
import { WorkoutSchedule } from "@/types/workout";

export const workoutSchedule: WorkoutSchedule = {
  0: { // Day 1: Upper Body Focus
    title: "Upper Body Focus",
    description: "Focus on strengthening chest, shoulders, arms, and core.",
    exercises: [
      { name: "Standard Push-ups", sets: 3, reps: "12-15 reps" },
      { name: "Wide-grip Push-ups", sets: 3, reps: "10-12 reps" },
      { name: "Diamond Push-ups", sets: 2, reps: "8-10 reps" },
      { name: "Running Man", sets: 3, duration: "45 seconds" },
      { name: "Burpees", sets: 3, reps: "10 reps" },
      { name: "Punching Bag - Straight punches", sets: 3, duration: "30 seconds" },
      { name: "Punching Bag - Hooks/uppercuts", sets: 3, duration: "30 seconds" },
      { name: "Punching Bag - Combinations", sets: 3, duration: "30 seconds" },
      { name: "Punching Bag - Power shots", sets: 3, duration: "30 seconds" },
    ],
  },
  1: { // Day 2: Lower Body Focus
    title: "Lower Body Focus",
    description: "Focus on strengthening legs and lower body.",
    exercises: [
      { name: "Bodyweight Squats", sets: 3, reps: "15-20 reps" },
      { name: "Dumbbell Squats", sets: 3, reps: "12-15 reps" },
      { name: "Lunges (each leg)", sets: 3, reps: "10-12 reps" },
      { name: "Running Man", sets: 3, duration: "45 seconds" },
      { name: "Cycling", sets: 1, duration: "15-20 minutes" },
    ],
  },
  2: { // Day 3: Rest or Light Activity
    title: "Rest or Light Activity",
    description: "Active recovery day to help your muscles recover.",
    exercises: [],
    activities: [
      { name: "Light Cycling (optional)", duration: "20-30 minutes" },
      { name: "Stretching/Mobility Work", duration: "15-20 minutes" },
    ],
  },
  3: { // Day 4: Full Body
    title: "Full Body",
    description: "Comprehensive workout targeting all major muscle groups.",
    exercises: [
      { name: "Push-ups (variation of choice)", sets: 3, reps: "12-15 reps" },
      { name: "Burpees", sets: 4, reps: "8-10 reps" },
      { name: "Dumbbell Squats", sets: 3, reps: "12-15 reps" },
      { name: "Lunges (each leg)", sets: 3, reps: "10 reps" },
      { name: "Running Man", sets: 4, duration: "30 seconds" },
      { name: "Punching Bag - Jab-cross combos", sets: 3, duration: "30 seconds" },
      { name: "Punching Bag - Body-head combinations", sets: 3, duration: "30 seconds" },
      { name: "Punching Bag - Speed work", sets: 3, duration: "30 seconds" },
      { name: "Punching Bag - Power combinations", sets: 3, duration: "30 seconds" },
    ],
  },
  4: { // Day 5: Active Recovery
    title: "Active Recovery",
    description: "Light exercise to promote recovery while maintaining activity.",
    exercises: [
      { name: "Cycling", sets: 1, duration: "25-30 minutes" },
      { name: "Light Bodyweight Squats", sets: 2, reps: "15 reps" },
      { name: "Light Punching Bag - Shadow boxing", sets: 1, duration: "1 minute" },
      { name: "Light Punching Bag - Technical punches", sets: 1, duration: "1 minute" },
    ],
  },
  5: { // Day 6: Rest Day
    title: "Rest Day",
    description: "Give your body time to recover and rebuild.",
    exercises: [],
    activities: [
      { name: "Light Stretching", duration: "10-15 minutes" },
      { name: "Walking (optional)", duration: "20-30 minutes" },
    ],
  },
  6: { // Day 7: Rest Day
    title: "Rest Day",
    description: "Give your body time to recover and rebuild.",
    exercises: [],
    activities: [
      { name: "Light Stretching", duration: "10-15 minutes" },
      { name: "Walking (optional)", duration: "20-30 minutes" },
    ],
  },
};
