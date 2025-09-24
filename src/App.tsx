import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Theme Provider
import { ThemeProvider } from "./components/ThemeProvider";

// Pages
import EnhancedLandingPage from "./components/EnhancedLandingPage";
import AuthForm from "./components/AuthForm";
import EnhancedPainPage from "./components/EnhancedPainPage";
import SleepPage from "./pages/SleepPage";
import NutritionPage from "./pages/NutritionPage";
import MentalHealthPage from "./pages/MentalHealthPage";
import RiskPage from "./pages/RiskPage";
import CommunityPage from "./pages/CommunityPage";
import NotFound from "./pages/NotFound";

// Components
import BottomNavigation from "./components/BottomNavigation";
import Header from "./components/Header";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (email: string, password: string, isSignUp: boolean) => {
    // Here you would typically call Supabase auth
    console.log("Auth attempt:", { email, isSignUp });
    
    // Simulate authentication
    setIsAuthenticated(true);
    setShowAuth(false);
  };

  const handleGetStarted = () => {
    setShowAuth(true);
    setIsSignUp(true);
  };

  const handleSignIn = () => {
    setShowAuth(true);
    setIsSignUp(false);
  };

  const handleBackToLanding = () => {
    setIsAuthenticated(false);
    setShowAuth(false);
  };

  if (showAuth) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="sync-ui-theme">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AuthForm
              isSignUp={isSignUp}
              onToggleMode={() => setIsSignUp(!isSignUp)}
              onAuth={handleAuth}
            />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="sync-ui-theme">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <div onClick={handleGetStarted}>
              <EnhancedLandingPage />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="sync-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Header onLogoClick={handleBackToLanding} />
              <Routes>
                <Route path="/" element={<Navigate to="/pain" replace />} />
                <Route path="/pain" element={<EnhancedPainPage />} />
                <Route path="/sleep" element={<SleepPage />} />
                <Route path="/nutrition" element={<NutritionPage />} />
                <Route path="/mental" element={<MentalHealthPage />} />
                <Route path="/risk" element={<RiskPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <BottomNavigation />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;