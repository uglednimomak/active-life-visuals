
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useExercises } from '@/context/ExerciseContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { format, subDays, isWithinInterval, startOfDay } from 'date-fns';

export const ActivityChart = () => {
  const { exercises } = useExercises();

  const chartData = useMemo(() => {
    const today = new Date();
    const dayLabels = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(today, 6 - i);
      return {
        date,
        name: format(date, 'EEE'),
        fullDate: format(date, 'MMM d'),
      };
    });

    return dayLabels.map(({ date, name, fullDate }) => {
      const dayStart = startOfDay(date);
      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);

      const dayExercises = exercises.filter(exercise => 
        isWithinInterval(new Date(exercise.timestamp), { start: dayStart, end: dayEnd })
      );

      const count = dayExercises.reduce((sum, ex) => sum + ex.count, 0);
      const total = dayExercises.length;

      return {
        name,
        fullDate,
        count,
        total,
      };
    });
  }, [exercises]);

  return (
    <Card className="col-span-full lg:col-span-2 animate-fade-in">
      <CardHeader>
        <CardTitle>7-Day Activity</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        {exercises.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [value, name === 'count' ? 'Total Reps' : 'Exercise Count']}
                labelFormatter={(label: string, data: any) => data[0]?.payload?.fullDate || label}
              />
              <Legend formatter={(value) => value === 'count' ? 'Total Reps' : 'Exercise Count'} />
              <Bar dataKey="count" name="count" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="total" name="total" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-center text-muted-foreground">No data to display</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
