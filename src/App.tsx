import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { SidebarProvider } from "@/hooks/use-sidebar-state";
import { MockAuthProvider } from "@/hooks/use-mock-auth";
import { AppSidebar } from "@/components/AppSidebar";
import { MobileSidebar, MobileSidebarTrigger } from "@/components/MobileSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import AiChat from "./pages/AiChat";
import AiImage from "./pages/AiImage";
import AiVideo from "./pages/AiVideo";
import AiAudio from "./pages/AiAudio";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppLayout() {
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Desktop sidebar */}
      {!isMobile && <AppSidebar />}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        {isMobile && (
          <MobileHeader onMenuOpen={() => setMobileOpen(true)} />
        )}
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/ai-chat" replace />} />
            <Route path="/ai-chat" element={<AiChat />} />
            <Route path="/ai-image" element={<AiImage />} />
            <Route path="/ai-video" element={<AiVideo />} />
            <Route path="/ai-audio" element={<AiAudio />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>

      {/* Mobile sidebar sheet */}
      {isMobile && (
        <MobileSidebar open={mobileOpen} onOpenChange={setMobileOpen} />
      )}
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <MockAuthProvider>
        <SidebarProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppLayout />
            </BrowserRouter>
          </TooltipProvider>
        </SidebarProvider>
      </MockAuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
