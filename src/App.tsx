
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ExerciseProvider } from "./context/ExerciseContext";
import { WorkoutProvider } from "./context/WorkoutContext";
import Index from "./pages/Index";
import ExercisesPage from "./pages/ExercisesPage";
import HistoryPage from "./pages/HistoryPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import WorkoutCalendarPage from "./pages/WorkoutCalendarPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ExerciseProvider>
        <WorkoutProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/exercises" element={<ExercisesPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/workout-calendar" element={<WorkoutCalendarPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </WorkoutProvider>
      </ExerciseProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
