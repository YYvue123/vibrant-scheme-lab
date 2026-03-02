import { useIsMobile } from "@/hooks/use-mobile";
import { MobileSidebarTrigger } from "@/components/MobileSidebar";

export function AppHeader({ onMobileMenuOpen }: { onMobileMenuOpen?: () => void }) {
  const isMobile = useIsMobile();

  return (
    <header className="h-12 flex items-center border-b border-border bg-background shrink-0 px-4">
      {isMobile && onMobileMenuOpen && (
        <MobileSidebarTrigger onClick={onMobileMenuOpen} />
      )}
    </header>
  );
}
