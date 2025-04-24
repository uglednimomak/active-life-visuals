
import React, { useState } from 'react';
import { useExercises } from '@/context/ExerciseContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const ExerciseForm = () => {
  const { addExercise } = useExercises();
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseCount, setExerciseCount] = useState('');
  const [exerciseCategory, setExerciseCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!exerciseName.trim() || !exerciseCount.trim()) {
      return;
    }

    addExercise({
      name: exerciseName,
      count: parseInt(exerciseCount, 10),
      timestamp: new Date().toISOString(),
      category: exerciseCategory || undefined,
    });

    // Clear form
    setExerciseName('');
    setExerciseCount('');
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Add Exercise</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="exercise-name">Exercise Name</Label>
            <Input
              id="exercise-name"
              placeholder="e.g., Push-ups, Running, Squats"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="exercise-count">Count / Reps</Label>
            <Input
              id="exercise-count"
              type="number"
              placeholder="Number of reps or duration"
              value={exerciseCount}
              onChange={(e) => setExerciseCount(e.target.value)}
              min="1"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="exercise-category">Category (Optional)</Label>
            <Select value={exerciseCategory} onValueChange={setExerciseCategory}>
              <SelectTrigger id="exercise-category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardio">Cardio</SelectItem>
                <SelectItem value="strength">Strength</SelectItem>
                <SelectItem value="flexibility">Flexibility</SelectItem>
                <SelectItem value="balance">Balance</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" className="w-full bg-fitness-primary hover:bg-fitness-primary/90">
            <Plus className="w-4 h-4 mr-2" /> Add Exercise
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
