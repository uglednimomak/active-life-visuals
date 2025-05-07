
import React from 'react';
import { format } from 'date-fns';
import { CheckCircle, Circle, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { workoutSchedule } from '@/data/workoutPlan';
import { useWorkout } from '@/context/WorkoutContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface WorkoutDayDetailsProps {
  date?: Date;
}

export const WorkoutDayDetails = ({ date }: WorkoutDayDetailsProps) => {
  const { toggleExerciseCompletion, getCompletedExercises } = useWorkout();
  
  if (!date) return null;
  
  // Get workout day type for the selected date
  const getWorkoutDayType = (date: Date): number => {
    const today = new Date();
    const dayDiff = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return ((today.getDay() + dayDiff) % 7 + 7) % 7;
  };

  const dayType = getWorkoutDayType(date);
  const workoutDay = workoutSchedule[dayType];
  const completedExercises = getCompletedExercises(date);
  
  const handleToggleComplete = (exerciseName: string) => {
    if (date) {
      toggleExerciseCompletion(date, exerciseName);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{format(date, 'EEEE, MMMM d, yyyy')}</h2>
        <p className="text-gray-500">
          Workout Day: {workoutDay.title}
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{workoutDay.title}</CardTitle>
          <CardDescription>{workoutDay.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {workoutDay.exercises && workoutDay.exercises.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-4 text-lg font-semibold">Exercises</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-2 py-2 text-left">Exercise</th>
                      <th className="px-2 py-2 text-center">Sets</th>
                      <th className="px-2 py-2 text-center">Reps/Duration</th>
                      <th className="px-2 py-2 text-center">Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workoutDay.exercises.map((exercise, index) => {
                      const isCompleted = completedExercises.includes(exercise.name);
                      return (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="px-2 py-3">{exercise.name}</td>
                          <td className="px-2 py-3 text-center">{exercise.sets || '-'}</td>
                          <td className="px-2 py-3 text-center">{exercise.reps || exercise.duration || '-'}</td>
                          <td className="px-2 py-3 text-center">
                            <div className="flex items-center justify-center">
                              <Checkbox
                                id={`exercise-${index}`}
                                checked={isCompleted}
                                onCheckedChange={() => handleToggleComplete(exercise.name)}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {workoutDay.activities && workoutDay.activities.length > 0 && (
            <div>
              <h3 className="mb-4 text-lg font-semibold">Additional Activities</h3>
              <div className="space-y-2">
                {workoutDay.activities.map((activity, index) => {
                  const isCompleted = completedExercises.includes(activity.name);
                  return (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`activity-${index}`}
                          checked={isCompleted}
                          onCheckedChange={() => handleToggleComplete(activity.name)}
                        />
                        <Label htmlFor={`activity-${index}`} className="text-sm font-medium">
                          {activity.name}
                        </Label>
                      </div>
                      <span className="text-sm text-gray-500">{activity.duration}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {workoutDay.exercises.length === 0 && (!workoutDay.activities || workoutDay.activities.length === 0) && (
            <div className="py-8 text-center text-gray-500">
              <p>Rest day. No scheduled exercises.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Progression Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-2 text-left">Timeline</th>
                  <th className="px-4 py-2 text-left">Adjustment</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-2">Weeks 1-2</td>
                  <td className="px-4 py-2">Focus on proper form and technique</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-2">Weeks 3-4</td>
                  <td className="px-4 py-2">Increase reps by 1-2 per set</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-2">Weeks 5-6</td>
                  <td className="px-4 py-2">Add 1 set to key exercises</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-2">Weeks 7-8</td>
                  <td className="px-4 py-2">Increase intensity (speed/resistance)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-6">
            <h3 className="mb-2 text-lg font-medium">Notes:</h3>
            <ul className="pl-5 list-disc text-sm text-gray-600">
              <li>Always start with a 5-minute warm-up (light cardio and dynamic stretching)</li>
              <li>End with a 5-minute cool down and static stretching</li>
              <li>Stay hydrated throughout workouts</li>
              <li>Listen to your body and rest when needed</li>
              <li>Take progress photos every 2-3 weeks to track changes</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
