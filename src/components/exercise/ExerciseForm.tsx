
import React, { useState } from 'react';
import { useExercises } from '@/context/ExerciseContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, CalendarIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export const ExerciseForm = () => {
  const { addExercise } = useExercises();
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseCount, setExerciseCount] = useState('');
  const [exerciseCategory, setExerciseCategory] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!exerciseName.trim() || !exerciseCount.trim()) {
      return;
    }

    const timestamp = date ? date.toISOString() : new Date().toISOString();

    addExercise({
      name: exerciseName,
      count: parseInt(exerciseCount, 10),
      timestamp: timestamp,
      category: exerciseCategory || undefined,
    });

    // Clear form
    setExerciseName('');
    setExerciseCount('');
    setDate(undefined);
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
            <Label htmlFor="exercise-date">Date (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="exercise-date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
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
