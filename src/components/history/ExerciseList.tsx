
import React, { useState } from 'react';
import { useExercises } from '@/context/ExerciseContext';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const ExerciseList = () => {
  const { exercises, deleteExercise } = useExercises();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  const filteredExercises = exercises
    .filter(exercise => 
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      (categoryFilter ? exercise.category === categoryFilter : true)
    )
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Exercise History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4 mb-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full md:w-1/4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="cardio">Cardio</SelectItem>
                <SelectItem value="strength">Strength</SelectItem>
                <SelectItem value="flexibility">Flexibility</SelectItem>
                <SelectItem value="balance">Balance</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredExercises.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exercise</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="text-right">Count</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExercises.map((exercise) => (
                  <TableRow key={exercise.id}>
                    <TableCell className="font-medium">{exercise.name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(new Date(exercise.timestamp), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>{format(new Date(exercise.timestamp), 'hh:mm a')}</TableCell>
                    <TableCell className="text-right">{exercise.count}</TableCell>
                    <TableCell className="hidden capitalize md:table-cell">
                      {exercise.category || '-'}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteExercise(exercise.id)}
                        className="h-8 w-8 p-0"
                      >
                        <span className="sr-only">Delete</span>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="py-12 text-center text-muted-foreground">
            <p>No exercises found.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
