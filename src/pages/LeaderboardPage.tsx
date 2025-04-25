
import React from 'react';
import { useExercises } from '@/context/ExerciseContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const LeaderboardPage = () => {
  const { exercises } = useExercises();

  // Calculate total counts for each exercise
  const exerciseTotals = exercises.reduce((acc, exercise) => {
    const name = exercise.name;
    acc[name] = (acc[name] || 0) + exercise.count;
    return acc;
  }, {} as Record<string, number>);

  // Convert to array and sort by count
  const sortedExercises = Object.entries(exerciseTotals)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              Exercise Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sortedExercises.length === 0 ? (
              <div className="text-center text-muted-foreground p-6">
                No data to display
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Exercise</TableHead>
                    <TableHead className="text-right">Total Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedExercises.map((exercise, index) => (
                    <TableRow key={exercise.name}>
                      <TableCell className="font-medium">#{index + 1}</TableCell>
                      <TableCell>{exercise.name}</TableCell>
                      <TableCell className="text-right">{exercise.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default LeaderboardPage;
