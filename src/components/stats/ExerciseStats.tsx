
import React from 'react';
import { useExercises } from '@/context/ExerciseContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export const ExerciseStats = () => {
  const { exercises } = useExercises();

  // Group exercises by category
  const categoryData = React.useMemo(() => {
    const categories: Record<string, number> = {};
    exercises.forEach((exercise) => {
      const category = exercise.category || 'uncategorized';
      categories[category] = (categories[category] || 0) + 1;
    });

    return Object.entries(categories).map(([name, value]) => ({
      name: name === 'uncategorized' ? 'Uncategorized' : name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }));
  }, [exercises]);

  // Group exercises by name
  const exerciseData = React.useMemo(() => {
    const exerciseCounts: Record<string, number> = {};
    exercises.forEach((exercise) => {
      exerciseCounts[exercise.name] = (exerciseCounts[exercise.name] || 0) + exercise.count;
    });

    return Object.entries(exerciseCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Top 5 exercises
  }, [exercises]);

  const COLORS = ['#4F46E5', '#10B981', '#3B82F6', '#F59E0B', '#EC4899', '#8B5CF6', '#6366F1'];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Exercise Categories</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip formatter={(value) => [`${value} exercises`, 'Count']} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-center text-muted-foreground">No data to display</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Exercises</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {exerciseData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={exerciseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {exerciseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip formatter={(value) => [`${value} reps/sets`, 'Count']} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-center text-muted-foreground">No data to display</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
