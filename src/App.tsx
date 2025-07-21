
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import About from "./pages/About";
import Library from "./pages/Library";
import CreateEpisode from "./pages/CreateEpisode";
import EpisodeDetail from "./pages/EpisodeDetail";
import NotFound from "./pages/NotFound";
import VideoEpisode from "./pages/VideoEpisode";
import Avatar from "./pages/Avatar";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/library" element={<Library />} />
            <Route path="/create" element={<CreateEpisode />} />
            <Route path="/episode/:id" element={<EpisodeDetail />} />
            <Route path="/episodev/:id" element={<VideoEpisode />} />
            <Route path="/avatars/" element={<Avatar />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
