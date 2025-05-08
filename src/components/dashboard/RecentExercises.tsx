
import React from 'react';
import { useExercises } from '@/context/ExerciseContext';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';

export const RecentExercises = () => {
  const { exercises } = useExercises();
  
  // Get the 5 most recent exercises
  const recentExercises = [...exercises]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  return (
    <Card className="col-span-full animate-fade-in">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        {recentExercises.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exercise</TableHead>
                <TableHead className="text-right">Count</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden sm:table-cell">Person</TableHead>
                <TableHead>When</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentExercises.map((exercise) => (
                <TableRow key={exercise.id}>
                  <TableCell className="font-medium">{exercise.name}</TableCell>
                  <TableCell className="text-right">{exercise.count}</TableCell>
                  <TableCell className="hidden capitalize md:table-cell">{exercise.category || '-'}</TableCell>
                  <TableCell className="hidden sm:table-cell">{exercise.personName || '-'}</TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(exercise.timestamp), { addSuffix: true })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-muted-foreground">No exercises recorded yet</p>
        )}
      </CardContent>
    </Card>
  );
};
